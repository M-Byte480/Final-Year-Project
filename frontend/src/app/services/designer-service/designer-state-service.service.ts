/*
 * Citation: This file was generated with the help of GitHub Copilot 2024
 */

import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {RootComponent} from "../../shared/data-types";

@Injectable({
  providedIn: 'root'
})
export class DesignerStateServiceService {
  private stateSubject = new BehaviorSubject<RootComponent | null>(null);
  state$ = this.stateSubject.asObservable();

  setState(state: any) {
    console.log('Setting state', state);
    this.stateSubject.next(state);
    console.log('State set', this.stateSubject.getValue());
  }

  getState() {
    return this.stateSubject.getValue();
  }
}
