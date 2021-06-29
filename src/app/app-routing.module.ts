import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ToDoListComponent } from './to-do-list/to-do-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },         // http://localhost:4200/login/
  { path: 'dashboard', component: DashboardComponent }, // http://localhost:4200/dashboard/
  { path: 'home', component: HomeComponent },           // http://localhost:4200/home/
  { path: 'todolist', component: ToDoListComponent },   // http://localhost:4200/todolist/
  { path: '', redirectTo: 'home', pathMatch: 'full' }   // http://localhost:4200/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
