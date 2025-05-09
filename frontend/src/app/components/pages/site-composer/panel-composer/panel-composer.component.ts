import {Component, OnInit} from '@angular/core';
import {TreeViewerComponent} from "./tree-viewer/tree-viewer.component";
import {SiteStateManagerService} from "../../../../services/states/state-manager/site-state-manager.service";
import {MatButton} from "@angular/material/button";
import {ActivatedRoute, Router} from "@angular/router";
import {StyleEditorComponent} from "./style-editor/style-editor.component";
import {ApiManagerService} from "../../../../services/managers/api-manager.service";
import {DesignerStateServiceService} from "../../../../services/states/designer-service/designer-state-service.service";
import {FooterStateService} from "../../../../services/states/footer-state/footer-state.service";
import {NavbarStateService} from "../../../../services/states/navbar-state/navbar-state.service";
import {HttpApiService} from "../../../../services/http/http-api.service";
import {ENDPOINTS} from "../../../../services/http/endpoints";
import {HttpParams} from "@angular/common/http";
import {DeployedHelperService} from "../../../../services/deployed-helper.service";
import {TriggerDeployStateChangeService} from "../../../../services/trigger-deploy-state-change.service";
import {NgIf} from "@angular/common";
import {ContentEditorManagerService} from "../../../../services/managers/content-editor-manager.service";

@Component({
  selector: 'app-panel-composer',
  standalone: true,
  imports: [
    TreeViewerComponent,
    MatButton,
    StyleEditorComponent,
    NgIf
  ],
  templateUrl: './panel-composer.component.html'
})
export class PanelComposerComponent implements OnInit {
  private currentRoute = window.location.href;
  private readonly siteId;
  private readonly pageId;
  private deployedState = false;
  isDupeMode = false;

  constructor(private treeStateManager: SiteStateManagerService,
              private apiManager: ApiManagerService,
              private stateService: DesignerStateServiceService,
              private footerService: FooterStateService,
              private navbarService: NavbarStateService,
              private route: ActivatedRoute,
              private httpService: HttpApiService,
              private deployedHelperService: DeployedHelperService,
              private triggerDeployStateChange: TriggerDeployStateChangeService,
              private contentEditorManager: ContentEditorManagerService) {
    this.siteId = this.route.snapshot.paramMap.get('siteId') || "";
    this.pageId = this.route.snapshot.paramMap.get('pageId') || "";

    this.deployedState = this.deployedHelperService.getDeployedState();
  }

  ngOnInit(){
    const httpParams = new HttpParams().set('siteId', this.siteId).set('pageId', this.pageId);
    this.httpService.get(ENDPOINTS['getCurrentComposer'],httpParams).subscribe((res) => {

      this.stateService.setState( isNaN(res.maxId) ? DesignerStateServiceService.DEFAULT_STATE : res);
    });

    this.contentEditorManager.isDupeCalled$.subscribe((isDupeCalled) => {
      this.isDupeMode = isDupeCalled;
    });
  }

  onChangeHelperState(){
    this.deployedState = !this.deployedState;
    console.log(this.deployedState);
    this.deployedHelperService.setDeployedState(this.deployedState);
    this.triggerDeployStateChange.setState(this.deployedState);
  }


  onSave(){
    this.stateService.saveSession();
    this.footerService.saveSession();
    this.navbarService.saveSession();

    const payload = {
      siteId: this.siteId,
      pageId: this.pageId,
      state: this.stateService.getState()
    }

    this.httpService.post(ENDPOINTS['composerSave'], payload).subscribe((res) => {
      console.log(res);
    });
  }

  public previewPage(){
    this.deployedHelperService.setDeployedState(this.deployedState);
    this.stateService.saveSession();
    this.footerService.saveSession();
    this.navbarService.saveSession();
    window.open(`${this.currentRoute}/preview`, "_blank");
  }

  disableDupeMode() {
    this.stateService.saveSession();
    this.footerService.saveSession();
    this.navbarService.saveSession();

    const payload = {
      siteId: this.siteId,
      pageId: this.pageId,
      state: this.stateService.getState()
    }

    this.httpService.post(ENDPOINTS['composerSave'], payload).subscribe((res) => {
      this.isDupeMode = false;
      window.location.reload();
    });
  }
}
