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
import { InformationComponent } from './agent/account/information/information.component';
import { EditInformationComponent } from './agent/account/edit-information/edit-information.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    InformationComponent,
    EditInformationComponent
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
