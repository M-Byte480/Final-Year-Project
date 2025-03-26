import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ObjectAssignerManagerService {

  constructor() { }

  public assignRenderObject(
    componentRef: any,
    componentDetails: any,
    isPreview: boolean
  ){
    Object.assign(componentRef.instance, {
      ...componentDetails.properties,
      id: componentDetails.id,
      properties: componentDetails.properties,
      isPreview: isPreview
    });
  }
}
