import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {Site} from "../../../shared/data-types";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {CacheService} from "../../../services/cache/cache.service";
import {Subscription} from "rxjs";
import {HttpApiService} from "../../../services/http/http-api.service";
import {ENDPOINTS} from "../../../services/http/endpoints";
import {SiteNameModalComponent} from "./site-name-modal/site-name-modal.component";

@Component({
  selector: 'app-site-manager',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    NgOptimizedImage,
    SiteNameModalComponent,
    NgIf
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
      "lastUpdate": null
    },
    {
      "id": "107de139-c41b-40af-b1f7-6b1c831cb545",
      "lastUpdate": null
    },
    {
      "id": "595b1730-5ec7-44c6-898a-ff7de726b9c1",
      "lastUpdate": null
    },
    {
      "id": "0844cdeb-7d48-4a9b-99c9-6ca36c2dff11",
      "lastUpdate": null
    },
    {
      "id": "cba79353-2058-45d2-8d93-8299e668a175",
      "lastUpdate": null
    },
    {
      "id": "8ac53c70-2edd-40d9-88d4-506c9f0e8435",
      "lastUpdate": null
    },
    {
      "id": "cb7c04d0-b144-49a5-a35d-07e23c4b9a2b",
      "lastUpdate": null
    },
    {
      "id": "ff2000b8-a5d6-4cdc-9f90-3225076e0f06",
      "lastUpdate": null
    },
    {
      "id": "31329a6f-44e1-4437-8c56-1cd18f8b8ac8",
      "lastUpdate": null
    },
    {
      "id": "079af9bd-f113-45ea-984f-a5a643ad83de",
      "lastUpdate": null
    },
    {
      "id": "280db38e-b30e-430e-8065-93a1884bafe8",
      "lastUpdate": null
    },
    {
      "id": "ced03a5d-9d51-4b99-ad41-44fc330f09f9",
      "lastUpdate": null
    },
    {
      "id": "630e112b-3e12-4628-97ea-213d35f6dc0b",
      "lastUpdate": null
    },
    {
      "id": "5c9c11f5-d4fa-456c-89d7-b0ef7a6cf5e8",
      "lastUpdate": null
    },
    {
      "id": "3d2e18d2-8083-4385-8bfc-b225635d7644",
      "lastUpdate": null
    },
    {
      "id": "8e66df8e-d02f-4825-b7d9-208669bfe662",
      "lastUpdate": null
    },
    {
      "id": "539fecf9-2424-4c20-90db-6004be0d7274",
      "lastUpdate": null
    }
  ];

  constructor(private router: Router,
              private cacheService: CacheService,
              private httpService: HttpApiService) {
    this.cacheSubscription = this.cacheService.cache$.subscribe(data => {

    });
  }

  ngOnInit() {
    const cachedData = this.cacheService.get('overview');

    if(cachedData){
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

  protected onSiteClick(siteId: string){
    console.log('Site clicked: ' + siteId);
    this.router.navigate(['/overview', siteId]).then(r => {});
  }

  protected onCreateNewSite(){
    this.showModal = true;
  }

  protected closeModal(){
    this.showModal = false;
  }

  protected createSite(name: string){

    console.log('Creating site with name: ' + name);
    // Todo: navigate to site id provided from the backend
    // this.router.navigate(['/overview', siteId]).then(r => {});

  }

}
