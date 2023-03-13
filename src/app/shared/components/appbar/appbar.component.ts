import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AppBarThemeColor } from '@progress/kendo-angular-navigation';

@Component({
  selector: 'app-appbar',
  templateUrl: './appbar.component.html',
  styleUrls: ['./appbar.component.scss']
})
export class AppbarComponent implements OnInit {
  public expanded = false;
  @Output() LogoutPressed = new EventEmitter();
  @Output() menuTogglePressed = new EventEmitter<boolean>();
  public themeColor: AppBarThemeColor= 'inherit';
  constructor() { }

  ngOnInit(): void {
  }

  toggleDrawer(){
    //console.log(`this.expanded: ${this.expanded}`);
    this.expanded = !this.expanded;
    this.menuTogglePressed.emit(this.expanded);
  }

  onLogoutPressed(){
    this.LogoutPressed.emit();
  }
}
