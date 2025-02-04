import { Injectable } from '@angular/core';
import {TextComponent} from "../../components/pages/site-composer/content-element/text/text.component";
import {ImageComponent} from "../../components/pages/site-composer/content-element/image/image.component";
import {ButtonComponent} from "../../components/shared/button/button.component";
import {ContentElementComponent} from "../../components/pages/site-composer/content-element/content-element.component";
import {GridComponent} from "../../components/pages/site-composer/content-element/grid/grid.component";
import {
  VerticalBuilderComponent
} from "../../components/pages/site-composer/content-element/vertical-builder/vertical-builder.component";
import {COMPOSER_TYPE} from "../../shared/constants";
import {
  HorizontalBuilderComponent
} from "../../components/pages/site-composer/content-element/horizontal-builder/horizontal-builder.component";

@Injectable({
  providedIn: 'root'
})
export class ComponentFactoryService {

  constructor() { }

  public getComponent(name: string) {
    switch (name) {
      case COMPOSER_TYPE.TEXT:
        return TextComponent;
      case COMPOSER_TYPE.IMAGE:
        return ImageComponent;
      case COMPOSER_TYPE.BUTTON:
        return ButtonComponent;
      case COMPOSER_TYPE.BUILDER:
        return ContentElementComponent;
      case COMPOSER_TYPE.GRID:
        return GridComponent;
      case COMPOSER_TYPE.VERTICAL_BUILDER:
        return VerticalBuilderComponent;
      case COMPOSER_TYPE.HORIZONTAL_BUILDER:
        return HorizontalBuilderComponent;
      default:
        console.error('Component not found for name:', name);
        return ContentElementComponent;
    }
  }
}
