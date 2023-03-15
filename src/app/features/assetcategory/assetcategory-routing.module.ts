import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetCategoryGridComponent } from '../assetcategory/asset-category-grid.component';
import { AssetCategoryFormComponent } from '../assetcategory/asset-category-form.component';
const routes: Routes = [
  { path: "", component: AssetCategoryGridComponent },
  { path: "add", component: AssetCategoryFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetcategoryRoutingModule { }
