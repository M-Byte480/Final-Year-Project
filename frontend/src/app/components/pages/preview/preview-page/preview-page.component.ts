import {Component, OnInit} from '@angular/core';
import {DesignerStateServiceService} from "../../../../services/states/designer-service/designer-state-service.service";
import {RootComponent} from "../../../../shared/data-types";
import {PageRendererComponent} from "./page-renderer/page-renderer.component";
import {NavbarRendererComponent} from "../../../shared/navbar-renderer/navbar-renderer.component";
import {FooterRendererComponent} from "../../../shared/footer-renderer/footer-renderer.component";

@Component({
  selector: 'app-preview-page',
  standalone: true,
  imports: [
    PageRendererComponent,
    NavbarRendererComponent,
    FooterRendererComponent
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
