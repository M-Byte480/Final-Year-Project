import {Component, OnInit} from '@angular/core';
import {DesignerStateServiceService} from "../../../../services/states/designer-service/designer-state-service.service";
import {RootComponent} from "../../../../shared/data-types";
import {PageRendererComponent} from "./page-renderer/page-renderer.component";
import {NavbarRendererComponent} from "../../../shared/navbar-renderer/navbar-renderer.component";
import {FooterRendererComponent} from "../../../shared/footer-renderer/footer-renderer.component";
import {COMPONENT_NAME} from "../../../../shared/constants";
import {FooterStateService} from "../../../../services/states/footer-state/footer-state.service";
import {NavbarStateService} from "../../../../services/states/navbar-state/navbar-state.service";
import {environment} from "../../../../../environments/environment";
import {JwtServiceService} from "../../../../services/authentication/jwt-service.service";
import {DeployedHelperService} from "../../../../services/deployed-helper.service";

@Component({
  selector: 'app-preview-page',
  standalone: true,
  imports: [
    PageRendererComponent,
    NavbarRendererComponent,
    FooterRendererComponent
  ],
  templateUrl: './preview-page.component.html'
})
export class PreviewPageComponent implements OnInit {
  public pageState: RootComponent | null = null;

  constructor(private stateService: DesignerStateServiceService,
              private footerService: FooterStateService,
              private navbarService: NavbarStateService,
              private jwtService: JwtServiceService,
              private deployedStateHelper: DeployedHelperService) {
    this.stateService.state$.subscribe( (state) => {
      this.pageState = state;
    });
  }

  ngOnInit(){
    if(!environment.dev){
      this.jwtService.authenticateUser();
    }
    this.deployedStateHelper.setDeployedState(true);

    this.footerService.getSession();
    this.navbarService.getSession();
    this.stateService.getSession();
  }

  protected readonly COMPONENT_NAME = COMPONENT_NAME;
}
