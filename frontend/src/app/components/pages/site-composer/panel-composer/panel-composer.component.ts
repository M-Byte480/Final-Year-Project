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

@Component({
  selector: 'app-panel-composer',
  standalone: true,
  imports: [
    TreeViewerComponent,
    MatButton,
    StyleEditorComponent
  ],
  templateUrl: './panel-composer.component.html'
})
export class PanelComposerComponent implements OnInit {
  private currentRoute = window.location.href;
  private readonly siteId;
  private readonly pageId;

  constructor(private treeStateManager: SiteStateManagerService,
              private apiManager: ApiManagerService,
              private stateService: DesignerStateServiceService,
              private footerService: FooterStateService,
              private navbarService: NavbarStateService,
              private route: ActivatedRoute,
              private httpService: HttpApiService) {
    this.siteId = this.route.snapshot.paramMap.get('siteId') || "";
    this.pageId = this.route.snapshot.paramMap.get('pageId') || "";
  }

  ngOnInit(){
    console.log("testing");
    const httpParams = new HttpParams().set('siteId', this.siteId).set('pageId', this.pageId);
    this.httpService.get(ENDPOINTS['getCurrentComposer'],httpParams).subscribe((res) => {
      this.stateService.setState(res['composerState']);
    });
  }


  onSave(){
    this.stateService.saveSession();
    this.footerService.saveSession();
    this.navbarService.saveSession();

    const payload = {
      siteId: this.siteId,
      pageId: this.pageId,
      state: this.stateService.getState(),
      footer: this.footerService.getState(),
      navbar: this.navbarService.getState()
    }

    this.httpService.post(ENDPOINTS['composerSave'], payload).subscribe((res) => {
      console.log(res);
    });
  }

  public previewPage(){
    this.stateService.saveSession();
    this.footerService.saveSession();
    this.navbarService.saveSession();
    window.open(`${this.currentRoute}/preview`, "_blank");
  }
}
