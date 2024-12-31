import {ChangeDetectorRef, Component, Input} from '@angular/core';
import {ButtonComponent} from "../button/button.component";
import {ImageComponent} from "../image/image.component";
import {TextComponent} from "../text/text.component";
import {NgClass, NgComponentOutlet, NgForOf, NgIf} from "@angular/common";
import {ContentElementComponent} from "../content-element.component";
import {DesignerStateServiceService} from "../../../../../services/designer-service/designer-state-service.service";

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    NgComponentOutlet,
    NgIf,
    ContentElementComponent
  ],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})
export class GridComponent {
  @Input() children: any[] = [];
  @Input() properties: any = {};

  rows = this.properties['rows'] || 2;
  columns = this.properties['columns'] || 2;

  constructor(private designerStateServiceService: DesignerStateServiceService, private changeDetectorRef: ChangeDetectorRef) {
  }

  get rowsArray() {
    return new Array(this.rows);
  }

  get columnsArray() {
    return new Array(this.columns);
  }

}
