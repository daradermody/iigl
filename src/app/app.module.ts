import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './components/app.component';
import {HomeComponent} from './components/home/home.component';
import {ContactComponent} from './components/contact/contact.component';
import {StudentAdviceComponent} from './components/student-advice/student-advice.component';
import {EventsComponent} from './components/events/events.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {AuthService} from './services/auth.service';
import {NotificationService} from './services/notification.service';
import {WallOfFameComponent} from './components/wall-of-fame/wall-of-fame.component';
import {TournamentsComponent} from './components/tournaments/tournaments.component';
import {TournamentService} from './services/tournament.service';
import {ClipboardModule, ClipboardService} from 'ngx-clipboard';
import {NavbarComponent} from './components/navbar/navbar.component';
import {FooterComponent} from './components/footer/footer.component';
import {IiglErrorHandler} from './services/error-handler';
import {AdminPanelComponent} from './components/admin-panel/admin-panel.component';
import {UserListComponent} from './components/admin-panel/user-list/user-list.component';
import {UserService} from './services/user.service';
import {LogsComponent, SafeHtmlPipe} from './components/admin-panel/logs/logs.component';
import {DiagnosticsService} from './services/diagnostics.service';
import {JwtModule} from '@auth0/angular-jwt';
import { TournamentListComponent } from './components/tournament-list/tournament-list.component';


export function tokenGetter() {
  return localStorage.getItem('id_token');
}


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    StudentAdviceComponent,
	EventsComponent,
    LoginComponent,
    RegisterComponent,
    WallOfFameComponent,
    TournamentsComponent,
    NavbarComponent,
    FooterComponent,
    AdminPanelComponent,
    UserListComponent,
    LogsComponent,
    SafeHtmlPipe,
    TournamentListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ClipboardModule,
    JwtModule.forRoot({ config: { tokenGetter } })
  ],
  providers: [
    NotificationService,
    AuthService,
    TournamentService,
    ClipboardService,
    UserService,
    DiagnosticsService,
    {
      provide: ErrorHandler,
      useClass: IiglErrorHandler
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
