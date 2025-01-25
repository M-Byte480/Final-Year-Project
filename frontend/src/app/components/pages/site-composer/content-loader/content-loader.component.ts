import {
  AfterViewInit,
  Component, Input, OnInit, ViewChild, ViewContainerRef,
} from '@angular/core';
import {TextComponent} from "../content-element/text/text.component";
import {GridComponent} from "../content-element/grid/grid.component";
import {ButtonComponent} from "../../../shared/button/button.component";
import {ImageComponent} from "../content-element/image/image.component";
import {NgComponentOutlet, NgIf} from "@angular/common";
import {ContentElementComponent} from "../content-element/content-element.component";
import {DesignerStateServiceService} from "../../../../services/designer-service/designer-state-service.service";

@Component({
  selector: 'app-content-loader',
  standalone: true,
  imports: [
    NgComponentOutlet,
    NgIf
  ],
  templateUrl: './content-loader.component.html',
  styleUrl: './content-loader.component.css'
})
export class ContentLoaderComponent implements OnInit{
  @Input() node: any;
  @ViewChild('container', { read: ViewContainerRef, static: false })
  container!: ViewContainerRef;
  constructor( private stateService: DesignerStateServiceService) {
    stateService.state$.subscribe((state) => {
      this.node = state;
    });
  }

  ngOnInit() {
    if (!this.node) {
      const defaultState = {
        1: { id: 1, name: 'grid', properties: { rows: 2, columns: 2, children: [2,3,4,5] } },
        2: { id: 2, name: 'builder', properties: {  } },
        3: { id: 3, name: 'builder', properties: {  } },
        4: { id: 4, name: 'builder', properties: {  } },
        5: { id: 5, name: 'builder', properties: {  } },
        // 3: { id: 3, name: 'text', properties: { text: 'Hello, World!' } },
        // 4: { id: 4, name: 'image', properties: { src: 'https://via.placeholder.com/150' } },
        // 5: { id: 5, name: 'button', properties: { label: 'Click Me!' } },
        // 6: { id: 6, name: 'builder', properties: {} },
        root: 1,
      };
// Not a great solution, but it is convenient for now
// The issue is with the rendering and binding of the parent component, which believes the node is null
// Thus it renders to be null, yet the state has changed. The timeout allows it to re-trigger the binding during
// the next event loop
      setTimeout(() => {
        this.stateService.setState(defaultState);
        // @ts-ignore
        this.node = this.stateService.getState().root;
        this.renderNode();
      }, 0);
    } else {
      this.renderNode();
    }
  }

  private renderNode() {
    if (!this.node || !this.container) {
      return;
    }

    const state = this.stateService.getState();
    // @ts-ignore
    const currentNode = state[this.node];

    if (!currentNode) {
      console.error('Node not found:', this.node);
      return;
    }

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
            const childComponentRef = childContainer.createComponent(ContentLoaderComponent);
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
