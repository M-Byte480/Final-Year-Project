import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
  ViewContainerRef
} from '@angular/core';
import {ButtonComponent} from "../button/button.component";
import {ImageComponent} from "../image/image.component";
import {TextComponent} from "../text/text.component";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {ContentLoaderComponent} from "../../content-loader/content-loader.component";
import {ContentElementComponent} from "../content-element.component";
import {DesignerStateServiceService} from "../../../../../services/states/designer-service/designer-state-service.service";
import {VerticalBuilderComponent} from "../vertical-builder/vertical-builder.component";
import {ComponentFactoryService} from "../../../../../services/component-factory/component-factory.service";

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    ContentLoaderComponent,
    NgIf
  ],
  templateUrl: './grid.component.html'
})
export class GridComponent implements OnInit, AfterViewInit {
  @Input() rows: number = 1;
  @Input() columns: number = 1;
  @Input() children: number[] = [];
  @Input() state: any = {};

  @ViewChildren('slot', { read: ViewContainerRef }) slots!: QueryList<ViewContainerRef>;

  rowsArray: any;
  columnsArray: any;

  constructor(private stateService: DesignerStateServiceService,
              private composerFactory: ComponentFactoryService) {}

  ngOnInit() {
    this.rowsArray = Array.from({ length: this.rows });
    this.columnsArray = Array.from({ length: this.columns });
    this.state = this.stateService.getState();
  }

  ngAfterViewInit() {
    this.renderChildren();
  }

  renderChildren() {
    const slotsArray = this.slots.toArray();
    for (let i = 0; i < slotsArray.length; i++) {
      const slot = slotsArray[i];

      const childId = this.children[i];
      const childNode = this.state[childId];

      if (childNode) {
        this.renderChild(slot, childNode, i);
      } else {
        console.warn(`Child with ID ${childId} not found in state.`);
      }
    }
  }

  private renderChild(slot: ViewContainerRef, node: any, targetIndex: number) {

    const component = this.composerFactory.getComponent(node.name);

    if (component) {
      // @ts-ignore
      const componentRef = slot.createComponent(component);
      Object.assign(componentRef.instance, {
        ...node.properties,
        id: node.id,
        children: node.properties.children || [],
        state: this.state,
      });
    }
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }

}
