import { Component, OnInit,Input } from '@angular/core';
import { IGridColumnDefenition } from 'src/app/service/models/gridColumnsDefenition';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  @Input() public gridColumns: IGridColumnDefenition[] = [];
  @Input() public gridData: {}[] = [];
  @Input() public height: number = 600;
  @Input() public width: number = 900;
  loading:boolean=false;
  constructor() { }

  ngOnInit(): void {
  }

}
