import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PanelComposerComponent} from "../panel-composer/panel-composer.component";
import {SelectionModalComponent} from "./grid/selection-modal/selection-modal.component";
import {NgComponentOutlet, NgIf} from "@angular/common";

@Component({
  selector: 'app-content-element',
  standalone: true,
  imports: [
    PanelComposerComponent,
    SelectionModalComponent,
    NgIf,
    NgComponentOutlet
  ],
  templateUrl: './content-element.component.html',
  styleUrl: './content-element.component.css'
})
export class ContentElementComponent {
  @Output() hideModal = new EventEmitter<boolean>();
  @Output() elementToAdd = new EventEmitter<string>();

  protected showModal: boolean = false;

  public showSelectionPopup() {
    this.showModal = !this.showModal;
  }

  protected addElement(element: string) {
    this.elementToAdd.emit(element);
  }
}
