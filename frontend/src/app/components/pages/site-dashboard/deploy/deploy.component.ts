import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {HttpApiService} from "../../../../services/http/http-api.service";
import {ENDPOINTS} from "../../../../services/http/endpoints";
import {HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {DatePipe} from "@angular/common";
import {DomainManagerComponent} from "../overview/domain-manager/domain-manager.component";

@Component({
  selector: 'app-deploy',
  standalone: true,
  imports: [
    MatButton,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef,
    DatePipe,
    DomainManagerComponent
  ],
  templateUrl: './deploy.component.html',
  styleUrl: './deploy.component.css'
})
export class DeployComponent implements OnInit {
  private currentRoute = window.location.href;
  disableDeployButton = false;
  displayedColumns = ['date'];
  deploymentHistory = [
    {
      "date": 1742866054.092186
    },
    {
      "date": 1742866054.092186
    },
    {
      "date": 1742866054.092186
    },
  ];
  siteId = '';

  constructor(private httpService: HttpApiService) {
    this.siteId = this.currentRoute.substring(this.currentRoute.lastIndexOf('/') + 1);

  }

  ngOnInit() {
    this.getHistory();
  }

  getHistory() {
    const httpParams = new HttpParams().set('siteId', this.siteId);
    this.httpService.get(ENDPOINTS['deployHistory'], httpParams).subscribe((response: any) => {
      this.deploymentHistory = [];
      for (let i = 0; i < response.length; i++) {
        this.deploymentHistory.push({
          "date": response[i].id.publishTimestamp
        });
      }
      this.deploymentHistory.reverse()
    });
  }

  onDeploy() {
    this.httpService.post(ENDPOINTS['deploySite'], {siteId: this.siteId}).subscribe((response: any) => {
      this.deploymentHistory = [{'date': response.id.publishTimestamp}, ...this.deploymentHistory];
    });
  }

  onAbortDeployment() {
    this.httpService.post(ENDPOINTS['abortDeployment'], {siteId: this.siteId}).subscribe((response: any) => {
      console.log(response);
    });
  }

  doesDomainExists($event: string) {
    this.disableDeployButton = $event === "No domain name set";
  }
}
