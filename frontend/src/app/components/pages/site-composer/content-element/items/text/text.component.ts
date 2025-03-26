import {Component, Input, OnInit} from '@angular/core';
import {
  DesignerStateServiceService
} from "../../../../../../services/states/designer-service/designer-state-service.service";
import {ContentEditorManagerService} from "../../../../../../services/managers/content-editor-manager.service";
import {NgStyle} from "@angular/common";

@Component({
  selector: 'app-text',
  standalone: true,
  imports: [
    NgStyle
  ],
  templateUrl: './text.component.html',
  styleUrl: './text.component.css'
})
export class TextComponent implements OnInit{
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
      'content': 'Hello World!',
      'font-size': '16px',
      'width': '100%',
      'height': 'auto',
      'font colour': '#000000',
      'background colour': 'transparent',
    };

    let nextState = this.designerStateService.getState();
    id = `${id}`;
    // @ts-ignore
    nextState[id].properties = defaultState;

    this.designerStateService.setState(nextState);

    this.contentEditorManager.getStateForId(id);
  }
}
