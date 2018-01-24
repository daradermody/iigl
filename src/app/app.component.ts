import { Component } from '@angular/core';
import {AuthService} from './auth.service';
import {Globals} from './globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public globals: Globals) {
  }

  isLoggedIn() {
    return AuthService.isLoggedIn();
  }

  logout() {
    AuthService.logout();
    this.globals.emitError('Logged out');
  }
}
