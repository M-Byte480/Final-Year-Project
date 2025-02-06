import { Component } from '@angular/core';
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
    MatButton
  ],
  templateUrl: './composer-selector.component.html'
})
export class ComposerSelectorComponent {
  private currentRoute = window.location.href;
  displayedColumns = ['name', 'pageId', 'action'];
  pages = [
    {
      name: 'Home',
      id: '107de139-c41b-40af-b1f7-6b1c831cb545'
    },
    {
      name: 'About Us',
      id: '107de139-c41b-40af-b1f7-6b1c831cb545'
    },
    {
      name: 'Contact Us',
      id: '107de139-c41b-40af-b1f7-6b1c831cb545'
    }
  ];

  constructor() {
  }

  onEdit(page: any){
    window.open(`${this.currentRoute}/composer/${page.id}`, "_blank");
    return;
  }

  onDelete(page: any){
    console.log('delete page', page);
  }

  onPreviewPage(page: any){
    window.open(`${this.currentRoute}/composer/${page.id}/preview`, "_blank");
    return;
  }

}
