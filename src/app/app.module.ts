import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule, routingComponents} from './app-routing.module';
import { AppComponent } from './app.component';

import {AuthGuard} from './auth/auth.guard';
import {GuestService} from './services/guest.service';
import {AgentService} from './services/agent.service';

import { MatSnackBarModule } from "@angular/material";
import { days } from 'src/app/models/days.model';
import { ChatsListComponent } from './agent/chats-list/chats-list.component';
import { ChatContentComponent } from './agent/chat-content/chat-content.component';
import { ChatVisitorInfoComponent } from './agent/chat-visitor-info/chat-visitor-info.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    ChatsListComponent,
    ChatContentComponent,
    ChatVisitorInfoComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule
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
