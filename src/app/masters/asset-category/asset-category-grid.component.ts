import { Component } from '@angular/core';
import { IAssetCategory } from 'src/app/service/models/assetCategory.model';
import { SingleRowCrudBaseComponent } from 'src/app/shared/components/single-row-crud-base/single-row-crud-base.component';
import { assetCategoryService } from 'src/app/service/services/assetCategory.service';
@Component({
  selector: 'app-asset-category-grid',
  templateUrl: './../../shared/components/single-row-crud-base/single-row-crud-base.component.html',
  styleUrls: ['./../../shared/components/single-row-crud-base/single-row-crud-base.component.scss']
})
export class AssetCategoryGridComponent extends SingleRowCrudBaseComponent<IAssetCategory> {

  constructor(_service: assetCategoryService,) {
    super();
    this.service = _service;
    // this.alert = _alert;
    // this.permissionService = _appRoleMenuService;
  }

  protected override initializeAddtionalProperties(): void {
    this.pageType = 'grid';
    this.displayName = 'AssetCategory';
    this.displayHeader = 'Asset Category';
    this.gridColumns = [
      {
        fieldName: 'assetCategoryCode',  
        label: 'Asset Category Code',
        sortOrder: 1, filterType: "text",
        columnWidth:200
      },
      {
        fieldName: 'assetCategoryName',
        label: 'Asset Category Name',
        sortOrder: 2, filterType: "text",
        columnWidth:200
      },

    ];
  }
}
