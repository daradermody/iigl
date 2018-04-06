import {AbstractControl, ValidatorFn} from '@angular/forms';
import {ValidationErrors} from '@angular/forms/src/directives/validators';

export class CustomValidators {

  static fieldsMatch(field1Name, field2Name): ValidatorFn {
    return (control: AbstractControl) => {
      const field1 = control.get(field1Name).value;
      const field2 = control.get(field2Name).value;
      if (field1 !== field2) {
        control.get(field1Name).setErrors({FieldMatch: 'Fields do not match'});
      } else {
        control.get(field1Name).setErrors(null);
      }
      return null;
    };
  }

  static minLength(length): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return (control.value.length >= length) ? null : {MinimumLength: `Need minimum of ${length} characters`};
    };
  }

  static required(control: AbstractControl): null | ValidationErrors {
    return control.value.length ? null : {Required: 'Field is mandatory'};
  }

  static email(control: AbstractControl): ValidationErrors {
    // tslint:disable-next-line:max-line-length
    const EMAIL_REGEXP = /^(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
    return EMAIL_REGEXP.test(control.value) ? null : {Email: 'Not a valid email address'};
  }
}
