import { Component,Input,OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputControlBase } from 'src/app/shared/model/inputControlBase';

@Component({
  selector: 'app-form-numerictextbox',
  templateUrl: './form-numerictextbox.component.html',
  styleUrls: ['./form-numerictextbox.component.css']
})
export class FormNumerictextboxComponent implements OnInit  {
  public autoCorrect = false;
  @Input() inputControlSetting!: InputControlBase;
  @Input() form!: FormGroup;
  labelText: string = "";
  format: string = "";

  constructor() { }

  ngOnInit(): void {
    this.labelText = this.inputControlSetting.required ? this.inputControlSetting.label + " *" : this.inputControlSetting.label;
    this.format = this.inputControlSetting.inputFormat ? this.inputControlSetting.inputFormat : '';
  }
}
