import {Component, ViewChild, ViewContainerRef} from '@angular/core';
import {SidePanelComponent} from "../../shared/side-banner/side-panel.component";
import {PanelItem} from "../../../shared/data-types";
import {DeleteComponent} from "./delete/delete.component";
import {ProductManagerComponent} from "./product-manager/product-manager.component";
import {AnalyticsComponent} from "./analytics/analytics.component";
import {DeployComponent} from "./deploy/deploy.component";
import {OverviewComponent} from "./overview/overview.component";

@Component({
  selector: 'app-site-dashboard',
  standalone: true,
  imports: [
    SidePanelComponent
  ],
  templateUrl: './site-dashboard.component.html',
  styleUrl: './site-dashboard.component.css'
})
export class SiteDashboardComponent {
  @ViewChild(SidePanelComponent) sidePanel!: SidePanelComponent;

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
    panelName: 'Deploy',
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
    panelName: 'Composer',
    component: null
  };

  protected productManager: PanelItem = {
    panelName: 'Product Manager',
    component: ProductManagerComponent
  };

  protected readonly panelActions: PanelItem[] = [
    this.overview,
    this.composer,
    this.analytics,
    this.deploy,
    this.productManager,
    this.delete
  ]
}
