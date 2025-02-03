import {Component, OnInit} from '@angular/core';
import {CdkDrag, CdkDragDrop, CdkDragPlaceholder, CdkDropList, moveItemInArray} from "@angular/cdk/drag-drop";
import {MapperComponent} from "../../../shared/mapper/mapper.component";
import {NavbarRendererComponent} from "../../../shared/navbar-renderer/navbar-renderer.component";
import {NavbarStateService} from "../../../../services/states/navbar-state/navbar-state.service";
import {NavBarStateStruct} from "../../../../shared/data-types";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";

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
    FormsModule
  ],
  templateUrl: './navigation-manager.component.html',
  styleUrls: ['./navigation-manager.component.css']
})
export class NavigationManagerComponent implements OnInit {
  navElements: any[] = [];
  navState = {} as NavBarStateStruct;

  constructor(private navbarService: NavbarStateService) {
    this.navbarService.state$.subscribe((state) => {
      this.navState = state;
    });
  }

  ngOnInit(){
    this.navState = this.navbarService.getState();
    this.navElements = this.navState.routes;
  }

  // Taken from https://material.angular.io/cdk/drag-drop/overview
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.navElements, event.previousIndex, event.currentIndex);
  }

  onUploadImage(){
    console.log(this.navbarService.getState());
  }


}
