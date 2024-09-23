import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RouterDataTransferService {
  private object = new BehaviorSubject({});
  getObject = this.object.asObservable();

  constructor() {
  }

  setObject(object: any) {
    this.object.next(object);
  }
}
