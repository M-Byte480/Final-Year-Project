import {Component, OnInit} from '@angular/core';
import {DesignerStateServiceService} from "../../../../services/states/designer-service/designer-state-service.service";
import {RootComponent} from "../../../../shared/data-types";
import {PageRendererComponent} from "./page-renderer/page-renderer.component";

@Component({
  selector: 'app-preview-page',
  standalone: true,
  imports: [
    PageRendererComponent
  ],
  templateUrl: './preview-page.component.html'
})
export class PreviewPageComponent implements OnInit {
  public pageState: RootComponent | null = null;

  constructor(private stateService: DesignerStateServiceService) {
    this.stateService.state$.subscribe( (state) => {
      this.pageState = state;
    });
  }

  ngOnInit(){

  }

}
