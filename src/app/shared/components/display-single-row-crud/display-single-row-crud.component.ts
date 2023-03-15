import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { gridColumnDefinition, IGridColumnDefinition } from 'src/app/shared/model/gridColumnDefinition';
import { gridActionDefinition } from 'src/app/shared/model/gridActionDefinition';
import { Router, ActivatedRoute } from '@angular/router';
import { InputControlBase } from 'src/app/shared/model/inputControlBase';
import { IFieldDefinition } from 'src/app/shared/model/fieldDefinition';
import { IButtonActionDefinition } from 'src/app/shared/model/buttonActionDefinition';
@Component({
  selector: 'app-display-single-row-crud',
  templateUrl: './display-single-row-crud.component.html',
  styleUrls: ['./display-single-row-crud.component.scss']
})
export class DisplaySingleRowCrudComponent implements OnInit {
  @Input() pageType: string = '';
  @Input() displayName: string = '';
  @Input() displayHeader: string = '';
  @Input() fieldDefinitions: IFieldDefinition[] = [];
  @Input() gridDetails: any[] = [];
  @Input() resetForm: boolean = false;
  @Input() gridActions: gridActionDefinition[] = [];
  @Input() enableAdd: boolean = true;
  @Input() enableEdit: boolean = true;
  @Input() enableDelete: boolean = true;
  @Output() displayFormSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() gridActionNotHandled: EventEmitter<any> = new EventEmitter<any>();
  tempDeleteRowValues: any;
  showDeleteDialog: boolean = false;
  formControls: InputControlBase[] = [];
  filterControls: InputControlBase[] = [];
  gridColumns: IGridColumnDefinition[] = [];
  formActionButtons: IButtonActionDefinition[] = [];
  formInputValues: any;

  innerHeight: any;
  gridHeight: any;
  innerWidth: any;
  gridWidth: any;
  constructor(
    private router: Router, private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.formActionButtons = [
      { name: 'Add', text: 'Add', icon: 'save', themeColor: 'success' },
      { name: 'Clear', text: 'Clear', icon: 'clear', themeColor: 'secondary' }
    ];

    if (this.fieldDefinitions && this.fieldDefinitions.length > 0) {
      this.prepareformControlsFromFieldDefinitions(this.fieldDefinitions);
      this.preparegridColumnsFromFieldDefinitions(this.fieldDefinitions);
    }
    else
      console.log(`${this.displayName} has no field definitions`);
  }
  onRefreshClick() { }
  onExportToExcelClick() { }
  onAddNewClick() {
    this.pageType = 'form'
    // this.router.navigateByUrl('/masters/assetcategory/add');
  }
  private preparegridColumnsFromFieldDefinitions(fieldDefinitions: IFieldDefinition[]) {
    fieldDefinitions
      .filter((a) => a.showInGrid == undefined || a.showInGrid == true)
      .sort((a, b) => ((a.gridColumOrder ?? a.sortOrder) - (b.gridColumOrder ?? b.sortOrder)))
      .forEach((fieldDef) => {
        this.gridColumns.push(new gridColumnDefinition(
          {
            ...fieldDef,
            columnWidth: fieldDef.gridColumnWidth,
          }))
      });
  }
  private prepareformControlsFromFieldDefinitions(fieldDefinitions: IFieldDefinition[]) {
    fieldDefinitions
      .filter((a) => a.showOnForm == undefined || a.showOnForm == true)
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .forEach((fieldDef) => {
        this.formControls.push(
          {
            ...fieldDef,
            readonly: fieldDef.readOnlyOnForm,
            required: fieldDef.mandatoryOnForm,
            defaultValue: fieldDef.defaultFormValue
          })
      });
  }
  onFormActionClick(actionInfo: any) {
    if (actionInfo.actionName == "Clear") {
      this.clearInputForm();
    } else if (actionInfo.actionName == "Edit") {
      //here form data has precedence
      // let merged = { ...this.formInputValues, ...actionInfo.formData };
      // this.displayFormSubmit.emit(
      //   { actionName: actionInfo.actionName, formData: merged });
    } else if (actionInfo.actionName == "Add") {
      this.displayFormSubmit.emit(
        { actionName: actionInfo.actionName, formData: actionInfo.formData });
    }
  }

  clearInputForm() {
    debugger;
    this.formInputValues = this.formControls
      .reduce((acc, cur) => ({ ...acc, [cur.fieldName]: cur.defaultValue ?? '' }), {});
    debugger;
  }
  onGridRowAction(actionInfo: { actionName: string, row: any }) {
    debugger;
    this.formInputValues = actionInfo.row;
    if (actionInfo.actionName == "Edit") {
      this.router.navigateByUrl('/home/locations/edit/' + this.formInputValues.key);
    }
    else if (actionInfo.actionName == "Delete") {
      this.tempDeleteRowValues = actionInfo.row;
      // this.clearInputForm();
      // this.formActionButtons = [];
      //Display the Delete dialog window
      this.showDeleteDialog = true;
      debugger;
    }
    else {
      this.formActionButtons = [];
      this.gridActionNotHandled.emit(
        { actionName: actionInfo.actionName, actionData: actionInfo.row })
    }
  }
  onClose(){
    debugger
  }
  
  onDeleteDialogResult(result: string) {
    this.showDeleteDialog = false;
    //console.log(`Delete dialog result`, result);
    if (result == 'Delete') {
      this.displayFormSubmit.emit(
        { actionName: 'Delete', formData: this.tempDeleteRowValues });
    }
  }
}
