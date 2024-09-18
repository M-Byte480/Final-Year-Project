import {Routes} from '@angular/router';
import {LoginDashboardComponent} from "./components/pages/login-dashboard/login-dashboard.component";
import {LoginPageComponent} from "./components/pages/login-page/login-page.component";
import {RegistrationPageComponent} from "./components/pages/registration-page/registration-page.component";
import {SecurityCodePageComponent} from "./components/pages/security-code-page/security-code-page.component";

export const routes: Routes = [
  {
    path: 'home',
    component: LoginDashboardComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'register',
    component: RegistrationPageComponent,
  },
  {
    path: 'validate-email',
    component: SecurityCodePageComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
];
