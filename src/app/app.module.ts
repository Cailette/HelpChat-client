import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';

import {AppRoutingModule, routingComponents} from './app-routing.module';
import { AppComponent } from './app.component';

import {AuthGuard} from './auth/auth.guard';
import {GuestService} from './services/guest.service';
import {AgentService} from './services/agent.service';

import { days } from 'src/app/models/days.model';

import { AgentSearch }from './Pipes/agent-search.pipe';
import { AgentFilter }from './Pipes/agent-filter.pipe';
import { ChatAgentFilter }from './Pipes/chat-agent-filter.pipe';
import { ChatDateFilter }from './Pipes/chat-date-filter.pipe';
import { ChatRatingFilter }from './Pipes/chat-rating-filter.pipe';
import { StatisticsListComponent } from './agent/statistics-list/statistics-list.component';
import { StatisticsContentComponent } from './agent/statistics-content/statistics-content.component';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    AgentSearch,
    AgentFilter,
    ChatAgentFilter,
    ChatDateFilter,
    ChatRatingFilter,
    StatisticsListComponent,
    StatisticsContentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB01NDAC6qvJ1pCyKEiNNlTWVdK_xp5u8E'
    })
  ],
  providers: [
    GuestService,
    AgentService,
    AuthGuard,
    { provide: 'DAYS', useValue: days }   
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
