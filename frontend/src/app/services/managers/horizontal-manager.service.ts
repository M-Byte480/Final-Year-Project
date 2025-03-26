import {Injectable} from '@angular/core';
import {DesignerStateServiceService} from "../states/designer-service/designer-state-service.service";

@Injectable({
  providedIn: 'root'
})
export class HorizontalManagerService {

  constructor(
    private stateService: DesignerStateServiceService
  ) { }

  public addToLeft(childGridArr: number[], id: number): void{
    let nextState = this.stateService.getState();
    let max = this.stateService.getMax();
    max++;
    // @ts-ignore
    nextState[max] = {
      id: max,
      name: 'builder',
      properties: {}
    };

    childGridArr.unshift(max);

    // @ts-ignore
    nextState[id].properties.childGridArr = childGridArr;
    // @ts-ignore
    nextState[id].properties.noElements = childGridArr.length;
    // @ts-ignore
    nextState.maxId = max;

    this.stateService.setState(nextState);
  }

  public addToRight(childGridArr: number[], id: number): void{
    let nextState = this.stateService.getState();
    let max = this.stateService.getMax();
    max++;
    // @ts-ignore
    nextState[max] = {
      id: max,
      name: 'builder',
      properties: {}
    };

    childGridArr.push(max);

    // @ts-ignore
    nextState[id].properties.childGridArr = childGridArr ;
    // @ts-ignore
    nextState[id].properties.noElements = childGridArr.length;
    // @ts-ignore
    nextState.maxId = max;

    this.stateService.setState(nextState);
  }

  public deepCopy(id: number, max: number){
    const currentState = this.stateService.getState();

    // What we deep copy
    // @ts-ignore
    const node = currentState[id];
    const childElements = node.properties.childGridArr || [];
    let nodeIds = [];
    let nodesToReturn = [];


    // Deep copy the children
    for (let elementId of childElements){
      max++;
      let node = {
        id: max,
        // @ts-ignore
        name: currentState[elementId].name,
        // @ts-ignore
        properties: currentState[elementId].properties
      };
      nodeIds.push(max);
      nodesToReturn.push(node);
    }

    return {
      newNodes: nodesToReturn,
      nodeIds: nodeIds,
      newMax: max
    }

  }
}
