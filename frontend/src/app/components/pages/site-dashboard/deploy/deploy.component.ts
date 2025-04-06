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
import {DatePipe, NgIf} from "@angular/common";
import {DomainManagerComponent} from "../overview/domain-manager/domain-manager.component";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

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
    DomainManagerComponent,
    MatProgressSpinner,
    NgIf
  ],
  templateUrl: './deploy.component.html',
  styleUrl: './deploy.component.css'
})
export class DeployComponent implements OnInit {
  private currentRoute = window.location.href;
  disableDeployButton = false;
  displayedColumns = ['date'];
  isSiteDeployed = false;
  isLoading = true;
  deploymentHistory = [
    {
      "date": 1752866054.092186,
      "deployed": true
    },
    {
      "date": 1742866054.092186,
      "deployed": false
    },
    {
      "date": 1732866054.092186,
      "deployed": true
    },
  ];
  siteId = '';
  errorMessage = '';

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
          "date": response[i].id.publishTimestamp,
          "deployed": response[i].deployed
        });
      }
      this.deploymentHistory.reverse();

      this.isSiteDeployed = !!this.deploymentHistory[0]?.deployed;
      this.isLoading = false;
    });
  }

  onDeploy() {
    this.isLoading = true;
    this.httpService.post(ENDPOINTS['deploySite'], {siteId: this.siteId}).subscribe((response: any) => {
      this.deploymentHistory = [{'date': response.id.publishTimestamp, 'deployed': response.deployed}, ...this.deploymentHistory];
      this.isSiteDeployed = true;
      this.isLoading = false;
      this.errorMessage = '';
    },
      (error: any) => {
        this.isLoading = false;
        if(error.status === 500){
          this.errorMessage = 'One composer recently added pages has not been saved. Please save all pages before deploying.';
        } else if(error.status === 418){
          this.errorMessage = 'The sub-route given is already taken.';
        }
      });
  }

  onAbortDeployment() {
    this.isLoading = true;

    this.httpService.post(ENDPOINTS['abortDeployment'], {siteId: this.siteId}).subscribe((response: any) => {
      if(response) {
        this.deploymentHistory[0].deployed = false;
        this.isSiteDeployed = false;
        this.isLoading = false;
      }
    });
  }

  doesDomainExists($event: string) {
    this.disableDeployButton = $event === "No domain name set";
  }
}
