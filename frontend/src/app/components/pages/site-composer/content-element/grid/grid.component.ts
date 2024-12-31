import {Component, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ButtonComponent} from "../button/button.component";
import {ImageComponent} from "../image/image.component";
import {TextComponent} from "../text/text.component";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {ContentLoaderComponent} from "../../content-loader/content-loader.component";
import {ContentElementComponent} from "../content-element.component";

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
export class GridComponent implements OnInit {
  @Input() rows: any;
  @Input() columns: any;
  @Input() children: any;
  @ViewChild('slot', { read: ViewContainerRef, static: true })
  slotContainer!: ViewContainerRef;
  rowsArray: any;
  columnsArray: any;

  constructor() {}

  ngOnInit() {
    this.rowsArray = Array.from({ length: this.rows });
    this.columnsArray = Array.from({ length: this.columns });
    this.renderChildren();
  }

  renderChildren() {
    const totalSlots = this.rows * this.columns;

    for (let i = 0; i < totalSlots; i++) {
      const node = this.children[i] || { name: null };
      this.renderChild(node);
    }
  }

  private renderChild(node: any) {
    if (!node.name) {
      return; // Skip empty slots
    }

    const component = this.getComponent(node.name);
    if (component) {
      const componentRef = this.slotContainer.createComponent(component);
      // @ts-ignore
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
