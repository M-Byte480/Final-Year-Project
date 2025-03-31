import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DesignerStateServiceService} from "../../../../../services/states/designer-service/designer-state-service.service";
import {SelectorModalService} from "../../../../../services/managers/selector-modal.service";
import {COMPOSER_TYPE} from "../../../../../shared/constants";

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

  constructor(private modalService: SelectorModalService) {
  }

  close(): void {
    this.displayState = false;
    this.modalService.setDisplayState(false);
    this.displayStateChange.emit(this.displayState);
  }

  addElement(element: string): void {
    this.elementToAddEvent.emit(element);
  }

    protected readonly Component = Component;
  protected readonly COMPOSER_TYPE = COMPOSER_TYPE;
}
