import { Injectable } from '@angular/core';
import {DeployedSiteState} from "../shared/data-types";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DeployedStorageService {
  private stateSubject = new BehaviorSubject<DeployedSiteState | null>(null);
  state$ = this.stateSubject.asObservable();

  constructor() { }

  setState(state: DeployedSiteState) {
    this.stateSubject.next({...state});
  }

  getState() {
    return this.stateSubject.getValue();
  }
}
