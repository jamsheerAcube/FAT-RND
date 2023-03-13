import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthResponseData } from '../models/authresponse.model';
import { ILoginParam, IUser } from '../models/user.model';
import { mergeMap, tap } from 'rxjs/operators';
import { ConfigService } from './config.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  refreshTokenTimeout: any = null;
  public redirectURL: string = '';
  constructor(
    private http: HttpClient,
    private router: Router,
    private configs: ConfigService
  ) {
    //When a complete page refresh happend on the page and if the user is already logged in, then renew token
    this.refreshToken();
  }

  isAuthenticated(): Promise<boolean> {
    const promise = new Promise<boolean>((resolve, reject) => {
      resolve(this.isLoggedIn());
    });
    return promise;
  }

  login(userDetails: ILoginParam) {
    return this.configs.getConfig().pipe(
      mergeMap((config) => {
        return this.http
          .post<AuthResponseData>(
            `${config.serverURLs.find(
              (x:any) => x.key === 'baseUrl'
            )?.value}/user/authenticate`,
            {
              applicationID: config.appName,
              userName: userDetails.userName,
              password: userDetails.password,
            }
          )
          .pipe(
            tap((res: AuthResponseData) => {
              /* console.log(
                `AuthResponseData from server:${JSON.stringify(res)}`
              ); */

              debugger;
              localStorage.setItem('access_token', res.token);
              localStorage.setItem('userName', res.userName);
              this.startRefreshTokenTimer();
              if (this.redirectURL) {
                const url = this.redirectURL;
                this.redirectURL = '';
                this.router.navigate([url]);
              } else {
                this.router.navigateByUrl('/dashbord');
              }
              return res;
            })
          );
      })
    );
  }

  logout() {
    if (this.isLoggedIn()) {
      //location.href = '/login';
      location.href = '/login';
      //location.href = '/sobhawebapp/login';
      localStorage.clear();
      this.stopRefreshTokenTimer();
    }
  }

  isLoggedIn(): boolean {
    //Seems this expiry check has some issue (May be the token is getting removed from the server cache)
    const tokenString = this.getAuthToken();
    if (tokenString) {
      const jwtToken = JSON.parse(atob(tokenString.split('.')[1]));
      const expires = new Date(jwtToken.exp * 1000);
      //console.log(`Time balance ${expires.getTime() - Date.now()}`);
      if (expires.getTime() - Date.now() > 0) {
        return true;
      }
    }
    return false;
  }

  private startRefreshTokenTimer() {
    const jwtToken = JSON.parse(atob(this.getAuthToken().split('.')[1]));
    const expires = new Date(jwtToken.exp * 1000);
    //Run the refreshToken() method 15 seconds before the token expires
    const timeout = expires.getTime() - Date.now() - 15 * 1000;
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken(), timeout);
  }

  private refreshToken() {
    if (this.isLoggedIn()) {
      this.configs.getServerURL('user').subscribe({
        next: (url) => {
          this.http.get<any>(`${url}/renewtoken`).subscribe(
            (res) => {
              localStorage.setItem('access_token', res.token);
              this.startRefreshTokenTimer();
            },
            (error) => {
              console.log(`Token renewal failed:`, error);
              this.logout();
            }
          );
        },
      });
    } else {
      this.logout();
    }
  }

  private stopRefreshTokenTimer() {
    if (this.refreshTokenTimeout) {
      clearTimeout(this.refreshTokenTimeout);
    } else {
      console.log('The refreshTokenTimeout is null');
    }
  }

  getAuthToken(): string {
    const token = localStorage.getItem('access_token');
    return token ? token : '';
  }

  getRoleId(): string {
    const roleId = localStorage.getItem('roleId');
    return roleId ? roleId : '0';
  }
}
