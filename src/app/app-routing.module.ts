import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {LoginGuard} from "./shared/guards/login/login.guard";
import {MainComponent} from "./pages/main/main.component";
import {TableComponent} from "./pages/table/table.component";

const routes: Routes = [
  {path: '', redirectTo: localStorage.getItem('access_token') ? "main" : "login", pathMatch: "full"},
  {path: 'login', component: LoginComponent},
  {path: 'main', component: MainComponent, canActivate: [LoginGuard]},
  {path: 'main/:id', component: TableComponent, canActivate: [LoginGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
