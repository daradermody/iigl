import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main/main.component';
import {ContactComponent} from './contact/contact.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {RegistrationConfirmationComponent} from './registration-confirmation/registration-confirmation.component';
import {WallOfFameComponent} from './wall-of-fame/wall-of-fame.component';
import {TournamentsComponent} from './tournaments/tournaments.component';

const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  }, {
    path: 'home',
    component: MainComponent,
  }, {
    path: 'wallOfFame',
    component: WallOfFameComponent
  }, {
    path: 'contact',
    component: ContactComponent
  }, {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'register',
    component: RegisterComponent
  }, {
    path: 'registrationConfirmationUrl',
    component: RegistrationConfirmationComponent
  }, {
    path: 'tournaments',
    component: TournamentsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
