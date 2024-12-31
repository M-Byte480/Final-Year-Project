import {
  Component,
  ComponentFactoryResolver,
  InjectionToken,
  Injector, Input,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {DesignerStateServiceService} from "../../../../services/designer-service/designer-state-service.service";
import {TextComponent} from "../content-element/text/text.component";
import {GridComponent} from "../content-element/grid/grid.component";
import {ButtonComponent} from "../../../shared/button/button.component";
import {ImageComponent} from "../content-element/image/image.component";
import {NgComponentOutlet, NgIf} from "@angular/common";
import {ContentElementComponent} from "../content-element/content-element.component";

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
export class ContentLoaderComponent {
  @Input() node: any;

  constructor() {

  }

  ngOnInit(){
    if (!this.node){
      this.node = {
        name: 'builder'
      }
    }
  }

  // Help of ChatGPT
  protected parseContent(node: any): any {
    if (!node) return null;
    const component = this.getComponent(node.name);
    if (!component) return null;

    return {component: component, properties: {...node['properties']}};
  }

  protected getComponent(componentName: string) {
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
