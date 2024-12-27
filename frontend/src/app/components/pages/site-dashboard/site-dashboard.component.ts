import {Component} from '@angular/core';
import {SidePanelComponent} from "../../shared/side-banner/side-panel.component";

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

}
