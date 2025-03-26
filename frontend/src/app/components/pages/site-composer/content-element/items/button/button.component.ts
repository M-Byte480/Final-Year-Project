import {Component, Input, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {NgIf, NgStyle} from "@angular/common";
import {
  DesignerStateServiceService
} from "../../../../../../services/states/designer-service/designer-state-service.service";
import {ContentEditorManagerService} from "../../../../../../services/managers/content-editor-manager.service";
import {DeployedHelperService} from "../../../../../../services/deployed-helper.service";

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    MatButton,
    NgIf,
    NgStyle
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent implements OnInit{
  @Input() properties: any = null;
  @Input() id!: any;
  isDeployed = false;

  constructor(private designerStateService: DesignerStateServiceService,
              private contentEditorManager: ContentEditorManagerService,
              private deployedHelperService: DeployedHelperService) {

  }


  ngOnInit(){
    if (!this.properties || Object.keys(this.properties).length === 0) {
      // Set default state
      this.emitDefaultState(this.id);
    }

    this.isDeployed = this.deployedHelperService.getDeployedState();
  }

  emitDefaultState(id: any){
    const defaultState = {
      'width': '40px',
      'height': '40px',
      'font-size': '14px',
      'color': '#000000',
      'background-color': '#ffffff',
      'border': '1px solid #000000',
      'border-radius': '4px',
      'padding': '32px',
      'content': 'Button',
      'go to': 'https://www.google.com',
    };

    let nextState = this.designerStateService.getState();
    id = `${id}`;
    // @ts-ignore
    nextState[id].properties = defaultState;

    this.designerStateService.setState(nextState);

    this.contentEditorManager.getStateForId(id);
  }

  goto(link: string) {
    window.open(link, "_blank");
  }
}
