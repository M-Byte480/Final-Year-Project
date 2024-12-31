import {ChangeDetectorRef, Component} from '@angular/core';
import {DesignerStateServiceService} from "../../../../../services/designer-service/designer-state-service.service";
import {TextComponent} from "../../content-element/text/text.component";
import {ImageComponent} from "../../content-element/image/image.component";
import {ButtonComponent} from "../../../../shared/button/button.component";
import {GridComponent} from "../../content-element/grid/grid.component";
import {ContentElementComponent} from "../../content-element/content-element.component";
import {NgComponentOutlet, NgIf} from "@angular/common";

@Component({
  selector: 'app-root-loader',
  standalone: true,
  imports: [
    NgComponentOutlet,
    NgIf
  ],
  templateUrl: './root-loader.component.html',
  styleUrl: './root-loader.component.css'
})
export class RootLoaderComponent {
  state: any;

  constructor(private stateService: DesignerStateServiceService, private cdr: ChangeDetectorRef) {
    this.stateService.getState().subscribe((state) => {
      this.state = state;
      this.cdr.detectChanges();
    });
  }

  // Help of ChatGPT
  protected parseContent(node: any): any {
    if (!node) return null;
    const component = this.getComponent(node.name);
    if (!component) return null;

    return {component, inputs: node.properties};
  }

  protected getComponent(componentName: string) {
    console.log("getcomponent", componentName);
    if (componentName === 'text') {
      return TextComponent;
    } else if (componentName === 'image') {
      return ImageComponent;
    } else if (componentName === 'button') {
      return ButtonComponent;
    } else if (componentName === 'grid') {
      return GridComponent;
    } else {
      return ContentElementComponent;
    }
  }
}
