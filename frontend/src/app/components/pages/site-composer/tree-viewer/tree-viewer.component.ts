import { Component } from '@angular/core';
import {DesignerStateServiceService} from "../../../../services/states/designer-service/designer-state-service.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-tree-viewer',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './tree-viewer.component.html'
})
export class TreeViewerComponent {
  hidden: boolean = false;
  treeState: any;
  treeStateRepresentationText: string = 'Show';

  constructor(private designerStateService: DesignerStateServiceService) {
    this.designerStateService.state$.subscribe(state => {
      this.treeState = JSON.stringify(state);
    });
  }

  onHideTree(){
    this.hidden = !this.hidden;
    this.treeStateRepresentationText = this.hidden ? 'Hide' : 'Show';
  }

}
