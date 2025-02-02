import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatLabel, MatHint, MatError, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {PASSWORD_VALIDATOR} from "../../../shared/regexes";
import {formatDate, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {HttpClient} from "@angular/common/http";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {provideNativeDateAdapter} from '@angular/material/core';
import {Router} from "@angular/router";
import {
  RouterDataTransferService,
} from "../../../services/registration-service/router-data-transfer-service.service";


@Component({
  selector: 'app-registration-page',
  standalone: true,
  providers: [provideNativeDateAdapter()],
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
    MatDatepickerInput
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
    dateOfBirth: new FormControl(formatDate(this.today, this.dateFormat, this.locale), {}),
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
  surnameError = '';
  passwordError = '';

  constructor(private http: HttpClient,
              private router: Router,
              private routerDataTransfer: RouterDataTransferService) {
    Object.entries(this.registrationForm.controls).forEach(control => {
      console.log(control);
      control[1].statusChanges.subscribe(status => {
        if (status === 'INVALID') {
          console.log(control);
          this.updateError(control);
        }
      });
    });
  }

  ngOnInit(): void {
    this.today.setFullYear(this.today.getFullYear() - 18);

  }

  onSubmit(): void {
    if (this.registrationForm.value.password !== this.registrationForm.value.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    this.http.post('http://localhost:8080/auth/register', this.registrationForm.value)
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
      case 'lastname':
        this.surnameError = error['required'] ? 'Surname is required' : error['minlength'] ? 'Surname must be at least 2 characters' : '';
        break;
      case 'password':
        this.passwordError = error['required'] ? 'Password is required' : error['pattern'] ? 'Password does not meet requirements' : '';
        break;
    }
  }
}
