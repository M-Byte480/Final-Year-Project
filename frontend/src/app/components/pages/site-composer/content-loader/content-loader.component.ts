/*
This file was made with the help of ChatGPT to re-render the UI
 */

import {
  ChangeDetectorRef,
  Component, Input, OnInit, ViewChild, ViewContainerRef,
} from '@angular/core';
import {TextComponent} from "../content-element/text/text.component";
import {GridComponent} from "../content-element/grid/grid.component";
import {ButtonComponent} from "../../../shared/button/button.component";
import {ImageComponent} from "../content-element/image/image.component";
import {NgComponentOutlet, NgIf} from "@angular/common";
import {ContentElementComponent} from "../content-element/content-element.component";
import {DesignerStateServiceService} from "../../../../services/states/designer-service/designer-state-service.service";

@Component({
  selector: 'app-content-loader',
  standalone: true,
  imports: [
    NgComponentOutlet,
    NgIf
  ],
  templateUrl: './content-loader.component.html'
})
export class ContentLoaderComponent implements OnInit{
  @Input() node: any = 1;
  @ViewChild('container', { read: ViewContainerRef, static: false })
  container!: ViewContainerRef;
  constructor( private stateService: DesignerStateServiceService,
               private cdRef: ChangeDetectorRef ) {
    stateService.state$.subscribe((state) => {
      // @ts-ignore
      this.node = state[1];
      this.rerender();
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
        root: 1,
        maxId: 5
      };
      // Not a great solution, but it is convenient for now
      // The issue is with the rendering and binding of the parent component, which believes the node is null
      // Thus it renders to be null, yet the state has changed. The timeout allows it to re-trigger the binding during
      // the next event loop
      setTimeout(() => {
        this.stateService.setState(defaultState);
        // @ts-ignore
        this.node = this.stateService.getState().root || 1;
        this.renderNode();
      }, 0);
    } else {
      this.renderNode();
    }
  }

  public clear(){
    console.log('clear');
    this.container.clear();
  }

  public render(){
    this.rerender();
  }

  private rerender(){
    let node = 1;

    const state = this.stateService.getState();
    // @ts-ignore
    const currentNode = state[node];

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
            this.cdRef.detectChanges();
          }
        });
      }
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
            this.cdRef.detectChanges();
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
