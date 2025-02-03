import {Component, OnDestroy, OnInit} from '@angular/core';
import {CdkDrag, CdkDragDrop, CdkDragPlaceholder, CdkDropList, moveItemInArray} from "@angular/cdk/drag-drop";
import {MapperComponent} from "../../../shared/mapper/mapper.component";
import {NavbarRendererComponent} from "../../../shared/navbar-renderer/navbar-renderer.component";
import {NavbarStateService} from "../../../../services/states/navbar-state/navbar-state.service";
import {NavBarStateStruct} from "../../../../shared/data-types";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

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
  navState = {} as NavBarStateStruct;
  navbarHidden = true;

  constructor(private navbarService: NavbarStateService) {
    this.navbarService.state$.subscribe((state) => {
      this.navState = state;
      this.navbarService.saveSession();
    });
  }

  ngOnInit(){
    this.navState = this.navbarService.getState();
    this.navElements = this.navState.routes;
  }

  ngOnDestroy() {
    this.navbarService.saveSession();
  }

  // Taken from https://material.angular.io/cdk/drag-drop/overview
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.navElements, event.previousIndex, event.currentIndex);
  }

  onUploadImage(){
    console.log(this.navbarService.getState());
  }

  hide() {
    this.navbarHidden = !this.navbarHidden;
  }

  routeTo(route: string) {
    window.open(route, '_self');
  }
}
