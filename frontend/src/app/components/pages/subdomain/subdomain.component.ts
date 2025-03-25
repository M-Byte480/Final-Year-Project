import {Component, OnInit} from '@angular/core';
import {SubdomainService} from "../../../services/subdomain.service";
import {ActivatedRoute} from "@angular/router";
import {HttpApiService} from "../../../services/http/http-api.service";
import {HttpParams} from "@angular/common/http";
import {ENDPOINTS} from "../../../services/http/endpoints";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-subdomain',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './subdomain.component.html'
})
export class SubdomainComponent implements OnInit{
  subRoute: string = '';
  subPageName: string = '';
  pageExists: boolean = false;

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
      default: uuid,
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
    this.httpSerivce.get(ENDPOINTS['getSubdomainContent'], httpParams).subscribe(
      (data: any) => {
        this.pageExists = true;
        console.log(data);
      },
      (error: any) => {
        console.error("Page doesn't exists");
      });
  }
}
