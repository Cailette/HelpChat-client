import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule, routingComponents} from './app-routing.module';
import { AppComponent } from './app.component';

import {AuthGuard} from './auth/auth.guard';
import {GuestService} from './services/guest.service';

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
    ReactiveFormsModule
  ],
  providers: [
    GuestService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
