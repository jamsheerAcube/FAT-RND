import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
    //console.log("AuthGuard Service Is Instantiated");   
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isAuthenticated()
      .then((authenticated: Boolean) => {
        if (authenticated) {
          return true;
        }
        else {
          this.authService.redirectURL = state.url;
          debugger;
          return this.router.navigate(['login']);
        }
      });
  }

}
