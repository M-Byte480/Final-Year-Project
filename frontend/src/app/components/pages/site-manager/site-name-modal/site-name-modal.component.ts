import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-site-name-modal',
  standalone: true,
  imports: [],
  templateUrl: './site-name-modal.component.html',
  styleUrl: './site-name-modal.component.css'
})
export class SiteNameModalComponent {
  @Output() displayStateChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() nameOfSite: EventEmitter<string> = new EventEmitter<string>();
  @Input() displayState: boolean = false;

  close(): void {
    this.displayState = false;
    this.displayStateChange.emit(this.displayState);
  }

  onNameOfSite(element: string): void {
    this.nameOfSite.emit(element);
  }

  doNothing(): void {
  }

}