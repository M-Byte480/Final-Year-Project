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
  @Input() rows: any;
  @Input() columns: any;
  @Input() children: any;
  @ViewChildren('slot', { read: ViewContainerRef })
  slots!: QueryList<ViewContainerRef>;
  rowsArray: any;
  columnsArray: any;

  constructor() {}

  ngOnInit() {
    this.rowsArray = Array.from({ length: this.rows });
    this.columnsArray = Array.from({ length: this.columns });

  }

  ngAfterViewInit() {
    this.renderChildren();
  }

  renderChildren() {
    const slotsArray = this.slots.toArray();

    for (let i = 0; i < slotsArray.length; i++) {
      const slot = slotsArray[i];

      const node = this.children[i] || { name: null };
      this.renderChild(slot, node);
    }
  }

  handleSlotClick(row: number, column: number): void {
    console.log('Slot clicked', row, column);
    const index = row * this.columns + column;

    // const component =
  }

  private renderChild(slot: any, node: any, targetIndex: number = 1) {
    console.log('Rendering child', node);
    if (!node.name) {
      node.name = 'builder';
    }
    const component = this.getComponent(node.name);

    if (component) {
      const componentRef = slot.createComponent(component);
      Object.assign(componentRef.instance, node.properties);
      Object.assign(componentRef.instance, {
        ...node.properties,
        targetIndex,
      });

      if (node.name === 'builder') {
        componentRef.instance.targetIndex = targetIndex;
        componentRef.instance.elementAdded.subscribe(({element, targetIndex}:{ element: string, targetIndex: number}) => {
          this.addElement(element, targetIndex);
        });
      }
    }
  }

  private addElement(element: string, targetIndex: number) {
    console.log("Adding element", element, "at index", targetIndex);
    const currentState = this.children;

    if (targetIndex >= 0 && targetIndex < currentState.length) {
      let newElement = null;

      switch (element) {
        case 'text':
          newElement = {
            name: 'text',
            properties: {
              text: 'Hello, World!',
            },
          };
          break;
        case 'image':
          newElement = {
            name: 'image',
            properties: {
              src: 'https://via.placeholder.com/150',
            },
          };
          break;
        case 'grid':
          newElement = {
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

      // Update the children array with the new element at the target index
      currentState[targetIndex] = newElement;

      // Notify the parent or state service about the change
      // Assuming the parent component or a service is responsible for managing the state
      console.log('Adding element at index', targetIndex, newElement);
      this.notifyStateChange();
    } else {
      console.error('Invalid target index:', targetIndex);
    }
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
      default:
        return null;
    }
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }

  // ngOnInit() {
  //   console.log(this.rows);
  //   console.log(this.columns);
  //   if (!this.children) {
  //     this.children = [];
  //     for (let i = 0; i < this.rows * this.columns; i++) {
  //       this.children.push(null);
  //     }
  //   }
  // }
  //
  // get rowsArray() {
  //   return new Array(this.rows);
  // }
  //
  // get columnsArray() {
  //   return new Array(this.columns);
  // }

}
