import {Component, EventEmitter, Output} from '@angular/core';
import {PanelComposerComponent} from "../panel-composer/panel-composer.component";
import {SelectionModalComponent} from "./selection-modal/selection-modal.component";
import {NgIf} from "@angular/common";

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
  @Output() elementToAdd = new EventEmitter<string>();

  protected childElements: any = null;
  protected properties: any = null;
  protected showModal: boolean = false;

  public showSelectionPopup() {
    this.showModal = !this.showModal;
  }

  protected addElement(element: string) {
    this.elementToAdd.emit(element);
  }
}
