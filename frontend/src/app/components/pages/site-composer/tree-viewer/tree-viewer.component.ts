import { Component } from '@angular/core';
import {DesignerStateServiceService} from "../../../../services/states/designer-service/designer-state-service.service";

@Component({
  selector: 'app-tree-viewer',
  standalone: true,
  imports: [],
  templateUrl: './tree-viewer.component.html'
})
export class TreeViewerComponent {

  treeState: any;
  constructor(private designerStateService: DesignerStateServiceService) {
    this.designerStateService.state$.subscribe(state => {
      this.treeState = JSON.stringify(state);
    });
  }

}
