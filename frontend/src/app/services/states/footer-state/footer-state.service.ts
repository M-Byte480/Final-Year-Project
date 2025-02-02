import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {FooterStateStruct} from "../../../shared/data-types";

@Injectable({
  providedIn: 'root'
})
export class FooterStateService {

  private stateSubject = new BehaviorSubject<FooterStateStruct | null>({

  });
  state$ = this.stateSubject.asObservable();

  setState(state: any) {
    this.stateSubject.next({...state});
  }

  getState() {
    return this.stateSubject.getValue();
  }
}
