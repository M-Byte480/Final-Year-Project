import {Component} from '@angular/core';
import {ButtonComponent} from "../../shared/button/button.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-dashboard',
  standalone: true,
  imports: [
    ButtonComponent,
  ],
  templateUrl: './login-dashboard.component.html',
  styleUrl: './login-dashboard.component.css'
})
export class LoginDashboardComponent {

  constructor(private routes: Router) {
  }

  login(): void {
    this.routes.navigate(['/login']).then();
  }

  signup(): void {
    this.routes.navigate(['/register']).then();
  }
}
