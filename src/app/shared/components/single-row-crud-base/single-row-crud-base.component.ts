import { Component, OnInit } from '@angular/core';
import { IGridColumnDefinition } from 'src/app/shared/model/gridColumnDefinition';
import { InputControlBase } from 'src/app/shared/model/inputControlBase';

import { IMasterService } from 'src/app/service/services/imaster.service';
import { AlertService } from 'src/app/service/services/alert.service';
import { State } from "@progress/kendo-data-query";
import { PageChangeEvent, GridDataResult, DataStateChangeEvent, PagerPosition, PagerType } from "@progress/kendo-angular-grid";
@Component({
  selector: 'app-single-row-crud-base',
  templateUrl: './single-row-crud-base.component.html',
  styleUrls: ['./single-row-crud-base.component.scss']
})
export class SingleRowCrudBaseComponent<ModelType extends { key: any }> implements OnInit {
  pageType: string = '';
  displayName: string = '';
  displayHeader: string = '';
  gridColumns: IGridColumnDefinition[] = [];
  gridData: ModelType[] = [];
  public gridDatas: GridDataResult = { data: [], total: 0 };
  service!: IMasterService<ModelType>;
  refreshOnLoad: boolean = true;
  resetForm: boolean = false;
  loading: boolean = false;
  //Parent Data Keys For Data Filter
  defaultDataFilterValues: { [fieldName: string]: string } = {};
  state: State = {
    skip: 0,
    take: 10,
    group: [],
    filter: { filters: [], logic: "and" },
    sort: []
  };
  alert!: AlertService;
  inputControls: InputControlBase[] = [];



  constructor() { }

  ngOnInit(): void {
    this.gridData = this.service.cachedData();
    this.initializeAddtionalProperties();
    if (this.refreshOnLoad) {
      this.refreshGridData(null);
    }
  }
  refreshGridData(filters: any) {
    filters = this.setDefaultFilter(filters);
    this.loading = true;
    this.service.getAll(this.state).subscribe({
      next: (value) => (this.gridData = value),
      error: (err) => {
        this.loading = false;
        this.alert.showError(err.message);
      },
      complete: () => { this.loading = false; }
    });
    debugger;
  }

  setDefaultFilter(filters: any) {
    if (this.defaultDataFilterValues) {
      if (filters == null) {
        filters = {};
      }
      for (let i in this.defaultDataFilterValues) {
        filters[i] = this.defaultDataFilterValues[i];
      }
    }
    return filters;
  }
  protected initializeAddtionalProperties() {

  }
}
