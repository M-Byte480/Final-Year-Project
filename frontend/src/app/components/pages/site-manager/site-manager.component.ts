import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {Site} from "../../../shared/data-types";
import {NgForOf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-site-manager',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    NgOptimizedImage
  ],
  templateUrl: './site-manager.component.html',
  styleUrl: './site-manager.component.css'
})
export class SiteManagerComponent implements OnInit{

  listOfUserSites: Site[] = [];

  constructor(private router: Router) {
  }

  ngOnInit() {
    // Retrieve the list of site names from the backend, using the JWT token
    console.log('Site Manager Component init');
    for (let i = 0; i < 4; i++) {
      this.listOfUserSites.push({
        name: 'Milanify',
        description: '',
        url: '',
        id: '1234567890'
      })
    }
  }

  protected onSiteClick(siteId: string){
    console.log('Site clicked: ' + siteId);
    this.router.navigate(['/overview', siteId]).then(r => {});
  }

  protected onCreateNewSite(){}

}
