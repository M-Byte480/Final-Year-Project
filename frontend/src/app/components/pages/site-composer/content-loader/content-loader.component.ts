import {Component} from '@angular/core';
import {DesignerStateServiceService} from "../../../../services/designer-service/designer-state-service.service";
import {TextComponent} from "../content-element/text/text.component";
import {GridComponent} from "../content-element/grid/grid.component";
import {ButtonComponent} from "../../../shared/button/button.component";
import {ImageComponent} from "../content-element/image/image.component";
import {NgComponentOutlet} from "@angular/common";

@Component({
  selector: 'app-content-loader',
  standalone: true,
  imports: [
    NgComponentOutlet
  ],
  templateUrl: './content-loader.component.html',
  styleUrl: './content-loader.component.css'
})
export class ContentLoaderComponent {
  state: any;

  constructor(private stateService: DesignerStateServiceService) {
    this.state = this.stateService.getState();
  }

  // Help of ChatGPT
  protected parseContent(node: any): any {
    if (!node) return null;
    const component = this.getComponent(node.name);
    if (!component) return null;

    return component;
  }

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
