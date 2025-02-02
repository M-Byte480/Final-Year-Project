import { Component } from '@angular/core';
import {TreeViewerComponent} from "../tree-viewer/tree-viewer.component";
import {SiteStateManagerService} from "../../../../services/state-manager/site-state-manager.service";

@Component({
  selector: 'app-panel-composer',
  standalone: true,
  imports: [
    TreeViewerComponent
  ],
  templateUrl: './panel-composer.component.html',
  styleUrl: './panel-composer.component.css'
})
export class PanelComposerComponent {

  constructor(private treeStateManager: SiteStateManagerService) { }


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
}
