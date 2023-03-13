import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { IConfig, IKeyValuePair } from '../models/config.model';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  configUrl = 'assets/config.json';
  configCache?: IConfig;
  serverURLsCache?: IKeyValuePair[] = [];

  constructor(private http: HttpClient) {}

  getConfig(): Observable<IConfig> {
    if (this.configCache) {
      return of(this.configCache);
    } else {
      return this.http.get<IConfig>(this.configUrl).pipe(
        tap((res: IConfig) => {
          //console.log(res);
          this.configCache = res;
          return res;
        })
      );
    }
  }

  getAppName(): Observable<string>{
    if (this.configCache) {
      return of(this.configCache.appName);
    } else {
      return this.http.get<IConfig>(this.configUrl).pipe(
        map((res: IConfig) => {          
          this.configCache = res;
          return this.configCache.appName;
        })
      );
    }
  }

  /*
  This method will read the baseUrl, then find the Url based on the passed "resourceType"
  And if the entry for the "resourceType" is not existing in the config file, 
  then the method will use the "resourceType" as the resource URL
  Also it makes & keeps a cached copy whenever it generates a new resourceType URL
  */
  getServerURL(resourceType: string) {
    if(this.serverURLsCache?.find(x=>x.key === resourceType))
    {
        const url = this.serverURLsCache?.find(x=>x.key == resourceType)?.value;
        //console.log(`Returned the cached URL:${url} for:${resourceType}`);
        return of(url ?? '');
    }
    else{
      return this.getConfig().pipe(
        map((res: IConfig) => {
          const baseUrl = res.serverURLs.find((x) => x.key == 'baseUrl');          
          const resourceTypeURL = res.serverURLs.find(
            (x) => x.key === resourceType
          );
          const urlMerged = (baseUrl?.value ?? '') + (resourceTypeURL?.value ?? resourceType);
          this.serverURLsCache?.push({ key:resourceType, value:  urlMerged});
          return urlMerged;
        })
      );
    }
  }
}
