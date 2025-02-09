import {EventEmitter, Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SelectorModalService {
  displayState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  displayState$ = this.displayState.asObservable();
  id: number = 0;

  constructor() { }

  public setDisplayState(state: boolean): void{
    this.displayState.next(state);
  }

  public setId(id: number): void{
    this.id = id;
  }

  public getId(): number{
    return this.id;
  }

  public getDisplayState(): boolean{
    return this.displayState.getValue();
  }
}
