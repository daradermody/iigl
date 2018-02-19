import {Component} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {NotificationService} from '../services/notification.service';
import {ErrorMessage, InfoMessage} from '../data_types/info-message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public notifier: NotificationService) {
  }

  isLoggedIn() {
    return AuthService.isLoggedIn();
  }

  logout() {
    AuthService.logout();
    this.notifier.emitMessage('Logged out');
  }

  isError(m: InfoMessage) {
    return m instanceof ErrorMessage;
  }
}
