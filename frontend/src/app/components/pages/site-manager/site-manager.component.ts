import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {Site} from "../../../shared/data-types";
import {DatePipe, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {CacheService} from "../../../services/cache/cache.service";
import {Subscription} from "rxjs";
import {HttpApiService} from "../../../services/http/http-api.service";
import {ENDPOINTS} from "../../../services/http/endpoints";
import {SiteNameModalComponent} from "./site-name-modal/site-name-modal.component";
import {NavigationBarComponent} from "../../shared/navigation-bar/navigation-bar.component";
import {environment} from "../../../../environments/environment";
import {JwtServiceService} from "../../../services/authentication/jwt-service.service";

@Component({
  selector: 'app-site-manager',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    NgOptimizedImage,
    SiteNameModalComponent,
    NgIf,
    DatePipe,
    NavigationBarComponent
  ],
  templateUrl: './site-manager.component.html',
  styleUrl: './site-manager.component.css'
})
export class SiteManagerComponent implements OnInit, OnDestroy {
  private cacheSubscription: Subscription;
  @Output() hideModal = new EventEmitter<boolean>();
  showModal = false;

  listOfUserSites: Site[] = [];
  mockResponse = [
    {
      "id": "ef96d76c-cd41-42e4-9688-a354ebb824db",
      "name": "Milanify",
      "lastUpdated": "2025-01-25 14:30:45"
    },
    {
      "id": "107de139-c41b-40af-b1f7-6b1c831cb545",
      "name": "Milanify",
      "lastUpdated": "2025-01-25 14:30:45"
    },
    {
      "id": "595b1730-5ec7-44c6-898a-ff7de726b9c1",
      "name": "Milanify",
      "lastUpdated": "2025-01-25 14:30:45"
    },
    {
      "id": "0844cdeb-7d48-4a9b-99c9-6ca36c2dff11",
      "name": "Milanify",
      "lastUpdated": "2025-01-25 14:30:45"
    }
  ];

  constructor(private router: Router,
              private cacheService: CacheService,
              private httpService: HttpApiService,
              private jwtService: JwtServiceService) {
    this.cacheSubscription = this.cacheService.cache$.subscribe(data => {

    });
  }

  ngOnInit() {

    if(!environment.dev){
      console.log("R")
      this.jwtService.authenticateUser();
    }

    const cachedData = this.cacheService.get('overview'); // todo: convert this to JWT token and cache the names and dates

    if (cachedData) {
      // @ts-ignore
      this.listOfUserSites = this.cacheService.get('overview');
    } else {
      this.httpService.call(ENDPOINTS['getUserSites']).subscribe((data: Site[]) => {
        this.listOfUserSites = data;
        this.cacheService.set('overview', data);
      });
    }

    // @ts-ignore
    this.listOfUserSites = this.mockResponse;
  }

  ngOnDestroy() {
    this.cacheSubscription.unsubscribe();
  }

  protected onSiteClick(siteId: string) {
    console.log('Site clicked: ' + siteId);
    this.router.navigate(['/overview', siteId]).then(r => {
    });
  }

  protected onCreateNewSite() {
    this.showModal = true;
    // todo: add logic and update cache
  }

  protected closeModal() {
    this.showModal = false;
  }

  protected createSite(name: string) {

    console.log('Creating site with name: ' + name);
    // Todo: navigate to site id provided from the backend
    // this.router.navigate(['/overview', siteId]).then(r => {});

  }

}
