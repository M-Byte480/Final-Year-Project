import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {Site, SiteResponse} from "../../../shared/data-types";
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

  listOfUserSites: Site[] | undefined = [];
  response: SiteResponse[] = [];
  mockResponse: SiteResponse[] = [
    {
      "userId": "",
      "siteId": "ef96d76c-cd41-42e4-9688-a354ebb824db",
      "siteName": "Milanify",
      "lastUpdated": "2025-01-25 14:30:45"
    }
  ];
  site_cache_key = CacheService.CACHE_KEYS['listOfSites'];

  constructor(private router: Router,
              private cacheService: CacheService,
              private httpService: HttpApiService,
              private jwtService: JwtServiceService) {
    this.cacheSubscription = this.cacheService.cache$.subscribe(data => {

    });
  }

  ngOnInit() {
    this.response = this.mockResponse;
    if (!environment.dev) {
      console.log("R")
      this.jwtService.authenticateUser();
      this.response = [];

      const cachedData = this.cacheService.get(this.site_cache_key);

      if (cachedData) {
        this.listOfUserSites = this.cacheService.get('overview-list-of-sites');
      } else {
        this.httpService.call(ENDPOINTS['getUserSites']).subscribe((data: Site[]) => {
          this.listOfUserSites = data;
          this.cacheService.set(this.site_cache_key, data);
        });
      }
    }



    // @ts-ignore
    this.listOfUserSites = this.response;
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
  }

  protected closeModal() {
    this.showModal = false;
  }

  protected createSite(name: string) {

    console.log('Creating site with name: ' + name);
    this.httpService.call(ENDPOINTS['createUserSite'], {
      name: name
    }).subscribe((data: SiteResponse) => {
      let newSite: Site = {id: "", name: "", url: "", lastUpdated: ""};
      newSite['id'] = data.siteId;
      newSite['name'] = data.siteName;
      newSite['lastUpdated'] = data.lastUpdated;
      if(this.listOfUserSites === undefined){
        this.listOfUserSites = [];
      }
      this.listOfUserSites.push(newSite);
      this.cacheService.set(this.site_cache_key, this.listOfUserSites);
      this.router.navigate(['/overview', newSite.id]).then(r => {});
    });
  }

}
