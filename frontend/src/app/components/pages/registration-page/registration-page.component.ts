import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatLabel, MatHint, MatError, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {PASSWORD_VALIDATOR} from "../../../shared/regexes";
import {NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-registration-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatHint,
    MatError,
    NgIf,
    MatIcon,
    MatIconButton,
    MatSuffix,
    MatTooltip
  ],
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.css'
})
export class RegistrationPageComponent {
  registrationForm = new FormGroup({
    firstName: new FormControl('', {
      validators: [Validators.required, Validators.minLength(2)]
    }),
    lastName: new FormControl('', {
      validators: [Validators.required, Validators.minLength(2)]
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.pattern(PASSWORD_VALIDATOR)]
    }),
    confirmPassword: new FormControl('', {
      validators: [Validators.required, Validators.pattern(PASSWORD_VALIDATOR)]
    })
  });

  emailError = '';
  firstNameError = '';
  lastNameError = '';
  passwordError = '';

  constructor() {
    Object.entries(this.registrationForm.controls).forEach(control => {
      console.log(control);
      control[1].statusChanges.subscribe(status => {
        if (status === 'INVALID') {
          this.updateError(control);
        }
      });
    });
  }

  onSubmit(): void {
    if (this.registrationForm.value.password !== this.registrationForm.value.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    console.warn(this.registrationForm.value);
  }


  updateError(control: [string, FormControl]): void {
    const name = control[0];
    const error = control[1].errors!;

    switch (name) {
      case 'email':
        this.emailError = error['required'] ? 'Email is required' : error['email'] ? 'Email is invalid' : '';
        break;
      case 'firstName':
        this.firstNameError = error['required'] ? 'Firstname is required' : error['minlength'] ? 'Firstname must be at least 2 characters' : '';
        break;
      case 'lastName':
        this.lastNameError = error['required'] ? 'Surname is required' : error['minlength'] ? 'Surname must be at least 2 characters' : '';
        break;
      case 'password':
        this.passwordError = error['required'] ? 'Password is required' : error['pattern'] ? 'Password does not meet requirements' : '';
        break;
    }
  }
}
