import {Component, OnInit} from '@angular/core';
import {ContentEditorManagerService} from "../../../../../services/managers/content-editor-manager.service";
import {JsonPipe, KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-style-editor',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    FormsModule,
    JsonPipe,
    KeyValuePipe
  ],
  templateUrl: './style-editor.component.html',
  styleUrl: './style-editor.component.css'
})
export class StyleEditorComponent implements OnInit {

  componentDetails: any = {};
  properties: {[key: string]: string} = {};
  id: any = -1;

  constructor(private contentEditorManager: ContentEditorManagerService) {
    this.contentEditorManager.state$.subscribe((state) => {
      this.componentDetails = state;
      console.log("changes");
      this.properties = this.componentDetails.properties;
    });
  }

  ngOnInit(){

  }

  trackByKey(index: number, item: any): string {
    return item.key; // Tracks by unique key
  }

}
