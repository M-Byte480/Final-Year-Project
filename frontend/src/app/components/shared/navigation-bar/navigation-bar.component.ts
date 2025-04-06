import { Component } from '@angular/core';
import {NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [
    NgIf,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './navigation-bar.component.html'
})
export class NavigationBarComponent {
  navbarHidden = true;

  constructor(private router: Router) {
  }

  routeTo(route: string) {
    window.open(route, '_self');
  }

  hide() {
    this.navbarHidden = !this.navbarHidden;
  }

  goToDashboard(): void{
    this.router.navigate(['/overview']).then(r => {});
  }

  goToProfile(): void{
    this.router.navigate(['/profile']).then(r => {});
  }
}
