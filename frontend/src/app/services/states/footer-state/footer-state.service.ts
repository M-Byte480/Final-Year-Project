import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {FooterStateStruct} from "../../../shared/data-types";
import {SessionStorageService} from "../../session-storage/session-storage.service";
import {SESSION_STORAGE} from "../../../shared/constants";

@Injectable({
  providedIn: 'root'
})
export class FooterStateService {

  private stateSubject = new BehaviorSubject<FooterStateStruct>({
    links: [],
    properties: {}
  });
  state$ = this.stateSubject.asObservable();

  constructor(private sessionManager: SessionStorageService) {
    const session = this.sessionManager.getSessionData(SESSION_STORAGE.FOOTER);
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

  saveSession(){
    this.sessionManager.setSessionData(SESSION_STORAGE.FOOTER, this.stateSubject.getValue());
  }

  getSession(){
    return this.sessionManager.getSessionData(SESSION_STORAGE.FOOTER);
  }
}
