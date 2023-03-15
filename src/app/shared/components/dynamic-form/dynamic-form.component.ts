import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InputControlBase } from 'src/app/shared/model/inputControlBase';
import { IButtonActionDefinition } from 'src/app/shared/model/buttonActionDefinition';
import { ValuelistDefinitionService } from 'src/app/service/services/valuelistdefinition.service';
@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  @Input() public inputControls: InputControlBase[] = [];
  @Input() public controlAlignment: string = 'vertical';
  @Input() public actionButtons: IButtonActionDefinition[] = [];
  @Output() formActionClick: EventEmitter<any> = new EventEmitter<any>();
  @Input() resetForm: boolean = false;
  @Output() formReset: EventEmitter<any> = new EventEmitter<any>();
  form!: FormGroup;
  formfeilds: any[] = []
  constructor(private _valueListService: ValuelistDefinitionService) { }

  ngOnInit(): void {
    this.form = this.getFormgroup();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    debugger;
    //console.log(changes);
    if (changes['raiseFormSubmit'] && !changes['raiseFormSubmit'].firstChange
      && changes['raiseFormSubmit'].currentValue != changes['raiseFormSubmit'].previousValue) {
      this.onSubmit();
    }
    else if (changes['resetForm'] && !changes['resetForm'].firstChange
      && changes['resetForm'].currentValue != changes['resetForm'].previousValue) {
      this.onReset();
    }
  }
  onReset() {
    this.form.reset();
    this.formReset.emit();
  }
  inputControlTrack(index: number, inputControl: any) {
    return inputControl.fieldName;
  }
  getFormgroup(): FormGroup {

    this.formfeilds = []
    this.formfeilds = this.inputControls?.reduce(function (r, a) {
      r[a.groupName ? a.groupName : 'default'] = r[a.groupName ? a.groupName : 'default'] || [];
      r[a.groupName ? a.groupName : 'default'].push(a);
      return r;
    }, Object.create(null))

    const group: any = {};
    for (let key in this.formfeilds) {
      this.formfeilds[key].forEach((inputControl: InputControlBase) => {
        if (inputControl.showOnFormCondition)
          inputControl.show = false;
        else
          inputControl.show = true;

        this.getValueListDefinition(inputControl);
        group[inputControl.fieldName] =
          inputControl.required && inputControl.show
            ? new FormControl(inputControl.defaultValue || '', Validators.required)
            : new FormControl(inputControl.defaultValue || '');
      });
    }
    return new FormGroup(group);
  }
  getValueListDefinition(inputControl: InputControlBase) {
    if (inputControl.valueListName) {
      this._valueListService.getValueListDefinition(inputControl.valueListName).subscribe(
        {
          next: (value) => {
            //console.log(`${inputControl.fieldName} valueListDefinition`, value);
            inputControl.valueListDefinition = value;
            this.getValueListData(inputControl);
          }
        });
    }
  }

  getValueListData(inputControl: InputControlBase): any {
    if (inputControl.valueListDefinition) {
      this._valueListService.getValueListItems(inputControl.valueListDefinition).subscribe(
        {
          next: (value: any) => {
            //console.log(`${inputControl.fieldName} valueListItems`, value);
            inputControl.valueListItems = value;
            //this.setInputValuesToForm();
          }
        });
    }
  }
  actionButtonsTrack(index: number, actionDef: any) {
    return actionDef.name;
  }

  onActionButtonClick(actionName: string) {
    let formValues = this.form.getRawValue();
    //Reset the values of fields which are not visible on form becuase of the visiblity is based on condition
    let hiddenConrols = this.inputControls.filter(x => x.show != true);
    hiddenConrols.forEach(element => {
      formValues[element.fieldName] = null;
    });

    //Check all mandatory values are exists
    let valid = true;
    let mandatoryFields = this.inputControls.filter(x => x.required == true && x.show == true);
    mandatoryFields.forEach(element => {
      if (formValues[element.fieldName] == null || formValues[element.fieldName] == undefined || formValues[element.fieldName] == '') {
        valid = false;
        this.form.controls[element.fieldName].markAsTouched();
      }
    });
    if (valid) {
      this.formActionClick.emit({ actionName, formData: formValues });
    }
  }
  onSubmit() {
    debugger;
    // this.payLoad = this.form.getRawValue();
    // this.formSubmit.emit(this.payLoad);
  }
  //When value changes on the DropDown this method will get called  
  onValueChange(value: any): void {
    // this.setConditionalControls(value.fieldName);
  }
  onSelectionChange(value: any): void {
    //console.log("selectionChange", value);
    //this.selectionChange.emit(value);
  }
}
