import {Component, OnInit} from '@angular/core';
import {DomainManagerComponent} from "../overview/domain-manager/domain-manager.component";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatButton} from "@angular/material/button";
import {Router} from "@angular/router";
import {ApiManagerService} from "../../../../services/managers/api-manager.service";
import {HttpApiService} from "../../../../services/http/http-api.service";
import {PageDTO} from "../../../../shared/data-types";
import {ENDPOINTS} from "../../../../services/http/endpoints";
import {JwtServiceService} from "../../../../services/authentication/jwt-service.service";
import {environment} from "../../../../../environments/environment";
import {NgIf} from "@angular/common";
import {SiteNameModalComponent} from "../../site-manager/site-name-modal/site-name-modal.component";

@Component({
  selector: 'app-composer-selector',
  standalone: true,
  imports: [
    DomainManagerComponent,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatButton,
    NgIf,
    SiteNameModalComponent
  ],
  templateUrl: './composer-selector.component.html'
})
export class ComposerSelectorComponent implements OnInit {
  private currentRoute = window.location.href;
  private siteId: string;
  displayedColumns = ['name', 'pageId', 'action'];
  showModal = false;
  pages: PageDTO[] = [
    {
      pageName: 'Home',
      pageId: '107de139-c41b-40af-b1f7-6b1c831cb545'
    },
    {
      pageName: 'About Us',
      pageId: '107de139-c41b-40af-b1f7-6b1c831cb545'
    },
    {
      pageName: 'Contact Us',
      pageId: '107de139-c41b-40af-b1f7-6b1c831cb545'
    }
  ];

  constructor(private httpApiService: HttpApiService,
              private jwtService: JwtServiceService) {
    this.siteId = this.currentRoute.substring(this.currentRoute.lastIndexOf('/') + 1);
  }

  ngOnInit() {
    if ((!environment.dev) && this.jwtService.validateTokenExists()) {
      this.pages = [];
      this.getAllSites();
    }
  }

  getAllSites() {
    this.httpApiService.call(ENDPOINTS['getSitePages']).subscribe((response: PageDTO[]) => {
      this.pages = response;
    });
  }

  onShowModal() {
    this.showModal = true;
  }

  onEdit(page: any) {
    window.open(`${this.currentRoute}/composer/${page.id}`, "_blank");
    return;
  }

  onDelete(page: any) {
    console.log('delete page', page);
  }

  onPreviewPage(page: any) {
    window.open(`${this.currentRoute}/composer/${page.id}/preview`, "_blank");
    return;
  }

  createPage(nameOfPage: string) {
    let payload = {
      siteId: this.siteId,
      pageName: nameOfPage
    };

    this.httpApiService.call(ENDPOINTS['makeNewPageForSite'], payload).subscribe((response: PageDTO) => {

    });
  }

}
