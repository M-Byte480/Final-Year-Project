import { Routes } from '@angular/router';
import {LoginDashboardComponent} from "./components/login-dashboard/login-dashboard.component";
import {LoginPageComponent} from "./components/login-page/login-page.component";
import {RegistrationPageComponent} from "./components/registration-page/registration-page.component";

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
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
];
