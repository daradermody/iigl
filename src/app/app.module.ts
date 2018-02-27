import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './components/app.component';
import {HomeComponent} from './components/home/home.component';
import {ContactComponent} from './components/contact/contact.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {AuthService} from './services/auth.service';
import {AuthInterceptor} from './services/auth-interceptor';
import {NotificationService} from './services/notification.service';
import {WallOfFameComponent} from './components/wall-of-fame/wall-of-fame.component';
import {TournamentsComponent} from './components/tournaments/tournaments.component';
import {TournamentService} from './services/tournament.service';
import {ClipboardModule, ClipboardService} from 'ngx-clipboard';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    LoginComponent,
    RegisterComponent,
    WallOfFameComponent,
    TournamentsComponent,
    NavbarComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ClipboardModule
  ],
  providers: [
    NotificationService,
    AuthService,
    TournamentService,
    ClipboardService,
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
