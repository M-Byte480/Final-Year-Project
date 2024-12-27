import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {Site} from "../../../shared/data-types";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-site-manager',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf
  ],
  templateUrl: './site-manager.component.html',
  styleUrl: './site-manager.component.css'
})
export class SiteManagerComponent {

  listOfUserSites: Site[] = [
    {
      name: 'milanify',
      description: '',
      url: '',
      id: '1234567890'
    }
  ];

  ngOnInit() {
    // Retrieve the list of site names from the backend, using the JWT token
    console.log('Site Manager Component init');
  }
}
