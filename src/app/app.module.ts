import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthGuard } from './auth/auth.guard';
import { GlobalRole, Role } from './auth/Role';
import { JwtModule } from '@auth0/angular-jwt';
import { ChartsModule } from 'ng2-charts';
import { days } from 'src/app/models/days.model';

import { AgentSearch } from './_pipes/agent-search.pipe';
import { AgentFilter } from './_pipes/agent-filter.pipe';
import { ChatAgentFilter } from './_pipes/chat-agent-filter.pipe';
import { ChatDateFilter } from './_pipes/chat-date-filter.pipe';
import { ChatRatingFilter } from './_pipes/chat-rating-filter.pipe';


import { GuestService } from './services/guest.service';
import { AgentService } from './services/agent.service';
import { VisitorService } from './services/visitor.service';
import { ChatService } from './services/chat.service';
import { StatisticsService } from './services/statistics.service';
import { WorkHoursService } from './services/work-hours.service';
import { AgentSocketService } from './services/agent-socket.service';
import { VisitorSocketService } from './services/visitor-socket.service';
import { MailService } from './services/mail.service';

@NgModule({
  declarations: [
    AgentSearch,
    AgentFilter,
    ChatAgentFilter,
    ChatDateFilter,
    ChatRatingFilter,
    AppComponent,
    routingComponents,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB01NDAC6qvJ1pCyKEiNNlTWVdK_xp5u8E'
    }),
    JwtModule.forRoot({
      config: { }
    }),
    ChartsModule
  ],
  providers: [
    GlobalRole,
    Role,
    GuestService,
    AgentService,
    VisitorService,
    ChatService,
    StatisticsService,
    WorkHoursService,
    AgentSocketService,
    VisitorSocketService,
    MailService,
    StatisticsService,
    AuthGuard,
    { provide: 'DAYS', useValue: days }   
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
