import {Component, OnDestroy, OnInit} from '@angular/core';
import {CdkDrag, CdkDragDrop, CdkDragPlaceholder, CdkDropList, moveItemInArray} from "@angular/cdk/drag-drop";
import {MapperComponent} from "../../../shared/mapper/mapper.component";
import {NavbarRendererComponent} from "../../../shared/navbar-renderer/navbar-renderer.component";
import {NavbarStateService} from "../../../../services/states/navbar-state/navbar-state.service";
import {NavBarStateStruct, PageDTO} from "../../../../shared/data-types";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {COMPONENT_NAME} from "../../../../shared/constants";
import {HttpParams} from "@angular/common/http";
import {ENDPOINTS} from "../../../../services/http/endpoints";
import {HttpApiService} from "../../../../services/http/http-api.service";
import {FileUploadService} from "../../../../services/file-upload.service";

@Component({
  selector: 'app-navigation-manager',
  standalone: true,
  imports: [
    CdkDropList,
    CdkDrag,
    CdkDragPlaceholder,
    MapperComponent,
    NavbarRendererComponent,
    MatButton,
    MatFormField,
    MatInput,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    NgIf
  ],
  templateUrl: './navigation-manager.component.html',
  styleUrls: ['./navigation-manager.component.css']
})
export class NavigationManagerComponent implements OnInit, OnDestroy {
  navElements: any[] = [];
  availableSitesFromUser: {pageName: string}[] = [];
  navState = {} as NavBarStateStruct;
  navbarHidden = true;
  private currentRoute = window.location.href;
  apiResponse: PageDTO[] = [];
  shortLink: string = "";
  file: File | null = null;

  private readonly siteId: string;
  constructor(private navbarService: NavbarStateService,
              private httpApiService: HttpApiService,
              private fileUploadService: FileUploadService) {
    this.siteId = this.currentRoute.substring(this.currentRoute.lastIndexOf('/') + 1);

    this.navbarService.state$.subscribe((state) => {
      this.navState = state;
      this.navbarService.saveSession();
    });
  }

  ngOnInit(){

    this.getAllSites();
    const params = new HttpParams().set('pageId', this.siteId);

    this.httpApiService.get(ENDPOINTS['getSitePages'], params).subscribe((response: []) => {
      response.forEach((site: any) => {
        this.availableSitesFromUser.push({'pageName': site.pageName});
      });
      console.log(this.availableSitesFromUser);
    });
    this.navState = this.navbarService.getState();
    this.navElements = this.navState.routes;
  }

  getAllSites() {
    const params = new HttpParams().set('siteId', this.siteId);



    this.httpApiService.get(ENDPOINTS['getNavBarMapping'], params).subscribe((response: []) => {
      console.log(response);
      this.navbarService.setState(response);
      this.navState = this.navbarService.getState();
      this.navElements = this.navState.routes;
    });
  }

  ngOnDestroy() {
    this.navbarService.saveSession();

    const payload = {
      siteId: this.siteId,
      data: this.navState
    }

    this.httpApiService.post(ENDPOINTS['setNavbarMapping'], payload).subscribe((response) => {
      console.log(response);
    });
  }

  // Taken from https://material.angular.io/cdk/drag-drop/overview
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.navElements, event.previousIndex, event.currentIndex);
    this.navState.routes = this.navElements;
    this.navbarService.setState(this.navState);
  }

  onChange(event: Event){
    // @ts-ignore
    this.file = event.target.files[0];

    console.log(this.file);
  }

  onUploadImage(){
    const formData = new FormData();
    if(!this.file){
      return;
    }

    formData.append('image', this.file);
    formData.append('siteId', this.siteId);
    formData.append('forNavBar', 'true');

    this.httpApiService.uploadImage(ENDPOINTS['upload'], formData).subscribe((response) => {
      let updatedNav = this.navbarService.getState();
      updatedNav.logo = response.image;
      this.navbarService.setState(updatedNav);
    });
  }

  hide() {
    this.navbarHidden = !this.navbarHidden;
  }

  routeTo(route: string) {
    window.open(route, '_self');
  }

  protected readonly COMPONENT_NAME = COMPONENT_NAME;
}
