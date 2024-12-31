import {Component, Input, OnInit} from '@angular/core';
import {ButtonComponent} from "../button/button.component";
import {ImageComponent} from "../image/image.component";
import {TextComponent} from "../text/text.component";
import {NgClass, NgForOf} from "@angular/common";
import {ContentLoaderComponent} from "../../content-loader/content-loader.component";

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    ContentLoaderComponent
  ],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})
export class GridComponent implements OnInit {
  @Input() rows: any;
  @Input() columns: any;
  @Input() children: any;

  ngOnInit() {
    console.log(this.rows);
    console.log(this.columns);
    if (!this.children) {
      this.children = [];
    }
  }

  get rowsArray() {
    return new Array(this.rows);
  }

  get columnsArray() {
    return new Array(this.columns);
  }


}
