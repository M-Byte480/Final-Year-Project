import { Component } from '@angular/core';
import {MatCheckbox} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";
import {NgClass} from "@angular/common";
import {HttpApiService} from "../../../../services/http/http-api.service";
import {ENDPOINTS} from "../../../../services/http/endpoints";
import {ActivatedRoute, Router} from "@angular/router";

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
  siteId;
  constructor(private apiService: HttpApiService,
              private route: ActivatedRoute,
              private router: Router) {
    this.siteId = this.route.snapshot.paramMap.get('siteId') || "";

  }

  onDeleteSite() {
    const payload = {
      siteId: this.siteId,
      acceptConsequences: this.acceptConsequences
    };

    this.apiService.post(ENDPOINTS['deleteSite'], payload).subscribe((response) => {
      this.router.navigate(['overview']).then(() => {});
    })
  }
}
