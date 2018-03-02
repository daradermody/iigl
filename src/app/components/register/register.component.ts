import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {NotificationService} from '../../services/notification.service';
import {User} from '../../data_types/user';
import {HttpErrorResponse} from '@angular/common/http';
import {PasswordValidation} from './password-validation';

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
      imageUri: '/assets/img/game_logos/league_of_legends_100.webp',
      selected: false
    }, {
      name: 'Overwatch',
      imageUri: '/assets/img/game_logos/overwatch_100.webp',
      selected: false
    }, {
      name: 'Rocket League',
      imageUri: '/assets/img/game_logos/rocket_league_100.webp',
      selected: false
    }, {
      name: 'Hearthstone',
      imageUri: '/assets/img/game_logos/hearthstone_100.webp',
      selected: false
    }, {
      name: 'Dota 2',
      imageUri: '/assets/img/game_logos/dota_100.webp',
      selected: false
    }, {
      name: 'StarCraft II',
      imageUri: '/assets/img/game_logos/starcraft_100.webp',
      selected: false
    }
  ];

  processing = false;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private notifier: NotificationService) {

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      battlefy: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(3)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(3)]]
    }, {
      validator: PasswordValidation.MatchPassword
    });
  }

  async registerWithLoadingBar() {
    this.processing = true;
    try {
      await this.register();
    } finally {
      this.processing = false;
    }
  }

  async register() {
    const val = this.form.value;

    if (!this.form.valid) {
      this.notifier.emitError('The form is not complete');
      return;
    }

    try {
      await this.authService.getBattlefyAccountInfo(val.battlefy).toPromise();
      document.getElementById('battlefy').style.boxShadow = 'none';
    } catch (err) {
      this.notifier.emitError(`"${val.battlefy}" does not exist in Battlefy`);
      document.getElementById('battlefy').style.boxShadow = '0px 0px 10px 5px #CC0000';
      return;
    }

    const selectedGames = this.games.filter((game) => game.selected).map((game) => game.name);
    const user = new User(val.email, val.battlefy, val.password, selectedGames);

    if (user.isValid()) {
      this.authService.register(user)
        .subscribe(
          (r) => {
            this.router.navigateByUrl(r['redirect']).then(() => {
              this.notifier.emitMessage('Registration user has been sent');
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
