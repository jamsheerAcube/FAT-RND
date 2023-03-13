import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './service/services/auth.guard';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '', component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashbord', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'masters', loadChildren: () => import('./masters/masters.module').then(m => m.MastersModule) },
    ]
  },
  { path: 'login', component: LoginComponent },
  // { path: '', pathMatch: 'full', redirectTo: 'login' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
