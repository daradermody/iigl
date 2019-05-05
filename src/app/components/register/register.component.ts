import {Component, ErrorHandler} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {NotificationService} from '../../services/notification.service';
import {User} from '../../data_types/user';
import {Team} from '../../data_types/team';
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
      imageUri: '/assets/img/game_logos/league_of_legends.png',
      selected: false
    }, {
      name: 'Overwatch',
      imageUri: '/assets/img/game_logos/overwatch.png',
      selected: false
    }, {
      name: 'Rocket League',
      imageUri: '/assets/img/game_logos/rocket_league.png',
      selected: false
    }, {
      name: 'Hearthstone',
      imageUri: '/assets/img/game_logos/hearthstone.png',
      selected: false
    }, {
      name: 'Dota 2',
      imageUri: '/assets/img/game_logos/dota.png',
      selected: false
    }, {
      name: 'StarCraft II',
      imageUri: '/assets/img/game_logos/starcraft.png',
      selected: false
    }
  ];

  processing = false;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private notifier: NotificationService,
              private errorHandler: ErrorHandler) {

    this.form = this.fb.group({
      email: ['', CustomValidators.email],
      battlefy: ['', CustomValidators.required],
      password: ['', CustomValidators.minLength(3)],
      confirmPassword: ['']
    }, {
      validator: CustomValidators.fieldsMatch('confirmPassword', 'password')
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

  register() {
    this.processing = true;
    this.verifyForm(this.form)
      .then((formValues) => this.registerUser(formValues))
      .then(() => this.notifier.emitMessage('Registration email has been sent (also check Junk)'))
      .catch((e) => this.errorHandler.handleError(e))
      .then(() => this.processing = false);

  }

  private verifyForm(form: FormGroup): Promise<any> {
    return new Promise((resolve, reject) => {
      (<any>Object).values(this.form.controls).forEach(control => {
        control.markAsTouched();
        control.markAsDirty();
      });
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

  private async registerUser(formValues) {
    const selectedGames = this.games.filter((game) => game.selected).map((game) => game.name);
    const user = new User(formValues.email, formValues.battlefy, formValues.password, selectedGames);

    const res = await this.authService.registerUser(user).toPromise();
    this.router.navigateByUrl(res['redirect']);
  }

/*   private async registerTeam(formValues) {
    //const selectedGames = this.games.filter((game) => game.selected).map((game) => game.name);
    const team = new Team(formValues.name, 0, 0, ["Game1"], false);

    const res = await this.authService.registerTeam(team).toPromise();
    this.router.navigateByUrl(res['redirect']);
  } */
}
