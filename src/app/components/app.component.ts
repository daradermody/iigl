import {Component, OnInit} from '@angular/core';
import {NotificationService} from '../services/notification.service';
import {ErrorMessage, InfoMessage} from '../data_types/info-message';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public notifier: NotificationService,
              private router: Router) {
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

  isError(m: InfoMessage) {
    return m instanceof ErrorMessage;
  }
}
