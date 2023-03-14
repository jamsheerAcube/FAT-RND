import { Component, OnInit ,Input} from '@angular/core';
import { IGridColumnDefenition } from 'src/app/service/models/gridColumnsDefenition';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-display-single-row-crud',
  templateUrl: './display-single-row-crud.component.html',
  styleUrls: ['./display-single-row-crud.component.scss']
})
export class DisplaySingleRowCrudComponent implements OnInit {
  @Input() pageType: string = '';
  @Input() displayName: string = '';
  @Input() displayHeader: string = '';
  @Input() gridColumns: IGridColumnDefenition[] = [];
  @Input() gridData: any[] = [];

  @Input() enableAdd: boolean = true;
  @Input() enableEdit: boolean = true;
  @Input() enableDelete: boolean = true;

  innerHeight: any;
  gridHeight: any;
  innerWidth: any;
  gridWidth: any;
  constructor(
    private router: Router, private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }
  onRefreshClick(){}
  onExportToExcelClick(){}
  onAddNewClick(){
    this.router.navigateByUrl('/masters/assetcategory/add');
  }
}
