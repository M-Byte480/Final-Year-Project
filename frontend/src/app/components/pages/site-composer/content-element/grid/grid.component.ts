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

  private renderChild(slot: any, node: any) {
    if (!node.name) {
      node.name = 'builder';
    }
    const component = this.getComponent(node.name);

    if (component) {
      const componentRef = slot.createComponent(component);
      Object.assign(componentRef.instance, node.properties);
    }
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
