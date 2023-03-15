import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './service/services/auth.guard';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {    
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),    
  },
  {    
    path: 'login',
    component: LoginComponent
  },
  {    
    path: '',
    pathMatch:'full',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
