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
import { InformationComponent } from './agent/information/information.component';
import { InformationFormComponent } from './agent/information-form/information-form.component';
import { WorkingHoursFromComponent } from './agent/working-hours-from/working-hours-from.component';
import { WorkingHoursTabComponent } from './agent/working-hours-tab/working-hours-tab.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    InformationComponent,
    InformationFormComponent,
    WorkingHoursFromComponent,
    WorkingHoursTabComponent
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
