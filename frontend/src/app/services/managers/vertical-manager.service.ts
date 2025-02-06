import { Injectable } from '@angular/core';
import {DesignerStateServiceService} from "../states/designer-service/designer-state-service.service";
import { COMPOSER_TYPE } from '../../shared/constants';
import {HorizontalManagerService} from "./horizontal-manager.service";

@Injectable({
  providedIn: 'root'
})
export class VerticalManagerService {

  constructor(private stateService: DesignerStateServiceService,
              private horizontalManager: HorizontalManagerService) { }

  public addHorizontalBuilderTop(childGridArr: number[], id: number): void{
    let nextState = this.stateService.getState();
    let max = this.stateService.getMax();
    max++;
    // @ts-ignore
    nextState[max] = {
      id: max,
      name: COMPOSER_TYPE.HORIZONTAL_BUILDER,
      properties: {}
    };


    childGridArr.unshift(max);

    console.log(id)

    // @ts-ignore
    nextState[id].properties.childGridArr = childGridArr;
    console.log(nextState);


    // @ts-ignore
    nextState.maxId = max;

    this.stateService.setState(nextState);
  }

  public addHorizontalBuilderBottom(childGridArr: number[], id: number): void{
    let nextState = this.stateService.getState();
    let max = this.stateService.getMax();
    max++;
    // @ts-ignore
    nextState[max] = {
      id: max,
      name: COMPOSER_TYPE.HORIZONTAL_BUILDER,
      properties: {}
    };

    childGridArr.push(max);

    // @ts-ignore
    nextState[id].properties.childGridArr = childGridArr;
    // @ts-ignore
    nextState.maxId = max;

    this.stateService.setState(nextState);
  }


  public duplicateLastRow(childGridArr: number[], id: number){
    // New node to add
    let nextState = this.stateService.getState();
    let newMax = this.stateService.getMax() + 1;
    let newRow = this.createNewRow();
    newRow.id = newMax;

    const deepCopiedValues = this.horizontalManager.deepCopy(childGridArr[childGridArr.length-1], newMax);
    // @ts-ignore
    newRow.properties.childGridArr = deepCopiedValues.nodeIds;
    // @ts-ignore
    nextState[newMax] = newRow;
    console.log(nextState);
    newMax = deepCopiedValues.newMax;

    // Update current node
    // @ts-ignore
    let thisNode = nextState[id];
    thisNode.properties.childGridArr = thisNode.properties.childGridArr.concat(newRow.id);

    // @ts-ignore
    nextState[id] = thisNode;

    // Transfer properties
    let newNodes = deepCopiedValues.newNodes;
    newNodes.forEach((node) => {
      // @ts-ignore
      nextState[node.id] = node;
    });

    // @ts-ignore
    nextState.maxId = newMax;

    this.stateService.setState(nextState);

  }

  private createNewRow(){
    return {
      id: -1,
      name: COMPOSER_TYPE.HORIZONTAL_BUILDER,
      properties: {
        noElements: 0,
        childGridArr: []
      }
    }
  }
}
