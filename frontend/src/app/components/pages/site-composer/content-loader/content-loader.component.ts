/*
This file was made with the help of ChatGPT to re-render the UI
 */

import {
  ChangeDetectorRef,
  Component, Input, OnInit, ViewChild, ViewContainerRef,
} from '@angular/core';
import {NgComponentOutlet, NgIf} from "@angular/common";
import {DesignerStateServiceService} from "../../../../services/states/designer-service/designer-state-service.service";
import {ComponentFactoryService} from "../../../../services/component-factory/component-factory.service";

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
               private cdRef: ChangeDetectorRef,
               private composerFactory: ComponentFactoryService) {
    stateService.state$.subscribe((state) => {
      // @ts-ignore
      this.node = state[1];
      setTimeout(() => {
        this.rerender();
      }, 0);
    });
  }

  ngOnInit() {

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
    return this.composerFactory.getComponent(componentName);
  }
}
