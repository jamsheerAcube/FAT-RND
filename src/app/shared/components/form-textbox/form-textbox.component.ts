import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputControlBase } from 'src/app/shared/model/inputControlBase';
@Component({
  selector: 'app-form-textbox',
  templateUrl: './form-textbox.component.html',
  styleUrls: ['./form-textbox.component.css']
})
export class FormTextboxComponent implements OnInit {

  @Input() inputControlSetting!: InputControlBase;
  @Input() form!: FormGroup;
  get isValid() { return this.form.controls[this.inputControlSetting.fieldName].valid; }


  labelText: string = "";

  constructor() { }

  ngOnInit(): void {    
    this.labelText = this.inputControlSetting.required ? this.inputControlSetting.label + " *" : this.inputControlSetting.label;
  }
}
