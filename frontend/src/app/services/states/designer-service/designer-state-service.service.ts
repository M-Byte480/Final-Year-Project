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
    1: {id: 1, name: 'vertical-builder', properties: {noElements: 1, childGridArr: [2, 3]}},
    2: {id: 2, name: 'horizontal-builder', properties: {}},
    3: {id: 3, name: 'horizontal-builder', properties: {childGridArr: [4]}},
    4: {id: 4, name: 'spacer', properties: {width: '32', height: '32'}},
    root: 1,
    maxId: 4
  });
  state$ = this.stateSubject.asObservable();

  setState(state: any) {
    this.stateSubject.next({...state});
  }

  getState() {
    return this.stateSubject.getValue();
  }

  getMax(){
    // @ts-ignore
    return this.stateSubject.getValue().maxId;
  }
}
