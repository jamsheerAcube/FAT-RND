import { Component, OnInit ,Input} from '@angular/core';
import { IGridColumnDefinition } from 'src/app/shared/model/gridColumnDefinition';
import { Router, ActivatedRoute } from '@angular/router';
import { InputControlBase } from 'src/app/shared/model/inputControlBase';
@Component({
  selector: 'app-display-single-row-crud',
  templateUrl: './display-single-row-crud.component.html',
  styleUrls: ['./display-single-row-crud.component.scss']
})
export class DisplaySingleRowCrudComponent implements OnInit {
  @Input() pageType: string = '';
  @Input() displayName: string = '';
  @Input() displayHeader: string = '';
  @Input() gridColumns: IGridColumnDefinition[] = [];
  @Input() gridData: any[] = [];

  @Input() enableAdd: boolean = true;
  @Input() enableEdit: boolean = true;
  @Input() enableDelete: boolean = true;

  @Input() inputControls: InputControlBase[] = [];
  formControls: InputControlBase[] = [];

  innerHeight: any;
  gridHeight: any;
  innerWidth: any;
  gridWidth: any;
  constructor(
    private router: Router, private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (this.inputControls && this.inputControls.length > 0) {
      this.prepareformControlsFromFieldDefinitions(this.inputControls);
    }
  }
  onRefreshClick(){}
  onExportToExcelClick(){}
  onAddNewClick(){
    this.router.navigateByUrl('/masters/assetcategory/add');
  }
  private prepareformControlsFromFieldDefinitions(inputControls: InputControlBase[]) {
    inputControls.sort((a, b) => a.sortOrder - b.sortOrder)
      .forEach((fieldDef) => {
        this.formControls.push(
          {
            ...fieldDef,
            readonly: fieldDef.readonly,
            required: fieldDef.required,
            defaultValue: fieldDef.defaultValue
          })
      });
  }
}
