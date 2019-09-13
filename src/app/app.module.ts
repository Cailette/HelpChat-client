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

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment.prod';

const config: SocketIoConfig = { url: environment.baseUrl, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    routingComponents
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    SocketIoModule.forRoot(config)
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
