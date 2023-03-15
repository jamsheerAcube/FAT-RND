import { Component, OnInit } from '@angular/core';
// import { AppRoleMenuService } from "@service/services/AppRoleMenuService";
// import { AuthService } from '@service/services/auth.service';
// import { DrawerItemX } from '@shared/model/idrawerItem.model';
import { AuthService } from '../service/services/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public expanded : boolean = false;
  public mainMenus: any[] = [];
  constructor(
    
    private auth : AuthService, 
    // private appRoleMenuService : AppRoleMenuService
    
    
    ) { }

  ngOnInit(): void {    
    this.setMainMenuList();
  }

  menuTogglePressed(newValue : boolean){
    this.expanded =newValue;
  }

  onLogoutPressed(){
    this.auth.logout();    
  }

  setMainMenuList(){ 
    
    this.mainMenus = [
      {
        text: 'Dashbord',
        icon: 'k-i-inbox',
        selected: true,
        path: "/home/dashbord",
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
        path: "/home/assetcategory",
      },
      {
        text: 'Product Master',
        icon: 'k-i-edit',
        id: 4,
        parentId: 3,
        path: "/home/productmaster",
      }
    ];


    // this.appRoleMenuService.getMainMenuList().subscribe({
    //   next:(val)=>{        
    //     this.mainMenus = val.map((menu)=>{
    //       return { path: (menu.displayName ? menu.displayName : ''), text: menu.menuText, icon: menu.menuIconName }
    //     });
    //   }
    // });
  }
}
