import { Component, OnInit } from '@angular/core';
import { IFieldDefinition } from 'src/app/shared/model/fieldDefinition';
import { IMasterService } from 'src/app/service/services/imaster.service';
import { gridActionDefinition } from 'src/app/shared/model/gridActionDefinition';
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
  fields: IFieldDefinition[] = [];
  gridData: ModelType[] = [];
  gridDetails:any;
  public gridDatas: GridDataResult = { data: [], total: 0 };
  service!: IMasterService<ModelType>;
  refreshOnLoad: boolean = true;
  resetForm: boolean = false;
  loading: boolean = false;
  enableAdd: boolean = true;
  enableEdit: boolean = true;
  enableDelete: boolean = true;
  gridActions: gridActionDefinition[] = [];
  //Parent Data Keys For Data Filter
  defaultDataFilterValues: { [fieldName: string]: string } = {};
  state: State = {
    skip: 0,
    take: 10,
    filter: { filters: [], logic: "and" },
    sort: []
  };
  alert!: AlertService;
    //Parent Data Keys For Create New
    defaultCreateNewValues: { [fieldName: string]: string } = {};
  constructor() { }

  ngOnInit(): void {
    this.gridData = this.service.cachedData();
    if (this.enableEdit) {
      this.gridActions.push({ name: 'Edit', condition: '', icon: 'edit', themeColor: 'success', altText: 'Edit' });
    }
    if (this.enableDelete) {
      this.gridActions.push({ name: 'Delete', condition: '', icon: 'delete', themeColor: 'error', altText: 'Delete' });
    }
    this.initializeAddtionalProperties();
    if (this.refreshOnLoad && this.pageType=='grid') {
      this.refreshGridData(null);
    }
  }
  refreshGridData(filters: any) {
    filters = this.setDefaultFilter(filters);
    this.loading = true;

    let data = {
      Page: 1,
      PageSize: 10,
      IncludeDeleted: false
    }
    debugger;
    this.service.getAll(data).subscribe({
      next: (value) => {
        this.gridDetails = value;
        this.gridData= this.gridDetails.data
        debugger;
      },
      error: (err) => {
        this.loading = false;
        this.alert.showError(err.message);
      },
      complete: () => { this.loading = false; }
    });
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
  onDisplayFormAction(actionInfo: { actionName: string, formData: any }) {
    //console.log('onDisplayFormAction', actionInfo);
    debugger
    actionInfo.formData = this.setDefaultFormValues(actionInfo.formData);
    debugger
    if (actionInfo.actionName == "Add") {
      this.service.post(actionInfo.formData).subscribe({
        next: (value) => {
          debugger;
          this.gridData = [...this.gridData, value];
        },
        error: (err) => {
          this.alert.showError(err.message);
        },
        complete: () => {
          this.alert.showSuccess('Created Successfully');
          this.resetForm = !this.resetForm;
        }
      });
    }
    else if (actionInfo.actionName == "Edit") {
      this.service.put(actionInfo.formData).subscribe({
        next: (value) => {
          this.gridData = [...this.gridData.filter(x => x.key != value.key), value];
        },
        error: (err) => {
          this.alert.showError(err.message)
        },
        complete: () => {
          this.alert.showSuccess('Updated Successfully');
          this.resetForm = !this.resetForm;
        }
      });
    }
    else if (actionInfo.actionName == "Delete") {
      this.service.delete(actionInfo.formData.key).subscribe({
        next: (value) => {
          this.gridData = [...this.gridData.filter(x => x.key != actionInfo.formData.key)];
          debugger;
        },
        error: (err) => {
          this.alert.showError(err.message)
        },
        complete: () => {
          this.alert.showSuccess('Deleted Successfully');
          this.resetForm = !this.resetForm;
        }
      });
    }
  }
  setDefaultFormValues(formData: any) {
    if (this.defaultCreateNewValues) {
      if (formData == null) {
        formData = {};
      }
      for (let i in this.defaultCreateNewValues) {
        formData[i] = this.defaultDataFilterValues[i];
      }
    }
    return formData;
  }
}
