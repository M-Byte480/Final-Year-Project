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

  ngOnInit(){
    if (!this.node){
      const defaultState = {
        1: {id: 1, name: 'grid', properties: { rows: 1, columns: 1, children: []}},
        root: 1
      };
      // Not a great solution, but it is convenient for now
      // The issue is with the rendering and binding of the parent component, which believes the node is null
      // Thus it renders to be null, yet the state has changed. The timeout allows it to re-trigger the binding during
      // the next event loop
      setTimeout(() => {
        this.stateService.setState(defaultState);
      }, 0);
    }
  }

  // Help of ChatGPT
  protected parseContent(node: any): any {
    if (!node) {
      console.log("no node provided");
      return null;
    }
    const component = this.getComponent(node.name);
    if (!component) return null;

    return {component: component, properties: {...node['properties'] || {}}};
  }

  protected getComponent(componentName: string) {
    console.log("Selected component", componentName);
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
