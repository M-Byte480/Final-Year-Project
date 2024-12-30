import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RouterDataTransferService {
  private object = new BehaviorSubject({});
  state$ = this.object.asObservable();

  setState(state: any) {
    this.object.next(state);
  }

  getState() {
    return this.object.getValue();
  }
}
