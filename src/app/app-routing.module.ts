import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent }, // http://localhost:4200/login/
  { path: 'dashboard', component: DashboardComponent }, // http://localhost:4200/dashboard/
  { path: '', redirectTo: 'login', pathMatch: 'full' } // http://localhost:4200/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
