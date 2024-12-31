import {
  Component,
  ComponentFactoryResolver,
  InjectionToken,
  Injector,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {DesignerStateServiceService} from "../../../../services/designer-service/designer-state-service.service";
import {TextComponent} from "../content-element/text/text.component";
import {GridComponent} from "../content-element/grid/grid.component";
import {ButtonComponent} from "../../../shared/button/button.component";
import {ImageComponent} from "../content-element/image/image.component";
import {NgComponentOutlet, NgIf} from "@angular/common";

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
  state: any;
  @ViewChild('container', {read: ViewContainerRef, static: true})
  container!: ViewContainerRef;

  constructor(private stateService: DesignerStateServiceService) {
    this.state = this.stateService.getState();
    console.log(this.state);
  }

  // Help of ChatGPT
  protected parseContent(node: any): any {
    if (!node) return null;
    const component = this.getComponent(node.name);
    if (!component) return null;

    return {component: component, properties: {...node['properties']}};
  }

  customInjector = Injector.create({
    providers: [{
      provide: new InjectionToken<any>('something'),
      useValue: 'Hello, World!'
    }]
  })

  protected getComponent(componentName: string) {
    if (componentName === 'text') {
      return TextComponent;
    } else if (componentName === 'image') {
      return ImageComponent;
    } else if (componentName === 'button') {
      return ButtonComponent;
    } else {
      return GridComponent;
    }
  }
}
