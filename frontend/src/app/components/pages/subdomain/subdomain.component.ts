import {Component, OnInit} from '@angular/core';
import {SubdomainService} from "../../../services/subdomain.service";
import {ActivatedRoute} from "@angular/router";
import {HttpApiService} from "../../../services/http/http-api.service";
import {HttpParams} from "@angular/common/http";
import {ENDPOINTS} from "../../../services/http/endpoints";
import {NgIf} from "@angular/common";
import {SitePreviewComponent} from "../preview/site-preview/site-preview.component";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-subdomain',
  standalone: true,
  imports: [
    NgIf,
    SitePreviewComponent,
    MatProgressSpinner
  ],
  templateUrl: './subdomain.component.html'
})
export class SubdomainComponent implements OnInit{
  subRoute: string = '';
  subPageName: string = '';
  pageExists: boolean = false;
  isLoading = true;
  page: any = {};

  constructor(private activatedRoute: ActivatedRoute,
              private httpSerivce: HttpApiService) {}

  ngOnInit() {
    // this.subRoute = this.subdomainService.getStoredSubdomain();
    this.subRoute = this.activatedRoute.snapshot.paramMap.get('sub-route') || '';
    this.subPageName = this.activatedRoute.snapshot.paramMap.get('sub-page-name') || '';
    this.loadContent();
  }

  loadContent() {
    const httpParams = new HttpParams()
      .set('subRoute', this.subRoute)
      .set('subPageName', this.subPageName);

    /*
    {
      deployed: false,
      pages: [
        {
          name: string,
          content: string,
          uuid: string
        }
      ],
      footer: {
        content: string
      },
      navbar: {
        content: string
      }
    }
     */
    this.httpSerivce.getNoAuth(ENDPOINTS['getDeployedSite'], httpParams).subscribe({
    next: (response: any) =>
    {
      this.pageExists = true;
      this.page = response;
      this.isLoading = false;
    },
      error: (error: any) => {
      this.pageExists = false;
      this.isLoading = false;
      }
  });
  }
}
