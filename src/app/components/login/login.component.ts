import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {HttpErrorResponse} from '@angular/common/http';
import {NotificationService} from '../../services/notification.service';

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
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if ('token' in params) {
        this.authService.confirmAccountCreationToken(params['token']).subscribe(
          () => this.notifier.emitMessage('Registration complete! Please login'),
          (error) => this.notifier.emitError('Error: ' + error.error.message)
        );
      }
    });
  }

  login() {
    const val = this.form.value;

    if (val.email && val.password) {
      this.authService.login(val.email, val.password)
        .subscribe(
          () => {
            this.router.navigateByUrl('/').then(() => {
              this.notifier.emitMessage('Logged in');
            });
          },
          (error: HttpErrorResponse) => {
            if (error.status === 401) {
              this.notifier.emitError('Username or password is invalid');
            } else {
              this.notifier.emitError(error.message);
            }
          }
        );
    }
  }
}
