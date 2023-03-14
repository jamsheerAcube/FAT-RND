import { Component, OnInit } from '@angular/core';
import { IGridColumnDefenition } from 'src/app/service/models/gridColumnsDefenition';
import { IMasterService } from 'src/app/service/services/imaster.service';
@Component({
  selector: 'app-single-row-crud-base',
  templateUrl: './single-row-crud-base.component.html',
  styleUrls: ['./single-row-crud-base.component.scss']
})
export class SingleRowCrudBaseComponent<ModelType extends { key: any }> implements OnInit {
  pageType: string = '';
  displayName: string = '';
  displayHeader: string = '';
  gridColumns: IGridColumnDefenition[] = [];
  gridData: ModelType[] = [];
  service!: IMasterService<ModelType>;
  refreshOnLoad: boolean = true;
  resetForm: boolean = false;
  loading: boolean = false;
  //Parent Data Keys For Data Filter
  defaultDataFilterValues: { [fieldName: string]: string } = {};
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
    this.resetForm = !this.resetForm;
    this.loading = true;
    this.service.getAll(filters).subscribe({
      next: (value) => (this.gridData = value),
      error: (err) => {
        this.loading = false;
        // this.alert.showError(err.message);
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
