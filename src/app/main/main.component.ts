import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { AuthService } from '../service/services/auth.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public expanded : boolean = false;
  constructor(  
    private auth : AuthService
  ) { }

  ngOnInit(): void {
  }
  menuTogglePressed(newValue : boolean){
    this.expanded =newValue;
  }
  onLogoutPressed(){
    this.auth.logout();    
  }
}
