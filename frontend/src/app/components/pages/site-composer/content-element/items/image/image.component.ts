/*
This component was made with the help of Copilot
 */
import {Component, Input, OnInit} from '@angular/core';
import {NgIf, NgOptimizedImage, NgStyle} from "@angular/common";
import {
  DesignerStateServiceService
} from "../../../../../../services/states/designer-service/designer-state-service.service";
import {ContentEditorManagerService} from "../../../../../../services/managers/content-editor-manager.service";

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgIf,
    NgStyle
  ],
  templateUrl: './image.component.html',
  styleUrl: './image.component.css'
})
export class ImageComponent implements OnInit{
  @Input() properties: any = null;
  @Input() id!: any;
  styling: any = {}

  constructor(private designerStateService: DesignerStateServiceService,
              private contentEditorManager: ContentEditorManagerService) {

  }


  ngOnInit(){
    if (!this.properties || Object.keys(this.properties).length === 0) {
      // Set default state
      this.emitDefaultState(this.id);
    }
  }

  emitDefaultState(id: any){
    const defaultState = {
      'src': 'https://placehold.co/200x200/EEE/31343C',
      'width': '100%',
      'height': 'auto',
      'border-radius': '8px',
      'object-fit': 'cover',
      'box-shadow': '0 2px 8px rgba(0, 0, 0, 0.1)',
      'alt': 'Placeholder image'
    };

    let nextState = this.designerStateService.getState();
    id = `${id}`;
    // @ts-ignore
    nextState[id].properties = defaultState;

    this.designerStateService.setState(nextState);

    this.contentEditorManager.getStateForId(id);
  }
}
