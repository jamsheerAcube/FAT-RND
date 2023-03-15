import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssetcategoryRoutingModule } from './assetcategory-routing.module';
import { AssetCategoryGridComponent } from '../assetcategory/asset-category-grid.component';
import { AssetCategoryFormComponent } from '../assetcategory/asset-category-form.component';
import { SharedModule } from '../../shared/shared.module';  

@NgModule({
  declarations: [
    AssetCategoryGridComponent,
    AssetCategoryFormComponent
  ],
  imports: [
    CommonModule,
    AssetcategoryRoutingModule,
    SharedModule
  ]
})
export class AssetcategoryModule { }
