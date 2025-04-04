import {Component, OnInit, ViewChild} from '@angular/core';
import {SidePanelComponent} from "../../shared/side-banner/side-panel.component";
import {PanelItem} from "../../../shared/data-types";
import {DeleteComponent} from "./delete/delete.component";
import {ProductManagerComponent} from "./product-manager/product-manager.component";
import {AnalyticsComponent} from "./analytics/analytics.component";
import {DeployComponent} from "./deploy/deploy.component";
import {OverviewComponent} from "./overview/overview.component";
import {ComposerSelectorComponent} from "./composer-selector/composer-selector.component";
import {NavigationManagerComponent} from "./navigation-manager/navigation-manager.component";
import {NavigationBarComponent} from "../../shared/navigation-bar/navigation-bar.component";
import {FooterManagerComponent} from "./footer-manager/footer-manager.component";
import {environment} from "../../../../environments/environment";
import {JwtServiceService} from "../../../services/authentication/jwt-service.service";

@Component({
  selector: 'app-site-dashboard',
  standalone: true,
  imports: [
    SidePanelComponent,
    NavigationBarComponent
  ],
  templateUrl: './site-dashboard.component.html'
})
export class SiteDashboardComponent implements OnInit {
  @ViewChild(SidePanelComponent) sidePanel!: SidePanelComponent;

  constructor(private jwtService: JwtServiceService) {

  }

  ngOnInit(){
    if(!environment.dev){
      this.jwtService.authenticateUser();
    }

    // Todo: get the site id from the url and populate the rest of the page with content
  }


  onPanelSelected(item: PanelItem): void {
    this.loadComponent(item.component);
  }

  loadComponent(component: any): void {
    this.sidePanel.dynamicContainer.clear();
    const componentRef = this.sidePanel.dynamicContainer.createComponent(component);
  }

  protected delete: PanelItem = {
    panelName: 'Delete',
    component: DeleteComponent
  };

  protected deploy: PanelItem = {
    panelName: 'Deployment',
    component: DeployComponent
  };

  protected analytics: PanelItem = {
    panelName: 'Analytics',
    component: AnalyticsComponent
  };

  protected overview: PanelItem = {
    panelName: 'Overview',
    component: OverviewComponent
  };

  protected composer: PanelItem = {
    panelName: 'Composer Manager',
    component: ComposerSelectorComponent
  };

  protected productManager: PanelItem = {
    panelName: 'Product Manager',
    component: ProductManagerComponent
  };

  protected navigationManager: PanelItem = {
    panelName: 'Navigation Manager',
    component: NavigationManagerComponent
  };

  protected footerManager: PanelItem ={
    panelName: 'Footer Manager',
    component: FooterManagerComponent
  };

  protected readonly panelActions: PanelItem[] = [
    // this.overview,
    this.deploy,
    this.composer,
    this.navigationManager,
    this.footerManager,
    // this.analytics,
    // this.productManager,
    this.delete
  ]
}
