import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { GridDataResult } from "@progress/kendo-angular-grid";
import {
    toDataSourceRequestString,
    translateDataSourceResultGroups
} from "@progress/kendo-data-query";

@Injectable()
export class DataService {
    constructor(private http: HttpClient) { }

    private BASE_URL =
        "https://demos.telerik.com/aspnet-core/service/api/serveroperations";

    public fetch(state: any): Observable<GridDataResult> {
        const queryStr = `${toDataSourceRequestString(state)}`;
        const hasGroups = state.group && state.group.length;


        return this.http
            .post(`${this.BASE_URL}`, queryStr, {
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded; charset=UTF-8"
                }
            })
            .pipe(
                // Process the response.
                map(({ data, total }: any): GridDataResult => {
                    return {
                        data: hasGroups
                            ? translateDataSourceResultGroups(data)
                            : data,
                        total: total
                    };
                })
            );
    }
}


