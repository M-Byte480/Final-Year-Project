import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {NavBarStateStruct} from "../../../shared/data-types";

@Injectable({
  providedIn: 'root'
})
export class NavbarStateService {

  private stateSubject = new BehaviorSubject<NavBarStateStruct>({
    routes: [
      {
        displayName: 'Home',
        pageName: 'Home'
      },
    ],
    logo: '',
    brandName: 'Johnny Bai',
  });
  state$ = this.stateSubject.asObservable();

  setState(state: any) {
    this.stateSubject.next({...state});
  }

  getState() {
    return this.stateSubject.getValue();
  }
}
