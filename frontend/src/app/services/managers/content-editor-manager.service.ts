/*
Help of Copilot
 */

import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {DesignerStateServiceService} from "../states/designer-service/designer-state-service.service";

@Injectable({
  providedIn: 'root'
})
export class ContentEditorManagerService {
  stateSubject = new BehaviorSubject<any>(null);
  id = new BehaviorSubject<number>(-1);
  state$ = this.stateSubject.asObservable();
  id$ = this.id.asObservable();
  constructor(private designerStateService: DesignerStateServiceService) { }


  getState() {
    return this.stateSubject.getValue();
  }

  setState(state: any) {
    this.stateSubject.next({...state});
  }

  getId(){
    return this.id.getValue();
  }

  setId(id: number){
    this.id.next(id);
  }

  getStateForId(id: any){
    id = `${id}`;
    this.setId(id);
    const designerState = this.designerStateService.getState();
    // @ts-ignore
    const component = designerState[id];
    this.setState(component);
  }

  deleteComponent(id: any) {
    id = `${id}`;
    let designerState = this.designerStateService.getState();

    designerState = this.deleteChildren(id, designerState);

    // @ts-ignore
    delete designerState[id];

    this.removeChildReferences(id, designerState);
    this.designerStateService.setState(designerState);
  }

  /**
   * Recursively deletes all children of the given component.
   */
  deleteChildren(parentId: any, state: any) {
    let updatedState = { ...state };

    if (!updatedState[parentId]) return updatedState;

    const children = updatedState[parentId]?.properties?.childGridArr ?? [];

    children.forEach((childId: any) => {
      // Recursively delete children first
      updatedState = this.deleteChildren(childId, updatedState);

      delete updatedState[childId];
    });

    return updatedState;
  }

  /**
   * Removes the reference to the deleted component from any parent component.
   */
  removeChildReferences(idToDelete: any, state: any) {
    Object.keys(state).forEach((componentId) => {
      const component = state[componentId];

      if (component.properties?.childGridArr) {
        component.properties.childGridArr = component.properties.childGridArr.filter(
          (childId: any) => childId !== Number(idToDelete)
        );
        state[componentId].properties.childGridArr = component.properties.childGridArr;
      }
    });
  }


  // deleteComponent(id: any){
  //   id = `${id}`;
  //   let designerState = this.designerStateService.getState();
  //   // Delete the children
  //   designerState = this.deleteChildren(id, designerState);
  //   // @ts-ignore
  //   delete designerState[id];
  //   // The child is deleted, but the parent still has the reference to the child
  //   // @ts-ignore 1 is the root id
  //   this.recursivelyDeleteComponent(1, id, designerState);
  //
  //   this.designerStateService.setState(designerState);
  // }
  //
  // deleteChildren(parentId: any, state: any){
  //   let updatedState = state;
  //   // @ts-ignore
  //   const component = state[parentId];
  //   // @ts-ignore
  //   const children = component.properties.childGridArr;
  //   if(children){
  //     children.forEach((childId: any) => {
  //       updatedState = this.deleteChildren(childId, state);
  //       // @ts-ignore
  //       delete designerState[childId];
  //     });
  //   }
  //
  //   return updatedState;
  // }
  //
  // deleteComponentFromChild(componentId: any, componentToDelete: any, state: any){
  //   let designerState = state;
  //   // @ts-ignore
  //   const component = designerState[componentId];
  //   // @ts-ignore
  //   component.properties.childGridArr = component.properties.childGridArr.filter((childId: any) => childId !== componentToDelete);
  // }
  //
  // recursivelyDeleteComponent(idToCheck: any, idToDelete: any, state: any){
  //   let designerState = state;
  //   // @ts-ignore
  //   const component = designerState[idToCheck];
  //   console.log("Checking", idToCheck, component);
  //   const children = component.properties?.childGridArr ?? [];
  //   if(children){
  //     children.forEach((childId: any) => {
  //       if(childId === idToDelete){
  //         this.deleteComponentFromChild(childId, idToDelete, designerState);
  //       } else{
  //         this.recursivelyDeleteComponent(childId, idToDelete, designerState);
  //       }
  //     });
  //   }
  // }
}
