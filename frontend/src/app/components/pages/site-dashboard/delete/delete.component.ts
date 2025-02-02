import { Component } from '@angular/core';
import {MatCheckbox} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [
    MatCheckbox,
    FormsModule,
    NgClass
  ],
  templateUrl: './delete.component.html'
})
export class DeleteComponent {
  acceptConsequences = false;

  onDeleteSite() {
    // delete site
  }
}
