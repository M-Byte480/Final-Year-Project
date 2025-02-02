import { Injectable } from '@angular/core';
import {DesignerStateServiceService} from "../designer-service/designer-state-service.service";

@Injectable({
  providedIn: 'root'
})
export class SiteStateManagerService {



  constructor(private designerStateService: DesignerStateServiceService) { }

  public addNewComponent(component: any) {
    let newState = this.designerStateService.getState();
    const maxId = newState!.maxId + 1;
    /*
          const defaultState = {
        1: { id: 1, name: 'grid', properties: { rows: 2, columns: 2, children: [2,3,4,5] } },
        2: { id: 2, name: 'builder', properties: {  } },
        3: { id: 3, name: 'builder', properties: {  } },
        4: { id: 4, name: 'builder', properties: {  } },
        5: { id: 5, name: 'builder', properties: {  } },
        root: 1,
      };
     */

    // @ts-ignore
    newState![maxId] = { id: maxId, name: component.name, properties: component.properties };
    newState!.maxId = maxId;
    this.designerStateService.setState(newState);
  }

  public replaceElement(elementId: number, newElementName: string){
    let newState = this.designerStateService.getState();
    // @ts-ignore
    newState![elementId].name = newElementName;
    this.designerStateService.setState(newState);
  }

  public removeComponent(componentId: number) {
    let newState = this.designerStateService.getState();
    // @ts-ignore
    delete newState![componentId];
    this.designerStateService.setState(newState);
  }
}
