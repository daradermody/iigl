import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {NotificationService} from '../../services/notification.service';
import {User} from '../../data_types/user';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {CustomValidators} from './validators';

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
      imageUri: '/assets/img/game_logos/league_of_legends.webp',
      selected: false
    }, {
      name: 'Overwatch',
      imageUri: '/assets/img/game_logos/overwatch.webp',
      selected: false
    }, {
      name: 'Rocket League',
      imageUri: '/assets/img/game_logos/rocket_league.webp',
      selected: false
    }, {
      name: 'Hearthstone',
      imageUri: '/assets/img/game_logos/hearthstone.webp',
      selected: false
    }, {
      name: 'Dota 2',
      imageUri: '/assets/img/game_logos/dota.webp',
      selected: false
    }, {
      name: 'StarCraft II',
      imageUri: '/assets/img/game_logos/starcraft.webp',
      selected: false
    }
  ];

  processing = false;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private notifier: NotificationService) {

    this.form = this.fb.group({
      email: ['', CustomValidators.email],
      battlefy: ['', CustomValidators.required],
      password: ['', CustomValidators.minLength(3)],
      confirmPassword: ['']
    }, {
      validator: CustomValidators.fieldsMatch('confirmPassword', 'password')
    });
  }

  registerWithLoadingBar() {
    this.processing = true;
    this.register()
      .then(() => this.processing = false)
      .catch((e) => {
        this.notifier.emitError(e);
        this.processing = false;
        throw e;
      });

  }

  register(): Promise<void> {
    return this.verifyForm(this.form)
      .then((formValues) => this.registerUser(formValues))
      .then(() => this.notifier.emitMessage('Registration email has been sent'));
  }

  verifyForm(form: FormGroup): Promise<any> {
    return new Promise((resolve, reject) => {
      RegisterComponent.verifyNoFieldsEmpty(form);

      (<any>Object).values(this.form.controls).forEach(control => control.markAsTouched());
      if (!this.form.valid) {
        throw new Error('The form still has errors');
      }

      this.authService.getBattlefyAccountInfo(this.form.value.battlefy).toPromise()
        .then(() => {
          document.getElementById('battlefy').style.boxShadow = 'none';
          resolve(form.value);
        })
        .catch(() => {
          this.form.get('battlefy').setErrors({UserNotFound: 'Username does not exist in Battlefy'});
          reject('The form still has errors');
        });
    });
  }

  static verifyNoFieldsEmpty(form) {
    for (const key of Object.keys(form.value)) {
      if (!form.value[key]) {
        throw new Error('Some fields are empty');
      }
    }
  }

  registerUser(formValues): Promise<void> {
    return new Promise((resolve, reject) => {
      const selectedGames = this.games.filter((game) => game.selected).map((game) => game.name);
      const user = new User(formValues.email, formValues.battlefy, formValues.password, selectedGames);

      this.authService.register(user)
        .subscribe(
          (res: HttpResponse<any>) => this.router.navigateByUrl(res['redirect']).then(() => resolve()),
          (error: HttpErrorResponse) => reject((error.status === 500) ? error.message : error.error)
        );
    });
  }

  getErrors(controlName: string): string {
    const control = this.form.get(controlName);
    if (control.dirty && control.touched && control.errors) {
      return (<any>Object).values(control.errors).join('<br>');
    } else {
      return '';
    }
  }

  getBoxShadow(controlName) {
    const control = this.form.get(controlName);
    if (control.dirty && control.touched && control.errors) {
      return '0px 0px 10px 5px #CC0000';
    }
  }
}
