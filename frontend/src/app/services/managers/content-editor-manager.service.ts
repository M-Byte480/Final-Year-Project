import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {DesignerStateServiceService} from "../states/designer-service/designer-state-service.service";

@Injectable({
  providedIn: 'root'
})
export class ContentEditorManagerService {
  stateSubject = new BehaviorSubject<any>(null);
  state$ = this.stateSubject.asObservable();

  constructor(private designerStateService: DesignerStateServiceService) { }


  getState() {
    return this.stateSubject.getValue();
  }

  setState(state: any) {
    this.stateSubject.next({...state});
  }

  getStateForId(id: any){
    id = `${id}`;
    const designerState = this.designerStateService.getState();
    // @ts-ignore
    const component = designerState[id];
    this.setState(component);
  }
}
