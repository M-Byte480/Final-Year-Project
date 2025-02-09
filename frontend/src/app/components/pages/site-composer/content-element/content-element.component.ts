import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PanelComposerComponent} from "../panel-composer/panel-composer.component";
import {SelectionModalComponent} from "./selection-modal/selection-modal.component";
import {NgIf} from "@angular/common";
import {DesignerStateServiceService} from "../../../../services/states/designer-service/designer-state-service.service";
import {SiteStateManagerService} from "../../../../services/states/state-manager/site-state-manager.service";
import {ContentEditorManagerService} from "../../../../services/managers/content-editor-manager.service";
import {SelectorModalService} from "../../../../services/managers/selector-modal.service";

@Component({
  selector: 'app-content-element',
  standalone: true,
  imports: [
    PanelComposerComponent,
    SelectionModalComponent,
    NgIf
  ],
  templateUrl: './content-element.component.html'
})
export class ContentElementComponent {
  @Output() hideModal = new EventEmitter<boolean>();
  @Output() elementAdded = new EventEmitter<{ element: string; targetIndex: number }>();
  @Input() id!: number;

  protected properties: any = null;

  constructor(private modalService: SelectorModalService) {
  }
  public showSelectionPopup() {
    this.modalService.setId(this.id);
    this.modalService.setDisplayState(true);
  }
}
