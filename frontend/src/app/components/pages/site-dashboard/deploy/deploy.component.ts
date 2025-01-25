import { Component } from '@angular/core';
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
export class DeployComponent {
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

  onDeploy(){

  }

  onAbortDeployment(){

  }
}
