import { Injectable } from '@angular/core';
import {DesignerStateServiceService} from "../states/designer-service/designer-state-service.service";

@Injectable({
  providedIn: 'root'
})
export class ApiManagerService {

  constructor(private stateService: DesignerStateServiceService) {

  }

  savePage(pageId: string){

  }
}
