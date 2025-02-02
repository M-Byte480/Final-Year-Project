import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {NavBarStateStruct} from "../../../shared/data-types";

@Injectable({
  providedIn: 'root'
})
export class NavbarStateService {

  private stateSubject = new BehaviorSubject<NavBarStateStruct | null>({

  });
  state$ = this.stateSubject.asObservable();

  setState(state: any) {
    this.stateSubject.next({...state});
  }

  getState() {
    return this.stateSubject.getValue();
  }
}
