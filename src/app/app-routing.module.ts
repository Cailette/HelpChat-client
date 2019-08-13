import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuestComponent } from './guest/guest.component';
import { MainPageComponent } from './guest/main-page/main-page.component';
import { LoginPageComponent } from './guest/login-page/login-page.component';
import { RegisterPageComponent } from './guest/register-page/register-page.component';

const routes: Routes = [
  {
    path: '', component: GuestComponent,
    children: [{ path: '', component: MainPageComponent }]
  },
  {
    path: 'login', component: GuestComponent,
    children: [{ path: '', component: LoginPageComponent }]
  },
  {
    path: 'register', component: GuestComponent,
    children: [{ path: '', component: RegisterPageComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
export const routingComponents = 
  [ 
    GuestComponent, 
    MainPageComponent, 
    LoginPageComponent,
    RegisterPageComponent
  ]
