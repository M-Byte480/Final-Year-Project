import {Component} from '@angular/core';
import {DomainManagerComponent} from "./domain-manager/domain-manager.component";

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [
    DomainManagerComponent
  ],
  templateUrl: './overview.component.html'
})
export class OverviewComponent {
  protected siteName = 'Site Name';
  protected siteId = '03179a26-de68-4d46-bfe7-17c5eb50387d';
}
