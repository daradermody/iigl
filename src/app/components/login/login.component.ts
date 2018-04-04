import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {NotificationService} from '../../services/notification.service';
import {CustomValidators} from '../register/validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private notifier: NotificationService) {

    this.form = this.fb.group({
      email: ['', CustomValidators.email],
      password: ['', CustomValidators.minLength(3)]
    });
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if ('token' in params) {
        this.authService.confirmAccountCreationToken(params['token']).subscribe(
          () => this.notifier.emitMessage('Registration complete! Please login')
        );
      }
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

  login() {
    (<any>Object).values(this.form.controls).forEach(control => {
      control.markAsTouched();
      control.markAsDirty();
    });

    if (!this.form.valid) {
      throw new Error('The form still has errors');
    }

    const val = this.form.value;
    this.authService.login(val.email.toLowerCase(), val.password)
      .subscribe(
        () => this.router.navigateByUrl('/')
          .then(() => this.notifier.emitMessage('Logged in'))
      );
  }
}
