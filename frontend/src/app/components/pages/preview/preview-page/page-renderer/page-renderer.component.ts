import {AfterViewInit, Component, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {TextComponent} from "../../../site-composer/content-element/items/text/text.component";
import {ImageComponent} from "../../../site-composer/content-element/items/image/image.component";
import {ButtonComponent} from "../../../../shared/button/button.component";
import {ContentElementComponent} from "../../../site-composer/content-element/content-element.component";
import {GridComponent} from "../../../site-composer/content-element/items/grid/grid.component";

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

  ngAfterViewInit() {
    console.log(this.page);
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
      Object.assign(componentRef.instance as any, content.properties);

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

  private renderNode() {

    const state = this.page;
    // @ts-ignore
    const currentNode = state[1];

    const content = this.parseContent(currentNode);

    if(content){
      this.container.clear();
      const componentRef = this.container.createComponent(content.component);
      Object.assign(componentRef.instance as any, content.properties);

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

    const component = this.getComponent(node.name);
    if (!component) {
      console.error('Component not found for node:', node.name);
      return null;
    }

    return { component, properties: { ...(node.properties || {}) } };
  }

  protected getComponent(componentName: string) {
    console.log('Selected component:', componentName);
    if (componentName === 'text') {
      return TextComponent;
    } else if (componentName === 'image') {
      return ImageComponent;
    } else if (componentName === 'button') {
      return ButtonComponent;
    } else if (componentName === 'builder') {
      return ContentElementComponent;
    } else {
      return GridComponent;
    }
  }
}
