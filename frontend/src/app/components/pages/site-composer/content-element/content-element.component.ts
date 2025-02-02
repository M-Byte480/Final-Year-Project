import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PanelComposerComponent} from "../panel-composer/panel-composer.component";
import {SelectionModalComponent} from "./selection-modal/selection-modal.component";
import {NgIf} from "@angular/common";
import {DesignerStateServiceService} from "../../../../services/designer-service/designer-state-service.service";
import {SiteStateManagerService} from "../../../../services/state-manager/site-state-manager.service";

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
  protected showModal: boolean = false;


  constructor(private designerStateService: DesignerStateServiceService,
              private stateManagerSercice: SiteStateManagerService) {
  }

  public showSelectionPopup() {
    this.showModal = !this.showModal;
  }

  protected replaceBuilder(element: string) {
    this.stateManagerSercice.replaceElement(this.id, element);
  }
}
