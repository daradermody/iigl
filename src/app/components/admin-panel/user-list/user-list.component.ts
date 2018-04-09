import {Component, OnInit} from '@angular/core';
import {User} from '../../../data_types/user';
import {UserService} from '../../../services/user.service';
import {NotificationService} from '../../../services/notification.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: Array<User>;

  constructor(private userService: UserService,
              private notifier: NotificationService) { }

  ngOnInit(): void {
    setTimeout(() => {
        if (!this.users) {
          this.users = [];
          throw new Error('Could not get users for some unknown reason. :(');
        }
      }, 10000
    );

    this.userService.getUsers().subscribe(
      (users) => this.users = users,
      (error) => {
        this.users = [];
        throw error;
      }
    );
  }

  setAdmin(email: string, isAdmin: boolean) {
    this.userService.updateUser(email, {isAdmin}).subscribe(
      () => this.notifier.emitMessage('Updated!')
    );
  }

  setEmailVerified(email: string, emailVerified: boolean) {
    this.userService.updateUser(email, {emailVerified}).subscribe(
      () => this.notifier.emitMessage('Updated!')
    );
  }
}
