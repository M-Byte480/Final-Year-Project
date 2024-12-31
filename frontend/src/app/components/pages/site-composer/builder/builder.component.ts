import {Component} from '@angular/core';
import {ContentElementComponent} from "../content-element/content-element.component";
import {NgIf} from "@angular/common";
import {DesignerStateServiceService} from '../../../../services/designer-service/designer-state-service.service';
import {ContentLoaderComponent} from "../content-loader/content-loader.component";
import {RootLoaderComponent} from "./root-loader/root-loader.component";

@Component({
  selector: 'app-builder',
  standalone: true,
  imports: [
    ContentElementComponent,
    NgIf,
    ContentLoaderComponent,
    RootLoaderComponent
  ],
  templateUrl: './builder.component.html',
  styleUrl: './builder.component.css'
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

  protected addElement(element: any) {
    let state = this.designerStateService.getState();
    if (state === null) {
      this.empty = false;
    }
    state = element;

    console.log(state);
    this.designerStateService.setState(state);
  }
}
