import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../service/services/auth.guard';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'dashbord',
        canActivate: [AuthGuard],
        loadChildren: () => import('../features/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'assetcategory',
        canActivate: [AuthGuard],
        loadChildren: () => import('../features/assetcategory/assetcategory.module').then(m => m.AssetcategoryModule)
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
