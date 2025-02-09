import {Component, OnInit} from '@angular/core';
import {ContentEditorManagerService} from "../../../../../services/managers/content-editor-manager.service";
import {JsonPipe, KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-style-editor',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    FormsModule,
    JsonPipe,
    KeyValuePipe,
    MatButton
  ],
  templateUrl: './style-editor.component.html',
  styleUrl: './style-editor.component.css'
})
export class StyleEditorComponent implements OnInit {

  componentDetails: any = {};
  properties: {[key: string]: string} = {};
  id: any = -1;
  showStyleEditor: boolean = false;

  constructor(private contentEditorManager: ContentEditorManagerService) {
    this.contentEditorManager.state$.subscribe((state) => {
      this.componentDetails = state;
      this.id = this.contentEditorManager.getId();
      this.properties = this.componentDetails.properties;
      if(Object.keys(this.componentDetails).length !== 0){
        this.showStyleEditor = true;
      }
    });
  }

  ngOnInit(){

  }

  trackByKey(index: number, item: any): string {
    return item.key; // Tracks by unique key
  }

  deleteComponent(){
    console.log("Deleting component", this.id);
    this.contentEditorManager.deleteComponent(this.id);
  }

}
