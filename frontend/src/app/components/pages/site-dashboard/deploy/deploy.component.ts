import {Component, OnInit} from '@angular/core';
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
    MatHeaderCellDef
  ],
  templateUrl: './deploy.component.html',
  styleUrl: './deploy.component.css'
})
export class DeployComponent implements OnInit{
  private currentRoute = window.location.href;

  displayedColumns = ['date'];
  deploymentHistory = [
    {
      "date": "2025-01-01 12:00:00"
    },
    {
      "date": "2025-01-01 12:00:00"
    },
    {
      "date": "2025-01-01 12:00:00"
    },
  ];
  siteId = '';

  constructor(private httpService: HttpApiService){
    this.siteId = this.currentRoute.substring(this.currentRoute.lastIndexOf('/') + 1);

  }

  ngOnInit(){
    const httpParams = new HttpParams().set('siteId', this.siteId);
    this.httpService.get(ENDPOINTS['deployHistory'], httpParams).subscribe((response: any) => {
      this.deploymentHistory = response;
    });
  }

  onDeploy(){
    this.httpService.post(ENDPOINTS['deploySite'], {siteId: this.siteId}).subscribe((response: any) => {
      console.log(response);
    });
  }

  onAbortDeployment(){
    this.httpService.post(ENDPOINTS['abortDeployment'], {siteId: this.siteId}).subscribe((response: any) => {
      console.log(response);
    });
  }
}
