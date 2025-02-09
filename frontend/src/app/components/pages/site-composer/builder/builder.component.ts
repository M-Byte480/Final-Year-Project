import {Component} from '@angular/core';
import {ContentElementComponent} from "../content-element/content-element.component";
import {NgIf} from "@angular/common";
import {DesignerStateServiceService} from '../../../../services/states/designer-service/designer-state-service.service';
import {ContentLoaderComponent} from "../content-loader/content-loader.component";
import {RootLoaderComponent} from "./root-loader/root-loader.component";
import {SelectionModalComponent} from "../content-element/selection-modal/selection-modal.component";

@Component({
  selector: 'app-builder',
  standalone: true,
    imports: [
        ContentElementComponent,
        NgIf,
        ContentLoaderComponent,
        RootLoaderComponent,
        SelectionModalComponent
    ],
  templateUrl: './builder.component.html'
})
export class BuilderComponent {
  protected empty: boolean = true;

  constructor(private designerStateService: DesignerStateServiceService) {
    this.designerStateService.state$.subscribe((state) => {
      this.empty = (state === null);
    });
  }

  ngOnInit() {
    // Fetch data
    // If null, create an empty component

  }

}
