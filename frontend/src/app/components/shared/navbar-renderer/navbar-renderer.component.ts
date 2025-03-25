/*
Made with the help of Copilot
 */
import {Component, Input, OnInit, setTestabilityGetter} from '@angular/core';
import {NavbarStateService} from "../../../services/states/navbar-state/navbar-state.service";
import {NgForOf, NgIf} from "@angular/common";
import {NavBarStateStruct} from "../../../shared/data-types";
import {COMPONENT_NAME} from "../../../shared/constants";

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
  currentRoute: string = window.location.href;

  constructor(private navbarService: NavbarStateService) {
    this.navbarService.state$.subscribe((state) => {
      this.currentState = state;
      console.log('Rendered detected change');
      console.log(this.currentState);
    });
  }

  ngOnInit() {
    if(this.parentComponent === COMPONENT_NAME.PREVIEW_PAGE) {
      this.currentState = this.navbarService.getSession();
    }
  }

  routeTo(route: string) {
    // https://url.com/root/sub-page
    // https://url.com/root
    // localhost:4200/root/sub-page
    // localhost:4200/root
    const url = new URL(this.currentRoute);
    const segments = url.pathname.split('/').filter(Boolean);// Boolean checks truthy value, thus we can remove the empty leading string from segment
    const finalPath = `/${segments[0]}/${route}`;
    window.open(finalPath, '_self');
  }

  hide() {
    this.navbarHidden = !this.navbarHidden;
  }
}
