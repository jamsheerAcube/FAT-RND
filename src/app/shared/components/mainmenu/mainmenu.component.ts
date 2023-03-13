import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DrawerItem, DrawerItemExpandedFn, DrawerSelectEvent } from '@progress/kendo-angular-layout';
@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.component.html',
  styleUrls: ['./mainmenu.component.scss']
})
export class MainmenuComponent implements OnInit {
  @ViewChild('drawer') drawer: any;
  private _expanded: boolean = false;
  public expandedIndices = [0];
  @Input() set expanded(value: boolean) {
    if (this._expanded != value) {
      this._expanded = value;
      this.drawer.toggle();
    }
  }
  public selected = 'Dashbord';
  public menuItems: Array<any> = [
    {
      text: 'Dashbord',
      icon: 'k-i-inbox',
      selected: true,
      path: "/dashbord",
      id: 0
    },

    {
      text: 'Asset Attributes',
      icon: 'k-i-calendar',
      id: 3,
    },
    {
      text: 'Asset Category',
      icon: 'k-i-bell',
      id: 2,
      parentId: 3,
      path: "/masters/assetcategory",
    },
    {
      text: 'Product Master',
      icon: 'k-i-edit',
      id: 4,
      parentId: 3,
      path: "/masters/productmaster",
    }
  ];
  constructor(private router: Router, private route: ActivatedRoute) { }

  public isItemExpanded: DrawerItemExpandedFn = (item): boolean => {
    return this.expandedIndices.indexOf(item.id) >= 0;
  };


  ngOnInit(): void {
  }

  public onSelect(ev: DrawerSelectEvent): void {
    this.selected = ev.item.text;
    const current = ev.item.id;
    if (ev.item.parentId == undefined && this.menuItems.filter(x => x.parentId == current).length == 0) {
      this.expandedIndices = [];
    }
    if (this.expandedIndices.indexOf(current) >= 0) {
      this.expandedIndices = this.expandedIndices.filter((id) => id !== current);
    } else {
      this.expandedIndices.push(current);
    }
    if (ev.item.path) {
      this.router.navigate([ev.item.path], { relativeTo: this.route });
    }
  }

}
