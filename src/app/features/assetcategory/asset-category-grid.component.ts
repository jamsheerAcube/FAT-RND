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
    this.fields = [
      {
        fieldName: 'assetCategoryCode', dataType: 'text',
        // hint: 'max 50 chars', 
        label: 'Category Code',
        sortOrder: 1, inputType: 'textBox', mandatoryOnForm: true,
        showAsFilter: true
      },
      {
        fieldName: 'assetCategoryName', dataType: 'text',
        label: 'Category Name',
        sortOrder: 2, inputType: 'textBox',
        mandatoryOnForm: true, showAsFilter: true
      },
      {
        fieldName: 'assetCategoryShortCode', dataType: 'text',
        label: 'Category Short Code',
        sortOrder: 3, inputType: 'textBox',
        mandatoryOnForm: true, showAsFilter: true
      },
      {
        fieldName: 'categoryDepreciationPeriod', dataType: 'text',
        label: 'Depreciation Period',
        sortOrder: 4, inputType: 'dropDown',valueListName: 'CategoryDepreciationPeriod',
        mandatoryOnForm: true, showAsFilter: true,
      },
      {
        fieldName: 'categoryDepreciationPercent', dataType: 'text',
        label: 'Depreciation Percentage',
        sortOrder: 5, inputType: 'numericTextBox',inputFormat:"n0",
        mandatoryOnForm: true, showAsFilter: true
      },
    ];


  }
}

