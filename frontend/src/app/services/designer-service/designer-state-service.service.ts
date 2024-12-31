/*
 * Citation: This file was generated with the help of GitHub Copilot 2024
 */

import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DesignerStateServiceService {
  private stateSubject = new BehaviorSubject<Object>({
    name: 'content-element',
    properties: {children: []},
  });

  setState(state: any) {
    console.log("Hook state updated", state);
    this.stateSubject.next(state);
  }

  getState() {
    return this.stateSubject.asObservable();
  }
}
