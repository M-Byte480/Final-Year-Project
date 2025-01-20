import { Component } from '@angular/core';
import {TreeViewerComponent} from "../tree-viewer/tree-viewer.component";

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

}
