import {AfterViewInit, Component, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {TextComponent} from "../../../site-composer/content-element/items/text/text.component";
import {ImageComponent} from "../../../site-composer/content-element/items/image/image.component";
import {ButtonComponent} from "../../../../shared/button/button.component";
import {ContentElementComponent} from "../../../site-composer/content-element/content-element.component";
import {GridComponent} from "../../../site-composer/content-element/items/grid/grid.component";
import {ComponentFactoryService} from "../../../../../services/component-factory/component-factory.service";
import {ObjectAssignerManagerService} from "../../../../../services/managers/object-assigner-manager.service";

@Component({
  selector: 'app-page-renderer',
  standalone: true,
  imports: [],
  templateUrl: './page-renderer.component.html',
  styleUrl: './page-renderer.component.css'
})
export class PageRendererComponent implements AfterViewInit{
  @Input() page!: any;
  @ViewChild('container', { read: ViewContainerRef, static: false })
  container!: ViewContainerRef;

  constructor(private componentFactory: ComponentFactoryService,
              private assignmentMgr: ObjectAssignerManagerService) {
  }

  ngAfterViewInit() {
    this.rerender();
  }

  private rerender(){
    let node = 1;

    const state = this.page;
    // @ts-ignore
    const currentNode = state[node];

    const content = this.parseContent(currentNode);

    if(content){
      this.container.clear();
      const componentRef = this.container.createComponent(content.component);
      this.assignmentMgr.assignRenderObject(
        componentRef,
        content,
        true
      );

      if(currentNode.properties.children && currentNode.properties.children.length){
        currentNode.properties.children.forEach((childId: number) => {
          // @ts-ignore
          const childContainer = componentRef.instance.container;
          if (childContainer) {
            const childComponentRef = childContainer.createComponent(PageRendererComponent);
            childComponentRef.instance.node = childId;
          }
        });
      }
    }
  }

  protected parseContent(node: any): any {
    if (!node) {
      console.log('No node provided');
      return null;
    }

    const component = this.componentFactory.getComponent(node.name);
    if (!component) {
      console.error('Component not found for node:', node.name);
      return null;
    }

    return { component, properties: { ...(node.properties || {}) } };
  }
}
