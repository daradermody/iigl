import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {NotificationService} from '../../services/notification.service';
import {User} from '../../data_types/user';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: FormGroup;
  games: any = [
    {
      name: 'League of Legends',
      imageUri: 'https://image.ibb.co/gYe4LG/League_of_Legends_logo.png',
      selected: false
    }, {
      name: 'Overwatch',
      imageUri: 'https://image.ibb.co/hMFpnw/overwatch_logo.png',
      selected: false
    }, {
      name: 'Rocket League',
      imageUri: 'https://image.ibb.co/ckYg0G/Rocket_League_Logo.png',
      selected: false
    }, {
      name: 'Heathstone',
      imageUri: 'https://image.ibb.co/g6mZLG/hearthstone_logo.png',
      selected: false
    }
  ];

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private notifier: NotificationService) {

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      battlefy: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  async register() {
    const val = this.form.value;

    try {
      await this.authService.getBattlefyAccountInfo(val.battlefy).toPromise();
      document.getElementById('battlefy').style.boxShadow = 'none';
    } catch (err) {
      this.notifier.emitError(`"${val.battlefy}" does not exist in Battlefy`);
      document.getElementById('battlefy').style.boxShadow = '0px 0px 10px 5px #CC0000';
      return;
    }

    if (!this.form.valid) {
      this.notifier.emitError('The form is not complete');
      return;
    }

    const selectedGames = this.games.filter((game) => game.selected).map((game) => game.name);
    const user = new User(val.email, val.battlefy, val.password, selectedGames);

    if (user.isValid()) {
      // console.dir(user);
      this.authService.register(user)
        .subscribe(
          (r) => {
            this.router.navigateByUrl(r['redirect']).then(() => {
              this.notifier.emitMessage('Registration email has been sent');
            });
          },
          (error: HttpErrorResponse) => {
            console.dir(error);
            if (error.status === 500) {
              this.notifier.emitError(error.message);
            } else {
              this.notifier.emitError(error.error);
            }
          }
        );
    }
  }

  getBoxShadow(controlName) {
    if (this.form.get(controlName).value && this.form.get(controlName).touched && this.form.get(controlName).errors) {
      return '0px 0px 10px 5px #CC0000';
    }
  }
}
