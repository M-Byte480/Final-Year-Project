import { Injectable } from '@angular/core';
import {TextComponent} from "../../components/pages/site-composer/content-element/items/text/text.component";
import {ImageComponent} from "../../components/pages/site-composer/content-element/items/image/image.component";
import {ButtonComponent} from "../../components/pages/site-composer/content-element/items/button/button.component";
import {ContentElementComponent} from "../../components/pages/site-composer/content-element/content-element.component";
import {GridComponent} from "../../components/pages/site-composer/content-element/items/grid/grid.component";
import {
  VerticalBuilderComponent
} from "../../components/pages/site-composer/content-element/vertical-builder/vertical-builder.component";
import {COMPOSER_TYPE} from "../../shared/constants";
import {
  HorizontalBuilderComponent
} from "../../components/pages/site-composer/content-element/horizontal-builder/horizontal-builder.component";
import {SpacerComponent} from "../../components/pages/site-composer/content-element/items/spacer/spacer.component";
import {
  VerticalComponent
} from "../../components/pages/site-composer/content-element/items/vertical/vertical.component";

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
      case COMPOSER_TYPE.SPACER:
        return SpacerComponent;
      case COMPOSER_TYPE.COMPOSER_VERTICAL:
        return VerticalComponent;
      default:
        console.error('Component not found for name:', name);
        return ContentElementComponent;
    }
  }
}
