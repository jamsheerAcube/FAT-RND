import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InputControlBase } from 'src/app/shared/model/inputControlBase';
@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  @Input() public inputControls: InputControlBase[] = [];
  form!: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.form = this.getFormgroup();
  }
  getFormgroup(): FormGroup {
    const group: any = {};
    this.inputControls?.forEach((inputControl) => {

      // if (inputControl.showOnFormCondition)
      //   inputControl.show = false;
      // else
      //   inputControl.show = true;

      // this.getValueListDefinition(inputControl);

      group[inputControl.fieldName] =
        inputControl.required && inputControl.show
          ? new FormControl(inputControl.defaultValue || '', Validators.required)
          : new FormControl(inputControl.defaultValue || '');
    });
    return new FormGroup(group);
  }

}
