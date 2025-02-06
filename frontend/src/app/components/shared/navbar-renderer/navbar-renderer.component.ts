/*
Made with the help of Copilot
 */
import {Component, Input, OnInit} from '@angular/core';
import {NavbarStateService} from "../../../services/states/navbar-state/navbar-state.service";
import {NgForOf, NgIf} from "@angular/common";
import {NavBarStateStruct} from "../../../shared/data-types";
import {USER_COMPONENT_NAME} from "../../../shared/constants";

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
  @Input() parentComponent!: string;

  constructor(private navbarService: NavbarStateService) {
    this.navbarService.state$.subscribe((state) => {
      this.currentState = state;
      console.log('Rendered detected change');
    });
  }

  ngOnInit() {
    if(this.parentComponent === USER_COMPONENT_NAME.PREVIEW_PAGE) {
      this.currentState = this.navbarService.getSession();
    }
  }

  routeTo(route: string) {
    window.open(route, '_self');
  }

  hide() {
    this.navbarHidden = !this.navbarHidden;
  }
}
