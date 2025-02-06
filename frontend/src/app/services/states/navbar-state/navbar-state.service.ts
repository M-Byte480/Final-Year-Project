import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {NavBarStateStruct} from "../../../shared/data-types";
import {SessionStorageService} from "../../session-storage/session-storage.service";
import {SESSION_STORAGE} from "../../../shared/constants";

@Injectable({
  providedIn: 'root'
})
export class NavbarStateService {

  private stateSubject = new BehaviorSubject<NavBarStateStruct>({
    routes: [
      {
        displayName: 'Home',
        pageName: 'Home'
      },
    ],
    logo: '',
    brandName: 'Johnny Bai',
  });
  state$ = this.stateSubject.asObservable();

  constructor(private sessionManager: SessionStorageService) {
    const session = this.sessionManager.getSessionData(SESSION_STORAGE.NAVBAR);
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
    this.sessionManager.setSessionData(SESSION_STORAGE.NAVBAR, this.stateSubject.getValue());
  }

  getSession(){
    return this.sessionManager.getSessionData(SESSION_STORAGE.NAVBAR);
  }
}
