import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, mergeMap, tap } from 'rxjs/operators';
import { ConfigService } from './config.service';
import { prepareHttpParams } from 'src/app/helpers/utils';
import { Observable, throwError } from 'rxjs';
import { IMasterService } from './imaster.service';

export abstract class MasterService<ModelType> implements IMasterService<ModelType> {

  private _cachedData: ModelType[] = [];
  protected getMethodUrl: string = "";
  protected _http: HttpClient;
  protected _configs: ConfigService;
  protected _resourceType: string;
  constructor(http: HttpClient, configs: ConfigService, resourceType: string) {
    this._http = http;
    this._configs = configs;
    this._resourceType = resourceType;
  }

  getAll2(filters?: any): Observable<ModelType[]> {    
    let params: HttpParams = prepareHttpParams(filters);

    if (params.keys().length > 0) {
      return this._configs.getServerURL(this._resourceType).pipe(
        mergeMap((url) => {
          return this._http.get<ModelType[]>(url + `\\filter`, { params })
            .pipe(tap((res) => {
              this._cachedData = res;
              debugger;
              //console.log(this._cachedData);
            }));
        })
      );
    }
    else {
      return this._configs.getServerURL(this._resourceType).pipe(
        mergeMap((url) => {
          debugger;
          //console.log(url);
          return this._http.get<ModelType[]>(url+this.getMethodUrl)
          .pipe(
            tap((res) => {              
              this._cachedData = res;
              debugger;
              //console.log(this._cachedData);
          }));
        })
      );
    }
  }

  getAll(filters?: any): Observable<ModelType[]> {    
    let params: HttpParams = prepareHttpParams(filters);
    if (params.keys().length > 0) {
      return this._configs.getServerURL(this._resourceType).pipe(
        mergeMap((url) => {
          return this._http.get<ModelType[]>(url+ '/GetPage', { params })
            .pipe(tap((res) => {
              this._cachedData = res;
              //console.log(this._cachedData);
            }));
        })
      );
    }
    else {
      debugger;
      return this._configs.getServerURL(this._resourceType).pipe(
        mergeMap((url) => {
          debugger;
          //console.log(url);
          return this._http.get<ModelType[]>(url+this.getMethodUrl)
          .pipe(
            tap((res) => {              
              this._cachedData = res;
              debugger;
              //console.log(this._cachedData);
          }));
        })
      );
    }
  }
  cachedData(): ModelType[] {
    return this._cachedData;
  }

  post(createDTO: any) : Observable<ModelType> {
    debugger;
    return this._configs.getServerURL(this._resourceType).pipe(
      mergeMap((url) => {
        return this._http.post<any>(url, createDTO)
          .pipe(mergeMap((x) => {
            debugger;
            //console.log(`Retrieving the newly created resource from server using the response body:` , x);
            return this._http.get<ModelType>(url + `/${x.key}`);
          }))
          .pipe(catchError(this.handleError));
      })
    );
  }

  put(updateDTO: any) : Observable<ModelType> {
    return this._configs.getServerURL(this._resourceType).pipe(
      mergeMap((url) => {
        return this._http.put<any>(
          url + `/${updateDTO.key}`, updateDTO)
          .pipe(mergeMap((x) => {
            return this._http.get<ModelType>(url + `/${updateDTO.key}`);
          }))
          .pipe(catchError(this.handleError));
      })
    );
  }

  delete(resourceKey: string) : Observable<any> {
    return this._configs.getServerURL(this._resourceType).pipe(
      mergeMap((url) => {
        return this._http.delete<any>(url + `/${resourceKey}`)
          .pipe(catchError(this.handleError));
      })
    );
  }

  protected handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
