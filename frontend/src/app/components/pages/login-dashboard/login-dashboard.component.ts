import {Component, OnInit} from '@angular/core';
import {ButtonComponent} from "../../shared/button/button.component";
import {Router} from "@angular/router";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-login-dashboard',
  standalone: true,
  imports: [
    ButtonComponent,
  ],
  templateUrl: './login-dashboard.component.html'
})
export class LoginDashboardComponent implements OnInit{

  constructor(private routes: Router) {
  }

  ngOnInit() {
    console.log(environment.test);
  }

  login(): void {
    this.routes.navigate(['/login']).then();
  }

  signup(): void {
    this.routes.navigate(['/register']).then();
  }
}
