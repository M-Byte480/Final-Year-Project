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
  @Output() elementToAdd = new EventEmitter<any>();

  protected properties: any = null;
  protected showModal: boolean = false;

  public showSelectionPopup() {
    this.showModal = !this.showModal;
  }

  protected addElement(element: string) {
    let component = null;
    switch (element) {
      case 'text':
        component = {
          name: 'text',
          properties: {
            text: 'Hello, World!'
          }
        };
        break;
      case 'image':
        component = {
          name: 'image',
          properties: {
            src: 'https://via.placeholder.com/150'
          }
        };
        break;
      case 'grid':
        component = {
          name: 'grid',
          properties: {
            columns: 2,
            rows: 2
          }
        };
        break;
    }
    this.elementToAdd.emit(component);
  }
}
