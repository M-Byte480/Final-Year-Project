import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatLabel, MatHint, MatError, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {PASSWORD_VALIDATOR} from "../../../shared/regexes";
import {formatDate, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {HttpClient} from "@angular/common/http";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, provideNativeDateAdapter} from '@angular/material/core';
import {Router} from "@angular/router";
import {
  RouterDataTransferService,
} from "../../../services/registration-service/router-data-transfer-service.service";
import {environment} from "../../../../environments/environment";
import {MY_DATE_FORMATS} from "../../../shared/constants";
import {MatMomentDateModule, MomentDateAdapter} from "@angular/material-moment-adapter";


@Component({
  selector: 'app-registration-page',
  standalone: true,
  providers: [provideNativeDateAdapter(),
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    MatTooltip,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerInput,
    MatButton,
    MatMomentDateModule
  ],
  templateUrl: './registration-page.component.html'
})
export class RegistrationPageComponent {
  private today = new Date();
  private dateFormat = 'dd/MM/yyyy';
  private locale = 'en-UK';

  registrationForm = new FormGroup({
    firstname: new FormControl('', {
      validators: [Validators.required, Validators.minLength(2)]
    }),
    surname: new FormControl('', {
      validators: [Validators.required, Validators.minLength(2)]
    }),
    dateOfBirth: new FormControl(formatDate(this.today, this.dateFormat, this.locale), {
      validators: [Validators.required, this.ageValidator(18)]
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
  firstnameError = '';
  lastnameError = '';
  passwordError = '';
  dateOfBirthError = '';
  confirmPasswordError = '';

  constructor(private http: HttpClient,
              private router: Router,
              private routerDataTransfer: RouterDataTransferService) {
    Object.entries(this.registrationForm.controls).forEach(control => {
      control[1].statusChanges.subscribe(status => {
        if (status === 'INVALID') {
          this.updateError(control);
        }
      });
    });
  }

  ngOnInit(): void {
    this.today.setFullYear(this.today.getFullYear() - 18);

  }

  ageValidator(minAge: number) {
    return (control: AbstractControl) => {
      if (control.value) {
        const dateOfBirth = new Date(control.value);
        const today = new Date();
        let dateBeforeValid = new Date(today);
        dateBeforeValid.setFullYear(today.getFullYear() - minAge);

        if (dateOfBirth > dateBeforeValid) {
          return {age: true};
        }
      }
      return null;
    };
  }

  onSubmit(): void {
    if (this.registrationForm.value.password !== this.registrationForm.value.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    const url = environment.apiUrl + '/auth/register';

    this.http.post(url, this.registrationForm.value)
      .subscribe({
        next: (response) => {
          this.routerDataTransfer.setState({apiResponse: response});
          this.router.navigate(['/validate-email']);
        },
        error: (e) => {
          // todo: display error, such as email already in use
        },
        complete: () => {

        }
      });
  }

  testConnection(): void{
    const url = environment.apiUrl + '/auth/test';
    this.http.get(url)
      .subscribe({
        next: (response) => {
          console.log('Test connection successful', response);
        },
        error: (e) => {
          console.error('Test connection failed', e);
        }
      });
  }

  updateError(control: [string, FormControl]): void {
    const name = control[0];
    const error = control[1].errors!;

    switch (name) {
      case 'email':
        this.emailError = error['required'] ? 'Email is required' : error['email'] ? 'Email is invalid' : '';
        break;
      case 'firstname':
        this.firstnameError = error['required'] ? 'Firstname is required' : error['minlength'] ? 'Firstname must be at least 2 characters' : '';
        break;
      case 'surname':
        this.lastnameError = error['required'] ? 'Surname is required' : error['minlength'] ? 'Surname must be at least 2 characters' : '';
        break;
      case 'password':
        this.passwordError = error['required'] ? 'Password is required' : error['pattern'] ? 'Password does not meet requirements' : '';
        break;
      case 'dateOfBirth':
        this.dateOfBirthError = error['required'] ? 'Age is required' : error['age'] ? 'You must be at least 18 years old' : '';
        break;
      case 'confirmPassword':
        this.confirmPasswordError = this.registrationForm.value.password !== this.registrationForm.value.confirmPassword ? 'Passwords do not match' : '';
        break;
    }

    console.log(`Error for ${name}: ${this.lastnameError}`);
  }
}
