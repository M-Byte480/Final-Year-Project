import {Routes} from '@angular/router';
import {LoginDashboardComponent} from "./components/pages/login-dashboard/login-dashboard.component";
import {LoginPageComponent} from "./components/pages/login-page/login-page.component";
import {RegistrationPageComponent} from "./components/pages/registration-page/registration-page.component";
import {SecurityCodePageComponent} from "./components/pages/security-code-page/security-code-page.component";
import {SiteManagerComponent} from "./components/pages/site-manager/site-manager.component";
import {SiteDashboardComponent} from "./components/pages/site-dashboard/site-dashboard.component";
import {SiteComposerComponent} from "./components/pages/site-composer/site-composer.component";

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
    path: 'overview',
    component: SiteManagerComponent
  },
  {
    path: 'overview/:siteId',
    component: SiteDashboardComponent
  },
  {
    path: 'overview/:siteId/composer',
    component: SiteComposerComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];
