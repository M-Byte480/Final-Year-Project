/*
Code snippets taken from material angular documentation
https://material.angular.io/components/sidenav/examples
 */

import {MediaMatcher} from '@angular/cdk/layout';
import {MatNavList} from '@angular/material/list';
import {MatSidenav, MatSidenavContainer} from '@angular/material/sidenav';
import {MatIcon} from '@angular/material/icon';
import {MatToolbar} from '@angular/material/toolbar';
import {
  Component,
  OnDestroy,
  inject,
  signal,
  Input,
  ViewContainerRef,
  ViewChild,
  EventEmitter,
  Output, OnInit, AfterContentInit, AfterViewInit
} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {Router, RouterLink} from '@angular/router';
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


export class SidePanelComponent implements AfterViewInit, OnDestroy {
  @Input() panelItems: PanelItem[] = [];
  @Output() panelSelected = new EventEmitter<PanelItem>();
  @ViewChild('dynamicContainer', {read: ViewContainerRef}) dynamicContainer!: ViewContainerRef;

  protected readonly isMobile = signal(true);
  private currentRoute = window.location.href;
  private readonly _mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;

  constructor(
    private router: Router
  ) {
    const media = inject(MediaMatcher);

    this._mobileQuery = media.matchMedia('(max-width: 600px)');
    this.isMobile.set(this._mobileQuery.matches);
    this._mobileQueryListener = () => this.isMobile.set(this._mobileQuery.matches);
    this._mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  // Default init
  ngAfterViewInit(): void {
    this.panelItems.forEach(item => {
      if (item.panelName == 'Deployment') {
        this.panelSelected.emit(item);
      }
    })
  }

  onPanelClick(item: PanelItem): void {

    this.panelSelected.emit(item);
  }

  goToDashboard(): void{
    this.router.navigate(['/overview']).then(r => {});
  }

  goToProfile(): void{
    this.router.navigate(['/profile']).then(r => {});
  }

  ngOnDestroy(): void {
    this._mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }
}
