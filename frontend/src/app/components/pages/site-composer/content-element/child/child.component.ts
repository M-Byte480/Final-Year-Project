import {AfterViewInit, Component, Input, ViewChild, ViewContainerRef} from '@angular/core';
import {
  DesignerStateServiceService
} from "../../../../../services/states/designer-service/designer-state-service.service";
import {COMPOSER_TYPE} from "../../../../../shared/constants";
import {ComponentFactoryService} from "../../../../../services/component-factory/component-factory.service";

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [],
  templateUrl: './child.component.html'
})
export class ChildComponent implements AfterViewInit {
  @Input() id!: any;
  @Input() parentId?: number = -1;

  @ViewChild('component', { read: ViewContainerRef, static: false })
  renderedComponent!: ViewContainerRef;

  constructor(private stateService: DesignerStateServiceService,
              private componentFactory: ComponentFactoryService) {
  }

  ngAfterViewInit(){
    this.renderComponent();
  }

  renderComponent(){
    // @ts-ignore
    const componentDetails = this.stateService.getState()[this.id];
    const component = this.componentFactory.getComponent(componentDetails.name);
    const componentRef = this.renderedComponent.createComponent(component);
    Object.assign(componentRef.instance, {
      ...componentDetails.properties,
      id: componentDetails.id,
      children: componentDetails.properties.children || [],
      // @ts-ignore
      state: this.stateService.getState()[componentDetails.id]
    });
  }
}
