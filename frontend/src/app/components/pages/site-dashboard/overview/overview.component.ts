import {Component} from '@angular/core';
import {DomainManagerComponent} from "./domain-manager/domain-manager.component";
import {FormsModule} from "@angular/forms";
import {HttpApiService} from "../../../../services/http/http-api.service";

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [
    DomainManagerComponent,
    FormsModule
  ],
  templateUrl: './overview.component.html'
})
export class OverviewComponent {
  protected siteName = 'Site Name';
  protected siteId = '';
  private currentRoute = window.location.href;

  constructor() {
    this.siteId = this.currentRoute.substring(this.currentRoute.lastIndexOf('/') + 1);

  }
}
