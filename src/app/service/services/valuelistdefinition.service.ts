import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, mergeMap, Observable, of, tap } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({ providedIn: 'root' })
export class ValuelistDefinitionService {

    configUrl = 'assets/valuelistdefinitions.json';

    configCache!: IValuelistConfig;

    constructor(private http: HttpClient, private appConfigService: ConfigService) { }

    getConfig(): Observable<IValuelistConfig> {
        if (this.configCache) {
            return of(this.configCache);
        } else {
            let configObservable = this.http.get<IValuelistConfig>(this.configUrl)
                .pipe(
                    //Tapping the data to have cache copy
                    tap((res: IValuelistConfig) => {
                        this.configCache = res;
                        return res;
                    })
                );
            return configObservable;
        }
    }

    getValueListDefinition(VLName: string) {
        return this.getConfig().pipe(map((config) => {
            //console.log('VLName', VLName);
            //console.log(config);
            let VLDefinition = config.valuelistDefinitions.find(x => x.valuelistName == VLName);
            //console.log('fnd response', VLDefinition);
            return VLDefinition ??
                { valuelistName: VLName, textFieldName: 'displayText', valueFieldName: 'value' };
        }));
    }



    getValueListItems(VLDefinition: IValueListDefinition) {
        //console.log(VLDefinition);
        if (VLDefinition.APIUrlKey) {
            return this.appConfigService.getServerURL(VLDefinition.APIUrlKey).pipe(
                mergeMap((valueListURL) => {
                    return this.http.get(valueListURL);
                }));
        }
        else if (VLDefinition.valuelistName === "CategoryDepreciationPeriod") {
            return of([
                { displayText: "Year", value: 7 },
                { displayText: "Month", value: 3 },
                { displayText: "Day", value: 1 },
            ]);
        }
        else {
            //Return empty object
            return of([]);
        }
    }


    getValueListItemByName(VLName: string) {
        return this.getValueListDefinition(VLName).pipe(
            map((VLDefinition) => {
                if (VLDefinition.APIUrlKey) {
                    return this.appConfigService.getServerURL(VLDefinition.APIUrlKey).pipe(
                        map((valueListURL) => {
                            return this.http.get(valueListURL);
                        }));
                }
                else {
                    //Return empty object
                    return of([]);
                }
            }));
    }


    /*
        getValueListItems(vlName: string): any {
            if (vlName === 'LocationTypes') {
                return [
                    {
                        displayText: "Common Storage",
                        value: 1,
                    },
                    {
                        displayText: "Project Storage",
                        value: 2,
                    }
                ];
            }
            else if (vlName === 'Projects') {
                return [
                    {
                        displayText: "Sobha Vista",
                        value: 1,
                    },
                    {
                        displayText: "Sobha Lavendar",
                        value: 2,
                    }
                ];
            }
            else if (vlName === 'MaterialTypes') {
                return [
                    {
                        displayText: "Panels",
                        value: 1,
                    },
                    {
                        displayText: "Tiles",
                        value: 2,
                    }
                ];
            }
        }
    */
}

export interface IValuelistConfig {
    valuelistDefinitions: IValueListDefinition[];
}

export interface IValueListDefinition {
    valuelistName: string,
    valueFieldName: string,
    textFieldName: string,
    APIUrlKey?: string
}
