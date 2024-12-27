/*
Code snippets taken from material angular documentation
https://material.angular.io/components/sidenav/examples
 */

import {MediaMatcher} from '@angular/cdk/layout';
import {MatNavList} from '@angular/material/list';
import {MatSidenav, MatSidenavContainer} from '@angular/material/sidenav';
import {MatIcon} from '@angular/material/icon';
import {MatToolbar} from '@angular/material/toolbar';
import {Component, OnDestroy, inject, signal} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {RouterLink} from '@angular/router';
import {PanelItem} from "../../../shared/data-types";

@Component({
  selector: 'app-side-panel',
  standalone: true,
  imports: [
    MatSidenavContainer,
    MatSidenav,
    MatNavList,
    MatIcon,
    MatToolbar,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    RouterLink
  ],
  templateUrl: './side-panel.component.html',
  styleUrl: './side-panel.component.css'
})


export class SidePanelComponent implements OnDestroy {
  protected readonly fillerNav: PanelItem[] = Array.from(
    {length: 50},
    (_, i) => `Nav Item ${i + 1}`
  ).map((name, index) => {
      return {
        panelName: name,
        onClick: () => {
          console.log(`Nav Item ${index + 1} clicked`);
        }
      };
    }
  );

  protected readonly isMobile = signal(true);

  private readonly _mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;

  constructor() {
    const media = inject(MediaMatcher);

    this._mobileQuery = media.matchMedia('(max-width: 600px)');
    this.isMobile.set(this._mobileQuery.matches);
    this._mobileQueryListener = () => this.isMobile.set(this._mobileQuery.matches);
    this._mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this._mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }
}
