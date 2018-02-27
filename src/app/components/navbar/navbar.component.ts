import {Component} from '@angular/core';
import {NotificationService} from '../../services/notification.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  showNav = false;

  constructor(public notifier: NotificationService) {}

  isLoggedIn() {
    return AuthService.isLoggedIn();
  }

  logout() {
    AuthService.logout();
    this.notifier.emitMessage('Logged out');
  }
}
