import { Component } from '@angular/core';
import { IAssetCategory } from 'src/app/service/models/assetCategory.model';
import { SingleRowCrudBaseComponent } from 'src/app/shared/components/single-row-crud-base/single-row-crud-base.component';
import { assetCategoryService } from 'src/app/service/services/assetCategory.service';
import { AlertService } from 'src/app/service/services/alert.service';
@Component({
  selector: 'app-asset-category-form',
  templateUrl: './../../shared/components/single-row-crud-base/single-row-crud-base.component.html',
  styleUrls: ['./../../shared/components/single-row-crud-base/single-row-crud-base.component.scss']
})
export class AssetCategoryFormComponent extends SingleRowCrudBaseComponent<IAssetCategory> {

  constructor(_service: assetCategoryService, _alert: AlertService) {
    super();
    this.service = _service;
     this.alert = _alert;
    // this.permissionService = _appRoleMenuService;
  }

  protected override initializeAddtionalProperties(): void {
    this.pageType = 'form';
    this.displayName = 'AssetCategory';
    this.displayHeader = 'Asset Category';
    this.inputControls = [
      { fieldName: "categoryCode", label: "Category Code", sortOrder: 1, dataType: "text", inputType: "textBox", required: true },
      { fieldName: "categoryName", label: "Category Name", sortOrder: 2, dataType: "text", inputType: "textBox", required: true }
    ]
  }
}
