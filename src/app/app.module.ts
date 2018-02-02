import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {MainComponent} from './main/main.component';
import {ContactComponent} from './contact/contact.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AuthService} from './auth.service';
import {AuthInterceptor} from './auth-interceptor';
import {Globals} from './globals';
import {RegistrationConfirmationComponent} from './registration-confirmation/registration-confirmation.component';
import {WallOfFameComponent} from './wall-of-fame/wall-of-fame.component';
import {TournamentsComponent} from './tournaments/tournaments.component';
import {TournamentService} from './tournament.service';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ContactComponent,
    LoginComponent,
    RegisterComponent,
    RegistrationConfirmationComponent,
    WallOfFameComponent,
    TournamentsComponent,
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
    AuthService,
    TournamentService,
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
