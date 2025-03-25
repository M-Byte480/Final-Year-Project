import {Component, Input, OnInit} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {JwtServiceService} from "../../../../services/authentication/jwt-service.service";
import {FooterRendererComponent} from "../../../shared/footer-renderer/footer-renderer.component";
import {NavbarRendererComponent} from "../../../shared/navbar-renderer/navbar-renderer.component";
import {PageRendererComponent} from "../preview-page/page-renderer/page-renderer.component";
import {SubdomainService} from "../../../../services/subdomain.service";
import {HttpApiService} from "../../../../services/http/http-api.service";
import {ENDPOINTS} from "../../../../services/http/endpoints";
import {HttpParams} from "@angular/common/http";
import {COMPONENT_NAME} from "../../../../shared/constants";
import {NavbarStateService} from "../../../../services/states/navbar-state/navbar-state.service";
import {FooterStateService} from "../../../../services/states/footer-state/footer-state.service";
import {SiteStateManagerService} from "../../../../services/states/state-manager/site-state-manager.service";
import {DesignerStateServiceService} from "../../../../services/states/designer-service/designer-state-service.service";
import {DeployedHelperService} from "../../../../services/deployed-helper.service";

@Component({
  selector: 'app-site-preview',
  standalone: true,
  imports: [
    FooterRendererComponent,
    NavbarRendererComponent,
    PageRendererComponent
  ],
  templateUrl: './site-preview.component.html'
})
export class SitePreviewComponent implements OnInit {
  subdomain: string = '';
  @Input() body: any;
  @Input() footer: any;
  @Input() navbar: any;

  constructor(private jwtService: JwtServiceService,
              private navbarService: NavbarStateService,
              private footerService: FooterStateService,
              private pageStateManager: DesignerStateServiceService,
              private deployedStateHelper: DeployedHelperService) {
  }

  ngOnInit() {
    if (!environment.dev) {
      this.jwtService.authenticateUser();
    }

    this.deployedStateHelper.setDeployedState(true);

    this.pageStateManager.setState(this.body);
    this.footerService.setState(this.footer);
    this.navbarService.setState(this.navbar);

    this.pageStateManager.saveSession();
    this.footerService.saveSession();
    this.navbarService.saveSession();
  }

  protected readonly COMPONENT_NAME = COMPONENT_NAME;
}

