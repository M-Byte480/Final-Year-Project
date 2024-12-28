import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DesignerStateServiceService} from "../../../../../services/designer-service/designer-state-service.service";

@Component({
  selector: 'app-selection-modal',
  standalone: true,
  imports: [],
  templateUrl: './selection-modal.component.html',
  styleUrl: './selection-modal.component.css'
})
export class SelectionModalComponent {
  @Input() displayState: boolean = false;
  @Output() displayStateChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() elementToAddEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  close(): void {
    this.displayState = false;
    this.displayStateChange.emit(this.displayState);
  }

  addElement(element: string): void {
    this.elementToAddEvent.emit(element);
  }

  doNothing(): void {
  }


}
