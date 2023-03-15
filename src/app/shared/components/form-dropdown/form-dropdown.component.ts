import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IValueListDefinition } from 'src/app/service/services/valuelistdefinition.service';
import { InputControlBase } from 'src/app/shared/model/inputControlBase';

@Component({
  selector: 'app-form-dropdown',
  templateUrl: './form-dropdown.component.html',
  styleUrls: ['./form-dropdown.component.css']
})
export class FormDropDownComponent implements OnInit, OnChanges {

  @Input() form!: FormGroup;
  @Input() inputControlSetting!: InputControlBase;
  @Input() listItems!: [];
  @Input() valueListDef!: IValueListDefinition |undefined;


  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectionChange: EventEmitter<any> = new EventEmitter<any>();


  labelText: string = "";

  listData: Array<any> = [];

  get isValid() { return this.form.controls[this.inputControlSetting.fieldName].valid; }

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    //console.log(changes);
    if (changes['listItems'] && !changes['listItems'].firstChange
      && changes['listItems'].currentValue != changes['listItems'].previousValue) {
      //console.log('listItems changed' , this.listItems);
      this.listData = this.listItems;
    }
  }

  ngOnInit(): void {
    this.listData = this.listItems;

    this.labelText = this.inputControlSetting.required ? this.inputControlSetting.label + " *" : this.inputControlSetting.label;
  }

  handleFilter(filterKey: any) {
    this.listData = this.listItems.filter(
      (listItem: any) => listItem[this.valueListDef?.textFieldName ?? ''].toLowerCase().indexOf(filterKey.toLowerCase()) !== -1
    );
  }

  public onValueChange(value: any): void {        
    this.valueChange.emit({ fieldName: this.inputControlSetting.fieldName, value });
  }

  public onSelectionChange(value: any): void {    
    this.selectionChange.emit({ fieldName: this.inputControlSetting.fieldName, value });
  }

}
