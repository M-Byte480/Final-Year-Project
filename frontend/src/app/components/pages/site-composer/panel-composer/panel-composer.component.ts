import { Component } from '@angular/core';
import {TreeViewerComponent} from "./tree-viewer/tree-viewer.component";
import {SiteStateManagerService} from "../../../../services/states/state-manager/site-state-manager.service";
import {MatButton} from "@angular/material/button";
import {ActivatedRoute, Router} from "@angular/router";
import {StyleEditorComponent} from "./style-editor/style-editor.component";
import {ApiManagerService} from "../../../../services/managers/api-manager.service";
import {DesignerStateServiceService} from "../../../../services/states/designer-service/designer-state-service.service";
import {FooterStateService} from "../../../../services/states/footer-state/footer-state.service";
import {NavbarStateService} from "../../../../services/states/navbar-state/navbar-state.service";

@Component({
  selector: 'app-panel-composer',
  standalone: true,
  imports: [
    TreeViewerComponent,
    MatButton,
    StyleEditorComponent
  ],
  templateUrl: './panel-composer.component.html'
})
export class PanelComposerComponent {
  private currentRoute = window.location.href;
  constructor(private treeStateManager: SiteStateManagerService,
              private apiManager: ApiManagerService,
              private stateService: DesignerStateServiceService,
              private footerService: FooterStateService,
              private navbarService: NavbarStateService) { }


  public addNewComponent(){
    this.treeStateManager.addNewComponent(
      {
        "type": "text",
        "content": "Hello World",
        "style": {
          "color": "#000000",
          "font-size": "16px",
          "font-family": "Arial",
          "font-weight": "normal",
          "font-style": "normal",
          "text-decoration": "none",
          "text-align": "left",
          "background-color": "#ffffff"
        },
      }
    )
  }

  onSave(){
    this.apiManager.savePage("1");

  }

  public previewPage(){
    this.stateService.saveSession();
    this.footerService.saveSession();
    this.navbarService.saveSession();
    window.open(`${this.currentRoute}/preview`, "_blank");
  }
}
