import { Component, OnInit } from '@angular/core';
import { AppRoleMenuService } from "@service/services/AppRoleMenuService";
import { AuthService } from '@service/services/auth.service';
import { DrawerItemX } from '@shared/model/idrawerItem.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public expanded : boolean = false;
  public mainMenus: DrawerItemX[] = [];
  constructor(private auth : AuthService, private appRoleMenuService : AppRoleMenuService) { }

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
    this.appRoleMenuService.getMainMenuList().subscribe({
      next:(val)=>{        
        this.mainMenus = val.map((menu)=>{
          return { path: (menu.displayName ? menu.displayName : ''), text: menu.menuText, icon: menu.menuIconName }
        });
      }
    });
  }
}
