import { Component } from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css'
})
export class NavigationBarComponent {
  navbarHidden = true;

  routeTo(route: string) {
    window.open(route, '_self');
  }

  hide() {
    this.navbarHidden = !this.navbarHidden;
  }
}
