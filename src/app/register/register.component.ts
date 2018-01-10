import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Globals} from "../globals";
import {User} from "../user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  form: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private globals: Globals) {

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      company: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  register() {
    const val = this.form.value;

    if (!this.form.valid) {
      this.globals.emitError('The form is not complete');
      return;
    }
    const user = new User(val.email, val.name, val.company, val.password);

    if (user.isValid()) {
      this.authService.register(user)
        .subscribe(
          (r) => {
            // TODO: Remove automatic registration
            this.router.navigateByUrl(r['redirect']);
            this.globals.emitError("Registration email has been sent");
          },
          (error: HttpErrorResponse) => {
            console.dir(error);
            if (error.status == 500) {
              this.globals.emitError(error.message);
            } else {
              this.globals.emitError(error.error);
            }
          }
        );
    }
  }

  getBoxShadow(controlName) {
    if (this.form.get(controlName).touched && this.form.get(controlName).errors) {
      return '0px 0px 10px 5px #CC0000';
    }
  }
}
