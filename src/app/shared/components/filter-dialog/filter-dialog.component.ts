import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { InputControlBase } from '../../model/inputControlBase';
import {
  DialogService,
  DialogRef
} from "@progress/kendo-angular-dialog";
@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.css'],
})
export class FilterDialogComponent implements OnInit {

  @Input() public filterControls: InputControlBase[] = [];
  //@Input() public filterValues: { [key: string]: any; } = {};
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() formReset: EventEmitter<any> = new EventEmitter<any>();
  @Output() filterPanelOpen: EventEmitter<any> = new EventEmitter<any>();

  constructor(private dialogService: DialogService) { }

  public result: string = '';
  public raiseFormSubmitEventflag: boolean = false;
  public resetFilterFormFlag: boolean = false;
  private dialog?: DialogRef;
  public tempFilterValues: { [key: string]: any; } = {};
  public filterValues: { [key: string]: any; } = {};


  public showConfirmation(template: TemplateRef<unknown>): void {

    this.filterValues = this.tempFilterValues;

    this.dialog = this.dialogService.open({
      title: "Choose filters",
      content: template,
      actions: [{ text: "Close" }, { text: "Reset" }, { text: "Apply", themeColor: "primary" }],
      width: 400,
      //height: 200,
      //minWidth: 250,
      animation: { duration: 300, direction: 'down', type: 'slide' },
      preventAction: (ev, dialog) => {
        type ObjectKey = keyof typeof ev;
        const myVar = 'text' as ObjectKey;
        if (ev.hasOwnProperty('text') && ev[myVar] == "Apply") {
          this.raiseFormSubmitEventflag = !this.raiseFormSubmitEventflag;
          return true;
        } else if (ev.hasOwnProperty('text') && ev[myVar] == "Reset") {
          this.resetFilterFormFlag = !this.resetFilterFormFlag;
          return true;
        }
        return false;
      }
    });
  }

  ngOnInit(): void {
    //console.log('initializing the filter dialog...');
  }

  onFormSubmit(formValues: any) {
    this.tempFilterValues = formValues;
    this.dialog?.close();
    this.formSubmit.emit(formValues);
  }

  onFormReset() {
    this.tempFilterValues = {};
    this.formReset.emit();
  }
}
