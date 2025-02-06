import {AfterViewInit, Component, Input, OnInit, QueryList, ViewChild, ViewContainerRef} from '@angular/core';
import {
  DesignerStateServiceService
} from "../../../../../services/states/designer-service/designer-state-service.service";
import {ComponentFactoryService} from "../../../../../services/component-factory/component-factory.service";
import {GridManagerService} from "../../../../../services/managers/grid-manager.service";
import {ChildComponent} from "../child/child.component";
import {NgForOf} from "@angular/common";
import {VerticalManagerService} from "../../../../../services/managers/vertical-manager.service";

@Component({
  selector: 'app-vertical-builder',
  standalone: true,
  imports: [
    ChildComponent,
    NgForOf
  ],
  templateUrl: './vertical-builder.component.html'
})
export class VerticalBuilderComponent implements OnInit, AfterViewInit {
  @Input() childGridArr: number[] = [];
  @Input() noElements: number = 0;
  @Input() id: number = 1;
  @ViewChild('childContainer', { read: ViewContainerRef, static: false })
  childContainer!: ViewContainerRef;

  ngOnInit(){
    console.log('Verticla builere childgrid', this.childGridArr);
  }

  ngAfterViewInit(){
  }


  constructor(private stateService: DesignerStateServiceService,
              private componentFactory: ComponentFactoryService,
              private gridManager: GridManagerService,
              private verticalManager: VerticalManagerService) {

  }


  onAddRowTop(){
    this.verticalManager.addHorizontalBuilderTop(this.childGridArr, this.id);
  }

  onAddRowBottom(){
    this.verticalManager.addHorizontalBuilderBottom(this.childGridArr, this.id);
  }

  dupeBottomRow(){
    this.verticalManager.duplicateLastRow(this.childGridArr, this.id);
  }
}
