import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';

@Injectable()
export class JsonDateInterceptor implements HttpInterceptor {
    constructor() {}

    //private _isoDateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?Z$/;
    private _isoDateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;

    intercept(req: HttpRequest < any > , next: HttpHandler): Observable < HttpEvent < any >> {
        return next.handle(req).pipe(map((val: HttpEvent < any > ) => {
            if (val instanceof HttpResponse) {
                const body = val.body;
                this.convert(body);
            }
            return val;
        }));
    }

    isIsoDateString(value: any): boolean {
        if (value === null || value === undefined) {
            return false;
        }
        if (typeof value === 'string') {
            return this._isoDateFormat.test(value);
        }
        return false;
    }

    convert(body: any) {
        if (body === null || body === undefined) {
            return body;
        }
        if (typeof body !== 'object') {
            return body;
        }
        for (const key of Object.keys(body)) {
            const value = body[key];
            if (this.isIsoDateString(value)) {
                //Actual conversion should be like this
                //console.log(`Converting ${key} to Date`);
                //body[key] = new Date(value);

                //Temporary solution to make the UTC to +4:00 (GST)
                let dateValue = new Date(value);
                dateValue = this.addHours(dateValue,4);
                body[key] = dateValue;
            } else if (typeof value === 'object') {
                this.convert(value);
            }
        }
    }

    addHours(dateValue: Date , hourToAdd: number) {
        dateValue.setTime(dateValue.getTime() + (hourToAdd*60*60*1000));
        return dateValue;
      }
}