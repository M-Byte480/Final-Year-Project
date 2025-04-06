import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-site-name-modal',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './site-name-modal.component.html'
})
export class SiteNameModalComponent {
  @Output() displayStateChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() nameOfSite: EventEmitter<string> = new EventEmitter<string>();
  @Input() displayState: boolean = false;
  nameEnteredByUser: string = '';

  close(): void {
    this.displayState = false;
    this.displayStateChange.emit(this.displayState);
  }

  onNameOfSite(element: string): void {
    this.nameOfSite.emit(element);
    this.displayStateChange.emit(false);
  }

}
