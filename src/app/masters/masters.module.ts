import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MastersRoutingModule } from './masters-routing.module';
import { AssetCategoryGridComponent } from './asset-category/asset-category-grid/asset-category-grid.component';
import { AssetCategoryFormComponent } from './asset-category/asset-category-form/asset-category-form.component';


@NgModule({
  declarations: [
    AssetCategoryGridComponent,
    AssetCategoryFormComponent
  ],
  imports: [
    CommonModule,
    MastersRoutingModule
  ]
})
export class MastersModule { }
