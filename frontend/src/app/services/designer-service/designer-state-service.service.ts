/*
 * Citation: This file was generated with the help of GitHub Copilot 2024
 */

import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DesignerStateServiceService {
  private stateSubject = new BehaviorSubject<any>(null);
  state$ = this.stateSubject.asObservable();

  setState(state: any) {
    this.stateSubject.next(state);
  }

  getState() {
    return this.stateSubject.getValue();
  }
}
