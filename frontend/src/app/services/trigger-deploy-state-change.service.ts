import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TriggerDeployStateChangeService {
  stateSubject = new BehaviorSubject<boolean>(false);
  state$ = this.stateSubject.asObservable();
  constructor() { }

  getState() {
    return this.stateSubject.getValue();
  }

  setState(state: boolean) {
    this.stateSubject.next(state);
  }
}
