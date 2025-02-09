import {AfterViewInit, Component, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {
  DesignerStateServiceService
} from "../../../../../services/states/designer-service/designer-state-service.service";
import {COMPOSER_TYPE} from "../../../../../shared/constants";
import {ComponentFactoryService} from "../../../../../services/component-factory/component-factory.service";
import {NgClass, NgIf} from "@angular/common";
import {ContentEditorManagerService} from "../../../../../services/managers/content-editor-manager.service";
import {ObjectAssignerManagerService} from "../../../../../services/managers/object-assigner-manager.service";

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [
    NgIf,
    NgClass
  ],
  templateUrl: './child.component.html'
})
export class ChildComponent implements AfterViewInit,OnInit {
  @Input() id!: any;
  @Input() parentId?: number = -1;
  @Input() parentName: string = '';
  @Input() isPreview: boolean = false;
  componentName: string = '';

  @ViewChild('component', { read: ViewContainerRef, static: false })
  renderedComponent!: ViewContainerRef;

  constructor(private stateService: DesignerStateServiceService,
              private componentFactory: ComponentFactoryService,
              private contentEditorMgr: ContentEditorManagerService,
              private assignemntMgr: ObjectAssignerManagerService) {
  }

  ngOnInit(){
    console.log("child", this.isPreview);
  }

  ngAfterViewInit(){
    this.renderComponent();
  }

  renderComponent(){
    // @ts-ignore
    const componentDetails = this.stateService.getState()[this.id];
    const component = this.componentFactory.getComponent(componentDetails.name);
    this.componentName = componentDetails.name;
    // @ts-ignore
    const componentRef = this.renderedComponent.createComponent(component);

    // Object.assign(componentRef.instance, {
    //   ...componentDetails.properties,
    //   id: componentDetails.id,
    //   // @ts-ignore
    //   properties: this.stateService.getState()[componentDetails.id].properties
    // });

    this.assignemntMgr.assignRenderObject(
      componentRef,
      componentDetails,
      this.isPreview
    )
  }

  protected readonly parent = parent;

  onClickOfComponentSendToStyler() {
    if(this.componentName !== COMPOSER_TYPE.BUILDER
      && this.componentName !== COMPOSER_TYPE.HORIZONTAL_BUILDER
      && this.componentName !== COMPOSER_TYPE.VERTICAL_BUILDER) {
      this.contentEditorMgr.getStateForId(this.id);
    }
  }
}
