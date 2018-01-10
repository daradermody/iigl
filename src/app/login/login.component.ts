import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {HttpErrorResponse} from "@angular/common/http";
import {Globals} from "../globals";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private globals: Globals) {

    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    const val = this.form.value;

    if (val.email && val.password) {
      this.authService.login(val.email, val.password)
        .subscribe(
          () => {
            this.router.navigateByUrl('/');
            this.globals.emitError('Logged in');
          },
          (error: HttpErrorResponse) => {
            if (error.status == 401) {
              this.globals.emitError("Username or password is invalid");
            } else {
              this.globals.emitError(error.message);
            }
          }
        );
    }
  }
}
