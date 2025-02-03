/*
 * Citation: This file was generated with the help of GitHub Copilot 2024
 */

import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {RootComponent} from "../../../shared/data-types";

@Injectable({
  providedIn: 'root'
})
export class DesignerStateServiceService {
  private stateSubject = new BehaviorSubject<RootComponent | null>({
    // @ts-ignore
    1: { id: 1, name: 'grid', properties: { rows: 2, columns: 2, children: [2,3,4,5] } },
    2: { id: 2, name: 'builder', properties: {  } },
    3: { id: 3, name: 'builder', properties: {  } },
    4: { id: 4, name: 'builder', properties: {  } },
    5: { id: 5, name: 'builder', properties: {  } },
    root: 1,
    maxId: 5
  });
  state$ = this.stateSubject.asObservable();

  setState(state: any) {
    this.stateSubject.next({...state});
  }

  getState() {
    return this.stateSubject.getValue();
  }
}
