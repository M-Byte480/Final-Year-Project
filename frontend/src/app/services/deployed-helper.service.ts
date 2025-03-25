import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeployedHelperService {
  private static deployedState = false;
  constructor() { }

  public setDeployedState(state: boolean) {
    DeployedHelperService.deployedState = state;
  }

  public getDeployedState() {
    return DeployedHelperService.deployedState;
  }
}
