import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/tokeninterceptor';
import { JsonDateInterceptor } from './interceptors/jsondateinterceptor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
    
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true
  }, {
    provide: HTTP_INTERCEPTORS, useClass: JsonDateInterceptor, multi: true
  }]
})
export class ServiceModule { }
