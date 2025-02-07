import {AfterViewInit, Component, Input, ViewChild, ViewContainerRef} from '@angular/core';
import {
  DesignerStateServiceService
} from "../../../../../services/states/designer-service/designer-state-service.service";
import {COMPOSER_TYPE} from "../../../../../shared/constants";
import {ComponentFactoryService} from "../../../../../services/component-factory/component-factory.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './child.component.html'
})
export class ChildComponent implements AfterViewInit {
  @Input() id!: any;
  @Input() parentId?: number = -1;
  @Input() parentName: string = '';

  @ViewChild('component', { read: ViewContainerRef, static: false })
  renderedComponent!: ViewContainerRef;

  constructor(private stateService: DesignerStateServiceService,
              private componentFactory: ComponentFactoryService) {
  }

  ngAfterViewInit(){
    this.renderComponent();
    console.log(this.parentName);
  }

  renderComponent(){
    // @ts-ignore
    const componentDetails = this.stateService.getState()[this.id];
    const component = this.componentFactory.getComponent(componentDetails.name);
    // @ts-ignore
    const componentRef = this.renderedComponent.createComponent(component);
    Object.assign(componentRef.instance, {
      ...componentDetails.properties,
      id: componentDetails.id,
      // @ts-ignore
      properties: this.stateService.getState()[componentDetails.id].properties
    });
  }

  doDisplay(parentName: string): boolean {
    switch (parentName) {
      case COMPOSER_TYPE.VERTICAL_BUILDER:
        return false;
      case COMPOSER_TYPE.HORIZONTAL_BUILDER:
          return false;
      default:
        return true;
    }
  }

  protected readonly parent = parent;
}
