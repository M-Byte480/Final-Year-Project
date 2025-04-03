import { Component } from '@angular/core';
import {DesignerStateServiceService} from "../../../../../services/states/designer-service/designer-state-service.service";
import {NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-tree-viewer',
  standalone: true,
  imports: [
    NgIf,
    MatButton
  ],
  templateUrl: './tree-viewer.component.html'
})
export class TreeViewerComponent {
  isHidden = false;
  treeState: any;
  hiddenStateText = 'Show';
  constructor(private designerStateService: DesignerStateServiceService) {
    this.designerStateService.state$.subscribe(state => {
      this.treeState = JSON.stringify(state);
    });
  }

  onHideButton(){
    this.isHidden = !this.isHidden;
    this.hiddenStateText = this.isHidden ? 'Hide' : 'Show';
  }

}
