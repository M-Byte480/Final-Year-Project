import {Component} from '@angular/core';
import {ContentElementComponent} from "../content-element/content-element.component";
import {NgIf} from "@angular/common";
import {DesignerStateServiceService} from '../../../../services/designer-service/designer-state-service.service';
import {ContentLoaderComponent} from "../content-loader/content-loader.component";

@Component({
  selector: 'app-builder',
  standalone: true,
  imports: [
    ContentElementComponent,
    NgIf,
    ContentLoaderComponent
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

  protected addElement(element: string) {
    let state = this.designerStateService.getState();
    if (state === null) {
      state = {};
      this.empty = false;
    }
    state['name'] = element;
    state['children'] = [];

    console.log(state);
    this.designerStateService.setState(state);
  }
}
