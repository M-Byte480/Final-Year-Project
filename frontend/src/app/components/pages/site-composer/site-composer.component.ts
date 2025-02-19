import {Component, OnInit} from '@angular/core';
import {PanelComposerComponent} from "./panel-composer/panel-composer.component";
import {BuilderComponent} from "./builder/builder.component";
import {environment} from "../../../../environments/environment";
import {JwtServiceService} from "../../../services/authentication/jwt-service.service";

@Component({
  selector: 'app-site-composer',
  standalone: true,
  imports: [
    PanelComposerComponent,
    BuilderComponent
  ],
  templateUrl: './site-composer.component.html'
})
export class SiteComposerComponent implements OnInit {
  constructor(private jwtService: JwtServiceService) {
  }

  ngOnInit() {
    if(!environment.dev){
      this.jwtService.authenticateUser();
    }
  }

}
