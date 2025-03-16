import {Component, OnInit} from '@angular/core';
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
  pageState: string = '';

  constructor(private jwtService: JwtServiceService,
              private subdomainService: SubdomainService,
              private apiService: HttpApiService) {
  }

  ngOnInit() {
    if (!environment.dev) {
      this.jwtService.authenticateUser();
    }

    this.subdomain = this.subdomainService.getSubDomain();

    if (this.subdomain !== '') {
      // Subdomain was entered, we need to pull the content from the backend
      const params = new HttpParams().set('subdomain', this.subdomain);
      this.apiService.get(ENDPOINTS['subdomain'], params).subscribe((response: any) => {
        this.pageState = response.page;
        // todo: set navbar
        // todo: set footer
        console.log(response);
      });
    }
  }

  protected readonly COMPONENT_NAME = COMPONENT_NAME;
}

