import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {FaIconComponent, FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MapperComponent} from "../../../shared/mapper/mapper.component";
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from "@angular/cdk/drag-drop";
import {FooterStateService} from "../../../../services/states/footer-state/footer-state.service";
import {FooterMapper, FooterStateStruct} from "../../../../shared/data-types";
import {COMPONENT_NAME, SOCIAL_MEDIA_LOOKUP} from "../../../../shared/constants";
import {FooterRendererComponent} from "../../../shared/footer-renderer/footer-renderer.component";
import {ApiManagerService} from "../../../../services/managers/api-manager.service";
import {HttpApiService} from "../../../../services/http/http-api.service";
import {ENDPOINTS} from "../../../../services/http/endpoints";
import {Router} from "@angular/router";
import {HttpParams} from "@angular/common/http";
import {debounce, debounceTime} from "rxjs";

@Component({
  selector: 'app-footer-manager',
  standalone: true,
  imports: [
    MatIcon,
    FontAwesomeModule,
    MapperComponent,
    CdkDrag,
    CdkDropList,
    FooterRendererComponent
  ],
  templateUrl: './footer-manager.component.html',
  styleUrl: './footer-manager.component.css'
})
export class FooterManagerComponent implements OnInit, OnDestroy {
  hyperlinks: FooterMapper[] = [];
  socialMediaKeys = [];
  readonly siteId;

  constructor(private footerStateService: FooterStateService,
              private apiService: HttpApiService,
              private router: Router) {
    this.siteId = this.router.url.split('/')[2];

    this.footerStateService.state$.subscribe((state) => {
      this.hyperlinks = state.links;
      this.footerStateService.saveSession();
    });
  }

  ngOnInit() {
    let apiParams = new HttpParams().set('siteId', this.siteId);

      this.apiService.get(ENDPOINTS['getFooter'], apiParams).subscribe((response) => {
        if (response) {
          this.footerStateService.setState(response);
        }
      });

    this.socialMediaKeys = [];
    // Not a great solution, unfortunately the way the mapper component is designed. This is a soft issue for now
    const stringNames = Object.keys(SOCIAL_MEDIA_LOOKUP).sort();
    // @ts-ignore
    stringNames.forEach(e => this.socialMediaKeys.push({socialMedia: e}));
  }

  onOpenSocial(link: string): void {
    window.open(link, '_blank');
  }

  // Taken from https://material.angular.io/cdk/drag-drop/overview
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.hyperlinks, event.previousIndex, event.currentIndex);
  }

  ngOnDestroy() {
    this.footerStateService.saveSession();
    this.updateApi(this.footerStateService.getState());
  }

  updateApi(state: FooterStateStruct){
    console.log("Update api called");
    const payload = {
      state: state,
      siteId: this.siteId,
    };

    this.apiService.post(ENDPOINTS['setFooter'], payload).subscribe((response) => {
      console.log("Response recieved");
    });
  }

  protected readonly SOCIAL_MEDIA_LOOKUP = SOCIAL_MEDIA_LOOKUP;
  protected readonly COMPONENT_NAME = COMPONENT_NAME;
}
