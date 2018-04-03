import {AbstractControl} from '@angular/forms';
import {ValidationErrors} from '@angular/forms/src/directives/validators';

export class CustomValidators {

  static fieldsMatch(field1Name, field2Name) {
    return (control: AbstractControl) => {
      const field1 = control.get(field1Name).value;
      const field2 = control.get(field2Name).value;
      if (field1 !== field2) {
        control.get(field1Name).setErrors({FieldMatch: 'Fields do not match'});
      } else {
        control.get(field1Name).setErrors(null);
      }
    };
  }

  static minLength(length) {
    return (control: AbstractControl): ValidationErrors | null => {
      return (control.value.length >= length) ? null : {MinimumLength: `Need minimum of ${length} characters`};
    };
  }

  static required(control: AbstractControl) {
    return control.value.length ? null : {Required: 'Field is mandatory'};
  }

  static email(control: AbstractControl): ValidationErrors {
    // tslint:disable-next-line:max-line-length
    const EMAIL_REGEXP = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
    return EMAIL_REGEXP.test(control.value) ? null : {Email: 'Not a valid email address'};
  }
}
