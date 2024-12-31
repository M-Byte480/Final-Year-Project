import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {DesignerStateServiceService} from "../../../../../services/designer-service/designer-state-service.service";
import {ContentElementComponent} from "../../content-element/content-element.component";
import {ContentLoaderComponent} from "../../content-loader/content-loader.component";
import {GridComponent} from "../../content-element/grid/grid.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-root-loader',
  standalone: true,
  imports: [
    ContentElementComponent,
    ContentLoaderComponent,
    NgIf
  ],
  templateUrl: './root-loader.component.html',
  styleUrl: './root-loader.component.css',
  changeDetection: ChangeDetectionStrategy.Default
})
export class RootLoaderComponent {
  rootNode: any;

  constructor(private stateService: DesignerStateServiceService,
              private cdr: ChangeDetectorRef) {
    this.stateService.state$.subscribe((state) => {
      this.rootNode = state;
      this.cdr.markForCheck();
    });
  }

}
