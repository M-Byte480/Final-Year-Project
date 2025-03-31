import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PanelComposerComponent} from "../panel-composer/panel-composer.component";
import {SelectionModalComponent} from "./selection-modal/selection-modal.component";
import {NgIf} from "@angular/common";
import {SelectorModalService} from "../../../../services/managers/selector-modal.service";
import {DeployedHelperService} from "../../../../services/deployed-helper.service";

@Component({
  selector: 'app-content-element',
  standalone: true,
  imports: [
    PanelComposerComponent,
    SelectionModalComponent,
    NgIf
  ],
  templateUrl: './content-element.component.html'
})
export class ContentElementComponent implements OnInit{
  @Output() hideModal = new EventEmitter<boolean>();
  @Output() elementAdded = new EventEmitter<{ element: string; targetIndex: number }>();
  @Input() id!: number;
  isDeployed = false;
  protected properties: any = null;

  constructor(private modalService: SelectorModalService,
              private deployedHelper: DeployedHelperService) {
  }

  ngOnInit(){
    this.isDeployed = this.deployedHelper.getDeployedState();
  }

  public showSelectionPopup() {
    this.modalService.setId(this.id);
    this.modalService.setDisplayState(true);
  }
}
