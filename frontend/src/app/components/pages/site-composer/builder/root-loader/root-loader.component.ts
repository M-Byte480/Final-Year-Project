import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {DesignerStateServiceService} from "../../../../../services/states/designer-service/designer-state-service.service";
import {ContentElementComponent} from "../../content-element/content-element.component";
import {ContentLoaderComponent} from "../../content-loader/content-loader.component";
import {NgIf} from "@angular/common";
import {SelectionModalComponent} from "../../content-element/selection-modal/selection-modal.component";
import {SiteStateManagerService} from "../../../../../services/states/state-manager/site-state-manager.service";
import {ContentEditorManagerService} from "../../../../../services/managers/content-editor-manager.service";
import {SelectorModalService} from "../../../../../services/managers/selector-modal.service";

@Component({
  selector: 'app-root-loader',
  standalone: true,
  imports: [
    ContentElementComponent,
    ContentLoaderComponent,
    NgIf,
    SelectionModalComponent
  ],
  templateUrl: './root-loader.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class RootLoaderComponent {
  rootNode: any;
  protected showModal: boolean = false;

  constructor(private stateService: DesignerStateServiceService,
              private cdr: ChangeDetectorRef,
              private stateManagerService: SiteStateManagerService,
              private contentEditorMgr: ContentEditorManagerService,
              private modalService: SelectorModalService) {
    this.stateService.state$.subscribe((state) => {
      this.rootNode = state;
      this.cdr.markForCheck();
    });

    this.modalService.displayState$.subscribe((state) => {
      this.showModal = state;
    });
  }

  protected replaceBuilder(element: string) {
    let id = this.modalService.getId();
    this.stateManagerService.replaceElement(id, element);
    this.contentEditorMgr.getStateForId(id);
  }

  close(): void {
    this.showModal = false;
    this.modalService.setDisplayState(false);
  }
}
