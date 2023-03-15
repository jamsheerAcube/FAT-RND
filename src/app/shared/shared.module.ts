import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppbarComponent } from './components/appbar/appbar.component';
import { MainmenuComponent } from './components/mainmenu/mainmenu.component';
import { ReactiveFormsModule } from '@angular/forms';
//primeng
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { NavigationModule } from '@progress/kendo-angular-navigation';
import { IconModule } from '@progress/kendo-angular-icons';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import { TooltipsModule } from '@progress/kendo-angular-tooltip';
import { NotificationModule } from "@progress/kendo-angular-notification";
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { LabelModule } from '@progress/kendo-angular-label';
import { DialogsModule } from '@progress/kendo-angular-dialog';

import { SingleRowCrudBaseComponent } from './components/single-row-crud-base/single-row-crud-base.component';
import { DisplaySingleRowCrudComponent } from './components/display-single-row-crud/display-single-row-crud.component';
import { GridComponent } from './components/grid/grid.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { BackNavigateComponent } from './components/back-navigate/back-navigate.component';
import { FormTextboxComponent } from './components/form-textbox/form-textbox.component';
import { FormNumerictextboxComponent } from './components/form-numerictextbox/form-numerictextbox.component';
import { FormDropDownComponent } from './components/form-dropdown/form-dropdown.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';

import { DataService } from "../../../src/app/service/services/data.service";
@NgModule({
  declarations: [
    AppbarComponent,
    MainmenuComponent,
    SingleRowCrudBaseComponent,
    DisplaySingleRowCrudComponent,
    GridComponent,
    DynamicFormComponent,
    BackNavigateComponent,
    FormTextboxComponent,
    FormNumerictextboxComponent,
    FormDropDownComponent,
    DeleteDialogComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    ButtonsModule,
    NavigationModule,
    IconModule,
    LayoutModule,
    GridModule, ExcelModule, TooltipsModule,
    NotificationModule,InputsModule,LabelModule,DropDownsModule,DialogsModule
  ],
  exports: [
    AppbarComponent,
    MainmenuComponent,
    ButtonsModule,
    IconModule,
    LayoutModule,
    TooltipsModule, NotificationModule,
    InputsModule,LabelModule,
    DisplaySingleRowCrudComponent
  ],
  providers: [DataService],
})
export class SharedModule { }
