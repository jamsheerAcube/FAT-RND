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
@NgModule({
  declarations: [
    AppbarComponent,
    MainmenuComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    ButtonsModule,
    NavigationModule,
    IconModule,
    LayoutModule
    
  ],  
  exports: [
    AppbarComponent,
    MainmenuComponent,
    ButtonsModule,
    IconModule,
    LayoutModule
  ]
})
export class SharedModule { }
