import {Component, Input, OnInit} from '@angular/core';
import {
  DesignerStateServiceService
} from "../../../../../../services/states/designer-service/designer-state-service.service";
import {ContentEditorManagerService} from "../../../../../../services/managers/content-editor-manager.service";

@Component({
  selector: 'app-spacer',
  standalone: true,
  imports: [],
  templateUrl: './spacer.component.html',
  styleUrl: './spacer.component.css'
})
export class SpacerComponent implements OnInit{
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
      'width': '32',
      'height': '32',
    };

    let nextState = this.designerStateService.getState();
    id = `${id}`;
    // @ts-ignore
    nextState[id].properties = defaultState;

    this.designerStateService.setState(nextState);

    this.contentEditorManager.getStateForId(id);
  }
}
