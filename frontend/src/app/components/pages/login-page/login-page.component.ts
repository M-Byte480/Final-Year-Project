import {Component, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {HttpApiService} from "../../../services/http/http-api.service";
import {ENDPOINTS} from "../../../services/http/endpoints";
import {JwtServiceService} from "../../../services/authentication/jwt-service.service";
import {JwtToken} from "../../../shared/data-types";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  standalone: true,
    imports: [
        ReactiveFormsModule,
        MatFormField,
        MatInput,
        MatIconButton,
        MatIcon,
        MatLabel,
        MatIconModule,
        MatSuffix,
        MatButton
    ],
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent {
  hide = signal<boolean>(true);

  constructor(private httpService: HttpApiService,
              private jwtService: JwtServiceService,
              private router: Router) {
  }

  passwordClickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  loginForm = new FormGroup({
    email: new FormControl('',
      [
        Validators.required,
        Validators.email
      ]
    ),
    password: new FormControl('',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)
      ]),
  });

  isFormValid(): boolean {
    return this.loginForm.valid;
  }

  onSubmit() {
    this.httpService.call(ENDPOINTS['loginUser'], this.loginForm.value).subscribe({
      next: (response: JwtToken) => {
        this.jwtService.save(response);
        this.router.navigate(['/overview']).then();
      },
      error: (error) => {
        console.error(error);
      }
    })
  }
}
