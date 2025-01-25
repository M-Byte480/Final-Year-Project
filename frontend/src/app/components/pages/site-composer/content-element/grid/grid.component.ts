import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewContainerRef
} from '@angular/core';
import {ButtonComponent} from "../button/button.component";
import {ImageComponent} from "../image/image.component";
import {TextComponent} from "../text/text.component";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {ContentLoaderComponent} from "../../content-loader/content-loader.component";
import {ContentElementComponent} from "../content-element.component";
import {repeat} from "rxjs";
import {DesignerStateServiceService} from "../../../../../services/designer-service/designer-state-service.service";

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    ContentLoaderComponent,
    NgIf
  ],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})
export class GridComponent implements OnInit, AfterViewInit {
  @Input() rows: number = 1;
  @Input() columns: number = 1;
  @Input() children: number[] = [];
  @Input() state: any = {};

  @ViewChildren('slot', { read: ViewContainerRef }) slots!: QueryList<ViewContainerRef>;

  rowsArray: any;
  columnsArray: any;

  constructor(private stateService: DesignerStateServiceService) {}

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
    console.log(this.state);
    for (let i = 0; i < slotsArray.length; i++) {
      const slot = slotsArray[i];

      const childId = this.children[i];
      const childNode = this.state[childId];
      console.log("childId", childId, "childNode", childNode);
      if (childNode) {
        this.renderChild(slot, childNode, i);
      } else {
        console.warn(`Child with ID ${childId} not found in state.`);
      }
    }
  }

  handleSlotClick(row: number, column: number): void {
    console.log('Slot clicked', row, column);
    const index = row * this.columns + column;

    // const component =
  }

  private renderChild(slot: ViewContainerRef, node: any, targetIndex: number) {
    console.log('Rendering child', node);

    const component = this.getComponent(node.name);

    if (component) {
      const componentRef = slot.createComponent(component);
      Object.assign(componentRef.instance, {
        ...node.properties,
        children: node.properties.children || [],
        state: this.state,
      });

      // if (node.name === 'builder') {
      //   // @ts-ignore
      //   componentRef.instance.targetIndex = targetIndex;
      //   // @ts-ignore
      //   componentRef.instance.elementAdded.subscribe(({element, targetIndex}:{ element: string, targetIndex: number}) => {
      //     this.addElement(element, targetIndex);
      //   });
      // }
    }
  }

  private addElement(element: string, targetIndex: number) {
    console.log('Adding element', element, 'at index', targetIndex);
    const newElementId = Math.max(...Object.keys(this.state).map(Number)) + 1;

    let newElement = null;

    switch (element) {
      case 'text':
        newElement = {
          id: newElementId,
          name: 'text',
          properties: {
            text: 'Hello, World!',
          },
        };
        break;
      case 'image':
        newElement = {
          id: newElementId,
          name: 'image',
          properties: {
            src: 'https://via.placeholder.com/150',
          },
        };
        break;
      case 'grid':
        newElement = {
          id: newElementId,
          name: 'grid',
          properties: {
            columns: 2,
            rows: 2,
            children: [null, null, null, null],
          },
        };
        break;
      default:
        console.error('Unsupported element type:', element);
        return;
    }

    // Update the state with the new element
    this.state[newElementId] = newElement;

    // Update the children array for the parent
    this.children[targetIndex] = newElementId;

    console.log('State after adding element:', this.state);

    // Notify parent or service about the state change
    this.notifyStateChange();
  }

  private notifyStateChange() {
    console.log('State updated, notify parent or service.');
  }

  private getComponent(name: string) {
    switch (name) {
      case 'text':
        return TextComponent;
      case 'image':
        return ImageComponent;
      case 'button':
        return ButtonComponent;
      case 'builder':
        return ContentElementComponent;
      case 'grid':
        return GridComponent;
      default:
        console.error('Component not found for name:', name);
        return ContentElementComponent;
    }
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }

}
