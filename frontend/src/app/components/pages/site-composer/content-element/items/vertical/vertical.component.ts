import {Component, Input} from '@angular/core';
import {
  DesignerStateServiceService
} from "../../../../../../services/states/designer-service/designer-state-service.service";
import {ContentEditorManagerService} from "../../../../../../services/managers/content-editor-manager.service";

@Component({
  selector: 'app-vertical',
  standalone: true,
  imports: [],
  templateUrl: './vertical.component.html'
})
export class VerticalComponent {
  @Input() properties: any = null;
  @Input() id!: any;
  children: any[] = [];

  constructor(private designerStateService: DesignerStateServiceService,
              private contentEditorManager: ContentEditorManagerService) {

  }


  ngOnInit(){
    if (!this.properties || Object.keys(this.properties).length === 0) {
      // Set default state
      this.emitDefaultState(this.id);
    }

    const currentState = this.designerStateService.getState();

    //@ts-ignore
    this.children = currentState[this.id].properties.children;
  }

  emitDefaultState(id: any){
    const defaultState = {
      children: []
    };

    let nextState = this.designerStateService.getState();
    id = `${id}`;
    // @ts-ignore
    nextState[id].properties = defaultState;

    this.designerStateService.setState(nextState);

    this.contentEditorManager.getStateForId(id);
  }
}
