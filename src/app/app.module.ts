import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {MainComponent} from './main/main.component';
import {TeamlistComponent} from './teamlist/teamlist.component';
import {ContactComponent} from './contact/contact.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TeamService} from './team.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AuthService} from './auth.service';
import {AuthInterceptor} from './auth-interceptor';
import {Globals} from './globals';
import {RegistrationConfirmationComponent} from './registration-confirmation/registration-confirmation.component';
import { WallOfFameComponent } from './wall-of-fame/wall-of-fame.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    TeamlistComponent,
    ContactComponent,
    LoginComponent,
    RegisterComponent,
    RegistrationConfirmationComponent,
    WallOfFameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    Globals,
    TeamService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
