import { Component, OnInit, Input } from '@angular/core';
import { IGridColumnDefinition } from 'src/app/shared/model/gridColumnDefinition';
import { Observable } from "rxjs";
import { DataService } from "src/app/service/services/data.service";
import { State } from "@progress/kendo-data-query";
import {
  PageChangeEvent,
  GridDataResult,
  DataStateChangeEvent,
  PagerPosition,
  PagerType,
} from "@progress/kendo-angular-grid";
@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  @Input() public gridColumns: IGridColumnDefinition[] = [];
  @Input() public gridData: {}[] = [];
  @Input() public height: number = 500;
  @Input() public width: number = 900;
  public state: State = {
    skip: 0,
    take: 10,
    group: [],
    filter: { filters: [], logic: "and" },
    sort: []
  };
  public loading = false;
  public data: GridDataResult = { data: [], total: 0 };
  public pagerTypes = ["numeric", "input"];
  public type: PagerType = "numeric";
  public buttonCount = 5;
  public info = true;
  public pageSizes:number[]=[10, 25, 50,100,200]
  public previousNext = true;
  public position: PagerPosition = "bottom";

  constructor(private service: DataService) {
   
  }

  ngOnInit(): void {
  }
  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.sendRequest(state);
  }

  public sendRequest(state: State): void {
    this.loading = true;
    this.service.fetch(state).subscribe((response: GridDataResult) => {
      this.data = response;
      this.loading = false;
      debugger;
    });
  }
}
