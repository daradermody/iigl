import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {ContactComponent} from './components/contact/contact.component';
import {StudentAdviceComponent} from './components/student-advice/student-advice.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {WallOfFameComponent} from './components/wall-of-fame/wall-of-fame.component';
import {TournamentsComponent} from './components/tournaments/tournaments.component';
import {AdminPanelComponent} from './components/admin-panel/admin-panel.component';
import {UserListComponent} from './components/admin-panel/user-list/user-list.component';
import {LogsComponent} from './components/admin-panel/logs/logs.component';

const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  }, {
    path: 'home',
    component: HomeComponent,
  }, {
    path: 'wallOfFame',
    component: WallOfFameComponent
  }, {
    path: 'contact',
    component: ContactComponent
  }, {
    path: 'studentAdvice',
    component: StudentAdviceComponent
  }, {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'register',
    component: RegisterComponent
  }, {
    path: 'tournaments',
    component: TournamentsComponent
  }, {
    path: 'admin',
    component: AdminPanelComponent,
    children: [
      {
        path: '',
        redirectTo: 'admin',
        pathMatch: 'full'
      }, {
        path: 'userList',
        component: UserListComponent
      }, {
        path: 'logs',
        component: LogsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
