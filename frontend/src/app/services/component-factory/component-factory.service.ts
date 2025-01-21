import { Injectable } from '@angular/core';
import {TextComponent} from "../../components/pages/site-composer/content-element/text/text.component";
import {ImageComponent} from "../../components/pages/site-composer/content-element/image/image.component";
import {ButtonComponent} from "../../components/shared/button/button.component";
import {ContentElementComponent} from "../../components/pages/site-composer/content-element/content-element.component";
import {GridComponent} from "../../components/pages/site-composer/content-element/grid/grid.component";

@Injectable({
  providedIn: 'root'
})
export class ComponentFactoryService {

  constructor() { }

  async getComponent(name: string): Promise<any> {
    if (name === 'text') {
      return TextComponent;
    } else if (name === 'image') {
      return ImageComponent;
    } else if (name === 'button') {
      return ButtonComponent;
    } else if (name === 'builder') {
      return ContentElementComponent;
    } else {
      const {GridComponent} = await import('../../components/pages/site-composer/content-element/grid/grid.component');
      return GridComponent;
    }
  }
}
