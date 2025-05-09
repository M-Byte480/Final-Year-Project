import {AfterViewInit, Component, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {
  DesignerStateServiceService
} from "../../../../../services/states/designer-service/designer-state-service.service";
import {ComponentFactoryService} from "../../../../../services/component-factory/component-factory.service";
import {GridManagerService} from "../../../../../services/managers/grid-manager.service";
import {ChildComponent} from "../child/child.component";
import {NgForOf, NgIf} from "@angular/common";
import {VerticalManagerService} from "../../../../../services/managers/vertical-manager.service";
import {COMPOSER_TYPE} from "../../../../../shared/constants";
import {MatButton, MatFabButton} from "@angular/material/button";
import {ContentEditorManagerService} from "../../../../../services/managers/content-editor-manager.service";

@Component({
  selector: 'app-vertical-builder',
  standalone: true,
  imports: [
    ChildComponent,
    NgForOf,
    NgIf,
    MatButton,
    MatFabButton
  ],
  templateUrl: './vertical-builder.component.html'
})
export class VerticalBuilderComponent implements OnInit, AfterViewInit {
  @Input() childGridArr: number[] = [];
  @Input() noElements: number = 0;
  @Input() id: number = 1;
  @Input() isPreview: boolean = false;

  name = COMPOSER_TYPE.VERTICAL_BUILDER;

  ngOnInit(){

  }

  ngAfterViewInit(){
  }


  constructor(private verticalManager: VerticalManagerService,
              private contentEditorManager: ContentEditorManagerService) {

  }


  onAddRowTop(){
    this.verticalManager.addHorizontalBuilderTop(this.childGridArr, this.id);
  }

  onAddRowBottom(){
    this.verticalManager.addHorizontalBuilderBottom(this.childGridArr, this.id);
  }

  dupeBottomRow(){
    this.contentEditorManager.setIsDupeCalled(true);
    this.verticalManager.duplicateLastRow(this.childGridArr, 1); // this is because ID is the root component
    // This is not dynamic yet because of the ID
    // todo: extract this component and responsibility outside

    // this.verticalManager.dupeLastRow(this.childGridArr, this.id);
    // this.verticalManager.duplicateLastRow(this.childGridArr, this.id);
  }
}
