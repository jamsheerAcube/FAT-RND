import { Component } from '@angular/core';
import { IAssetCategory } from 'src/app/service/models/assetCategory.model';
import { SingleRowCrudBaseComponent } from 'src/app/shared/components/single-row-crud-base/single-row-crud-base.component';
import { assetCategoryService } from 'src/app/service/services/assetCategory.service';
import { AlertService } from 'src/app/service/services/alert.service';
@Component({
  selector: 'app-asset-category-grid',
  templateUrl: './../../shared/components/single-row-crud-base/single-row-crud-base.component.html',
  styleUrls: ['./../../shared/components/single-row-crud-base/single-row-crud-base.component.scss']
})
export class AssetCategoryGridComponent extends SingleRowCrudBaseComponent<IAssetCategory> {

  constructor(_service: assetCategoryService, _alert: AlertService,) {
    super();
    this.service = _service;
    this.alert = _alert;
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
        columnWidth: 200,
        dataType:"text"
      },
      {
        fieldName: 'assetCategoryName',
        label: 'Asset Category Name',
        columnWidth: 200,
        dataType:"text"
      },

    ];
  }
}
