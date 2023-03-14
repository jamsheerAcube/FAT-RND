import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MastersRoutingModule } from './masters-routing.module';
import { AssetCategoryGridComponent } from './asset-category/asset-category-grid.component';
import { AssetCategoryFormComponent } from './asset-category/asset-category-form.component';
import { SharedModule } from '../shared/shared.module';   

@NgModule({
  declarations: [
    AssetCategoryGridComponent,
    AssetCategoryFormComponent

  ],
  imports: [
    CommonModule,
    MastersRoutingModule,
    SharedModule
  ]
})
export class MastersModule { }
