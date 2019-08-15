import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuestComponent } from './guest/guest.component';
import { MainPageComponent } from './guest/main-page/main-page.component';
import { LoginPageComponent } from './guest/login-page/login-page.component';
import { RegisterPageComponent } from './guest/register-page/register-page.component';
import { AgentComponent } from './agent/agent.component';
import { HomeComponent } from './agent/home/home.component';
import { ChatsComponent } from './agent/chats/chats.component';
import { VisitorsComponent } from './agent/visitors/visitors.component';
import { ConsultantsComponent } from './agent/consultants/consultants.component';
import { ArchiveComponent } from './agent/archive/archive.component';
import { StatisticsComponent } from './agent/statistics/statistics.component';
import { AccountComponent } from './agent/account/account.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '', component: GuestComponent,
    children: [
      { path: '', component: MainPageComponent, pathMatch: 'full' },
      { path: 'login', component: LoginPageComponent, pathMatch: 'full' },
      { path: 'register', component: RegisterPageComponent, pathMatch: 'full' }
    ]
  },
  {
    path: 'home', component: AgentComponent, canActivate:[AuthGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'chats', component: ChatsComponent },
      { path: 'visitors', component: VisitorsComponent },
      { path: 'archive', component: ArchiveComponent },
      { path: 'consultants', component: ConsultantsComponent },
      { path: 'statistics', component: StatisticsComponent },
      { path: 'account', component: AccountComponent }
    ]
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
    RegisterPageComponent,
    AgentComponent,
    HomeComponent,
    ChatsComponent,
    VisitorsComponent,
    ConsultantsComponent,
    ArchiveComponent,
    StatisticsComponent,
    AccountComponent
  ]
