import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainDashbordComponent } from './main-dashbord/main-dashbord.component';


const routes: Routes = [
  { path: "", component: MainDashbordComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
