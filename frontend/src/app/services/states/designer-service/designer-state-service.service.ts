/*
 * Citation: This file was generated with the help ChatGPT 2024
 */

import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {RootComponent} from "../../../shared/data-types";
import {SessionStorageService} from "../../session-storage/session-storage.service";
import {SESSION_STORAGE} from "../../../shared/constants";

@Injectable({
  providedIn: 'root'
})
export class DesignerStateServiceService {
  public static readonly DEFAULT_STATE = {
    // @ts-ignore
    1: {id: 1, name: 'vertical-builder', properties: {noElements: 1, childGridArr: [2]}},
    2: {id: 2, name: 'horizontal-builder', properties: {}},
    root: 1,
    maxId: 3
  };

  private stateSubject = new BehaviorSubject<RootComponent | null>({
    // @ts-ignore
    1: {id: 1, name: 'vertical-builder', properties: {noElements: 1, childGridArr: [2]}},
    2: {id: 2, name: 'horizontal-builder', properties: {}},
    root: 1,
    maxId: 3
  });
  state$ = this.stateSubject.asObservable();

  constructor(private sessionManager: SessionStorageService){
    const session = this.sessionManager.getSessionData(SESSION_STORAGE.PAGE);
    if (session) {
      this.stateSubject.next(session);
    }
  }

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

  saveSession(){
    this.sessionManager.setSessionData(SESSION_STORAGE.PAGE, this.stateSubject.getValue());
  }

  getSession(){
    return this.sessionManager.getSessionData(SESSION_STORAGE.PAGE);
  }
}
