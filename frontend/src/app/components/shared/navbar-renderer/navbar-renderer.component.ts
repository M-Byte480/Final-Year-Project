/*
Made with the help of Copilot
 */
import {Component, OnInit} from '@angular/core';
import {NavbarStateService} from "../../../services/states/navbar-state/navbar-state.service";
import {NgForOf, NgIf} from "@angular/common";
import {NavBarStateStruct} from "../../../shared/data-types";

@Component({
  selector: 'app-navbar-renderer',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './navbar-renderer.component.html',
  styleUrl: './navbar-renderer.component.css'
})
export class NavbarRendererComponent implements OnInit {
  currentState: NavBarStateStruct = {} as NavBarStateStruct;
  navbarHidden = true;

  constructor(private navbarService: NavbarStateService) {
    this.navbarService.state$.subscribe((state) => {
      this.currentState = state;
    });
  }

  ngOnInit() {
    this.currentState = this.navbarService.getState();
  }

  routeTo(route: string) {
    window.open(route, '_self');
  }

  hide() {
    this.navbarHidden = !this.navbarHidden;
  }
}
