import { Component } from '@angular/core';
import {TreeViewerComponent} from "./tree-viewer/tree-viewer.component";
import {SiteStateManagerService} from "../../../../services/states/state-manager/site-state-manager.service";
import {MatButton} from "@angular/material/button";
import {ActivatedRoute, Router} from "@angular/router";
import {StyleEditorComponent} from "./style-editor/style-editor.component";

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

  constructor(private treeStateManager: SiteStateManagerService,
              private router: Router,
              private activedRoute: ActivatedRoute) { }


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

  public previewPage(){
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['./preview'], {relativeTo: this.activedRoute})
    );
    window.open(url, '_blank');
  }
}
