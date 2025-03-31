import {Component, Input, OnInit} from '@angular/core';
import {
  DesignerStateServiceService
} from "../../../../../../services/states/designer-service/designer-state-service.service";
import {ContentEditorManagerService} from "../../../../../../services/managers/content-editor-manager.service";
import {DeployedHelperService} from "../../../../../../services/deployed-helper.service";
import {NgIf} from "@angular/common";
import {TriggerDeployStateChangeService} from "../../../../../../services/trigger-deploy-state-change.service";

@Component({
  selector: 'app-spacer',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './spacer.component.html',
  styleUrl: './spacer.component.css'
})
export class SpacerComponent implements OnInit{
  @Input() properties: any = null;
  @Input() id!: any;
  isDeployed = false;
  styling: any = {}

  constructor(private designerStateService: DesignerStateServiceService,
              private contentEditorManager: ContentEditorManagerService,
              private deployedHelperService: DeployedHelperService,
              private triggerDeployStateChange: TriggerDeployStateChangeService) {

  }


  ngOnInit(){
    if (!this.properties || Object.keys(this.properties).length === 0) {
      // Set default state
      this.emitDefaultState(this.id);
    }
    this.isDeployed = this.deployedHelperService.getDeployedState();

    this.triggerDeployStateChange.state$.subscribe((state) => {
      this.isDeployed = this.deployedHelperService.getDeployedState();
    });
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
