import { Injectable } from '@angular/core';
import {DesignerStateServiceService} from "../states/designer-service/designer-state-service.service";
import {ComponentFactoryService} from "../component-factory/component-factory.service";
import {COMPOSER_TYPE} from "../../shared/constants";

@Injectable({
  providedIn: 'root'
})
export class GridManagerService {
  constructor(private designerService: DesignerStateServiceService,
              private componentFactory: ComponentFactoryService) { }

  // Not my proudest work
  public addRowTop(grid: any){
    grid.properties.rows = grid.properties.rows+1;
    let currentState = this.designerService.getState();
    // @ts-ignore
    let max = currentState.maxId;
    console.log("max", max);
    const columns = grid.properties.columns;
    let newChildren = [];
    for (let i = 0; i < columns; i++) {
      console.log("max in loop", max);
      newChildren.push(max);
      const newGrid = {
        id: max,
        name: COMPOSER_TYPE.GRID,
        properties: {
          rows: 1,
          columns: 1,
          children: [max+1]
        }
      };
      // @ts-ignore
      currentState[max] = newGrid;
      max++;
      // @ts-ignore
      currentState[max] = {
        id: max,
        name: COMPOSER_TYPE.BUILDER,
        properties: {}
      };
    }

    console.log(max);
    grid.properties.children = newChildren.concat(grid.properties.children);
    // @ts-ignore
    currentState.maxId = max;
    this.designerService.setState(currentState);
  }

  public addRowBottom(grid: any){
    grid.properties.rows = grid.properties.rows+1;
    let currentState = this.designerService.getState();
    // @ts-ignore
    let max = currentState.maxId;
    const columns = grid.properties.columns;
    let newChildren = [];
    for (let i = 0; i < columns; i++) {
      max++;
      newChildren.push(max);
      const newGrid = {
        id: max,
        name: COMPOSER_TYPE.GRID,
        properties: {
          rows: 1,
          columns: 1,
          children: [max+1]
        }
      };
      // @ts-ignore
      currentState[max] = newGrid;
      max++;
      // @ts-ignore
      currentState[max] = {
        id: max,
        name: COMPOSER_TYPE.BUILDER,
        properties: {}
      };
    }

    console.log(max);
    grid.properties.children = grid.properties.children.concat(newChildren);
    // @ts-ignore
    currentState.maxId = max;
    this.designerService.setState(currentState);
  }

  public addColumnLeft(grid: any){
    grid.properties.columns++;
    let max = this.designerService.getMax();
    let currentState = this.designerService.getState();
    const rows = grid.properties.rows;
    let newChildren = [];
    for (let i = 0; i < rows; i++){
      max++;
      newChildren.push(max);
      const newGrid = {
        id: max,
        name: COMPOSER_TYPE.GRID,
        properties: {
          rows: 1,
          columns: 1,
          children: [max+1]
        }
      };
      // @ts-ignore
      currentState[max] = newGrid;
      max++;
      // @ts-ignore
      currentState[max] = {
        id: max,
        name: COMPOSER_TYPE.BUILDER,
        properties: {}
      };
    }

    let children = grid.properties.children;
    let newChildrenIndex = 0;
    for (let i = 0; i < children.length; i+=grid.properties.columns){
      children.splice(i, 0, newChildren[newChildrenIndex]);
      newChildrenIndex++;
    }

    grid.children = children;

    this.designerService.setState(currentState);
  }
  public addColumnRight(grid: any){
    grid.columns++;
    let max = this.designerService.getMax();
    let currentState = this.designerService.getState();
    const rows = grid.rows;
    let newChildren = [];
    for (let i = 0; i < rows; i++) {
      newChildren.push(max + 1);
      // @ts-ignore
      currentState[max+1] = {
        id: max+1,
        name: COMPOSER_TYPE.BUILDER,
        properties: {}
      };
      max++;
    }

    let children = grid.children;
    let newChildrenIndex = 0;
    for (let i = grid.columns; i < children.length; i+=grid.columns){
      children.splice(i, 0, newChildren[newChildrenIndex]);
      newChildrenIndex++;
    }

    grid.children = children;

    this.designerService.setState(currentState);
  }
}
