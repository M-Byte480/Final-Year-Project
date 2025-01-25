import {Component, EventEmitter, Output} from '@angular/core';
import {PanelComposerComponent} from "../panel-composer/panel-composer.component";
import {SelectionModalComponent} from "./selection-modal/selection-modal.component";
import {NgIf} from "@angular/common";
import {DesignerStateServiceService} from "../../../../services/designer-service/designer-state-service.service";

@Component({
  selector: 'app-content-element',
  standalone: true,
  imports: [
    PanelComposerComponent,
    SelectionModalComponent,
    NgIf
  ],
  templateUrl: './content-element.component.html',
  styleUrl: './content-element.component.css'
})
export class ContentElementComponent {
  @Output() hideModal = new EventEmitter<boolean>();
  @Output() elementAdded = new EventEmitter<{ element: string; targetIndex: number }>();
  protected targetIndex: number | null = null;

  protected properties: any = null;
  protected showModal: boolean = false;


  constructor() {
  }

  public showSelectionPopup() {
    this.showModal = !this.showModal;
  }

  protected addElement(element: string) {
    console.log("ContentElement addElemenet: " , element, " with index ", this.targetIndex);
    // @ts-ignore
    this.elementAdded.emit({ element, targetIndex: this.targetIndex });
  }
}
