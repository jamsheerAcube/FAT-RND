import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetCategoryGridComponent } from './asset-category/asset-category-grid.component';
import { AssetCategoryFormComponent } from './asset-category/asset-category-form.component';
const routes: Routes = [
  { path: "assetcategory", component: AssetCategoryGridComponent },
  { path: "assetcategory/add", component: AssetCategoryFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MastersRoutingModule { }
