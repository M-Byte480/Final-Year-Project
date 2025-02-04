import {AfterViewInit, Component, Input, OnInit, QueryList, ViewChild, ViewContainerRef} from '@angular/core';
import {
  DesignerStateServiceService
} from "../../../../../services/states/designer-service/designer-state-service.service";
import {ComponentFactoryService} from "../../../../../services/component-factory/component-factory.service";
import {COMPOSER_TYPE} from "../../../../../shared/constants";
import {GridManagerService} from "../../../../../services/grid-manager/grid-manager.service";

@Component({
  selector: 'app-vertical-builder',
  standalone: true,
  imports: [],
  templateUrl: './vertical-builder.component.html'
})
export class VerticalBuilderComponent implements OnInit, AfterViewInit {

  @Input() childGridArr: number[] = [];
  @ViewChild('childContainer', { read: ViewContainerRef, static: false })
  childContainer!: ViewContainerRef;

  childAccessorString: string = '';
  childGrid: any;

  ngOnInit(){
    this.childAccessorString = `${this.childGridArr[0]}`;
    console.log(this.childAccessorString);
    // @ts-ignore
    this.childGrid = this.stateService.getState()[this.childAccessorString];
  }

  ngAfterViewInit(){
    console.log(this.childContainer);
    this.renderChild();

  }


  constructor(private stateService: DesignerStateServiceService,
              private componentFactory: ComponentFactoryService,
              private gridManager: GridManagerService) {

  }

  renderChild(){
    const gridComponent = this.componentFactory.getComponent(COMPOSER_TYPE.GRID);
    const componentRef = this.childContainer.createComponent(gridComponent);
    Object.assign(componentRef.instance, {
      ...this.childGrid.properties,
      id: this.childGrid.id,
      children: this.childGrid.properties.children || [],
      // @ts-ignore
      state: this.stateService.getState()[this.childAccessorString]
    });
  }

  onAddRowTop(){
    this.gridManager.addRowTop(this.childGrid);
    // this.updateChildGrid();
  }

  onAddRowBottom(){
    this.gridManager.addRowBottom(this.childGrid);
  }
}
