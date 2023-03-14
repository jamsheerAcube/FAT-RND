import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppbarComponent } from './components/appbar/appbar.component';
import { MainmenuComponent } from './components/mainmenu/mainmenu.component';
//primeng
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { NavigationModule } from '@progress/kendo-angular-navigation';
import { IconModule } from '@progress/kendo-angular-icons';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import { TooltipsModule } from '@progress/kendo-angular-tooltip';
import { NotificationModule } from "@progress/kendo-angular-notification";

import { SingleRowCrudBaseComponent } from './components/single-row-crud-base/single-row-crud-base.component';
import { DisplaySingleRowCrudComponent } from './components/display-single-row-crud/display-single-row-crud.component';
import { GridComponent } from './components/grid/grid.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { BackNavigateComponent } from './components/back-navigate/back-navigate.component';
import { DataService } from "../../../src/app/service/services/data.service";
@NgModule({
  declarations: [
    AppbarComponent,
    MainmenuComponent,
    SingleRowCrudBaseComponent,
    DisplaySingleRowCrudComponent,
    GridComponent,
    DynamicFormComponent,
    BackNavigateComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    ButtonsModule,
    NavigationModule,
    IconModule,
    LayoutModule,
    GridModule, ExcelModule, TooltipsModule,
    NotificationModule
  ],
  exports: [
    AppbarComponent,
    MainmenuComponent,
    ButtonsModule,
    IconModule,
    LayoutModule,
    TooltipsModule, NotificationModule,
    DisplaySingleRowCrudComponent
  ],
  providers: [DataService],
})
export class SharedModule { }
