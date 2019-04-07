import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './auth/login.guard';

const routes: Routes = [
  {  path: '', component: HomeComponent, data: { titulo: 'Hogar'}, canActivate: [LoginGuard]},
  {  path: 'login', component: LoginComponent, data: { titulo: 'Login'}},
  {  path: 'pages', loadChildren: './pages/pages.module#PagesModule', canLoad: [LoginGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
