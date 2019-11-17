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
import { WorkingHoursFromComponent } from './agent/working-hours-from/working-hours-from.component';
import { InformationComponent } from './agent/information/information.component';
import { InformationFormComponent } from './agent/information-form/information-form.component';
import { WorkingHoursTabComponent } from './agent/working-hours-tab/working-hours-tab.component';
import { ChatsListComponent } from './agent/chats-list/chats-list.component';
import { ChatContentComponent } from './agent/chat-content/chat-content.component';
import { ChatVisitorInfoComponent } from './agent/chat-visitor-info/chat-visitor-info.component';
import { VisitorComponent } from './visitor/visitor.component';
import { ChattingWindowComponent } from './visitor/chatting-window/chatting-window.component';
import { ChatRateComponent } from './visitor/chat-rate/chat-rate.component';
import { MailFormComponent } from './visitor/mail-form/mail-form.component';
import { MapComponent } from './agent/map/map.component';
import { ChatInfoComponent } from './agent/chat-info/chat-info.component';
import { StatisticsListComponent } from './agent/statistics-list/statistics-list.component';
import { StatisticsContentComponent } from './agent/statistics-content/statistics-content.component';
import { StatisticsTableComponent } from './agent/statistics-table/statistics-table.component';
import { StatisticsChartComponent } from './agent/statistics-chart/statistics-chart.component';

import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '', component: GuestComponent,
    children: [
      { path: '', component: LoginPageComponent, pathMatch: 'full' },
      { path: 'login', component: LoginPageComponent, pathMatch: 'full' },
      { path: 'register', component: RegisterPageComponent, pathMatch: 'full' }
    ]
  },
  {
    path: 'home', component: AgentComponent, canActivate:[AuthGuard],
    children: [
      { path: 'chats', component: ChatsComponent },
      { path: 'visitors', component: VisitorsComponent },
      { path: 'archive', component: ArchiveComponent },
      { path: 'consultants', component: ConsultantsComponent },
      { path: 'statistics', component: StatisticsComponent },
      { path: 'account', component: AccountComponent },
      { path: 'workingHours', component: WorkingHoursFromComponent },
      { path: 'workingHours/:agentId/:agentFirstname/:agentLastname', component: WorkingHoursFromComponent }
    ]
  },
  {
    path: 'chat', component: VisitorComponent,
    children: [
      { path: 'content/:agentId', component: ChattingWindowComponent},
      { path: 'mail', component: MailFormComponent},
      { path: 'rating/:chatId', component: ChatRateComponent},
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
    AccountComponent,
    WorkingHoursFromComponent,
    InformationComponent,
    InformationFormComponent,
    WorkingHoursTabComponent,
    ChatsListComponent,
    ChatContentComponent,
    ChatVisitorInfoComponent,
    VisitorComponent,
    ChattingWindowComponent,
    ChatRateComponent,
    MailFormComponent,
    MapComponent,
    ChatInfoComponent,
    StatisticsListComponent,
    StatisticsContentComponent,
    StatisticsTableComponent,
    StatisticsChartComponent
  ]
