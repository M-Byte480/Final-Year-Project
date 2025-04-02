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

    // @ts-ignore
    let verticalBuilder = nextState[1];
    let max = this.stateService.getMax();
    max++;

    // @ts-ignore
    nextState[max] = {
      id: max,
      name: COMPOSER_TYPE.HORIZONTAL_BUILDER,
      properties: {}
    };
    verticalBuilder.properties.childGridArr.unshift(max);


    // @ts-ignore
    nextState.maxId = max;


    this.stateService.setState(nextState);
  }

  public addHorizontalBuilderBottom(childGridArr: number[], id: number): void{
    let nextState = this.stateService.getState();

    // @ts-ignore
    let verticalBuilder = nextState[1];

    let max = this.stateService.getMax();
    max++;
    // @ts-ignore
    nextState[max] = {
      id: max,
      name: COMPOSER_TYPE.HORIZONTAL_BUILDER,
      properties: {}
    };
    verticalBuilder.properties.childGridArr.push(max);

    // @ts-ignore
    nextState.maxId = max;

    this.stateService.setState(nextState);
  }


  public duplicateLastRow(childGridArr: number[], id: number){

    console.log("childGridArr: ", childGridArr);
    console.log("id: ", id);
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
