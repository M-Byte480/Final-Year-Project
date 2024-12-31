import {Component, EventEmitter, Output} from '@angular/core';
import {PanelComposerComponent} from "../panel-composer/panel-composer.component";
import {SelectionModalComponent} from "./selection-modal/selection-modal.component";
import {NgIf} from "@angular/common";
import {DesignerStateServiceService} from "../../../../services/designer-service/designer-state-service.service";

@Component({
  selector: 'app-content-element',
  standalone: true,
  imports: [
    PanelComposerComponent,
    SelectionModalComponent,
    NgIf
  ],
  templateUrl: './content-element.component.html',
  styleUrl: './content-element.component.css'
})
export class ContentElementComponent {
  @Output() hideModal = new EventEmitter<boolean>();

  protected properties: any = null;
  protected showModal: boolean = false;

  constructor(private designerStateService: DesignerStateServiceService) {
  }

  public showSelectionPopup() {
    this.showModal = !this.showModal;
  }

  protected addElement(element: string) {
    let component = null;
    switch (element) {
      case 'text':
        component = {
          name: 'text',
          properties: {
            text: 'Hello, World!'
          }
        };
        break;
      case 'image':
        component = {
          name: 'image',
          properties: {
            src: 'https://via.placeholder.com/150'
          }
        };
        break;
      case 'grid':
        component = {
          name: 'grid',
          properties: {
            columns: 2,
            rows: 2
          }
        };
        break;
    }
    console.log('Trying to add element', component);
    this.designerStateService.setState(component);
  }

  /*
  protected addElement(element: string, targetRow: number, targetColumn: number) {
  let component = null;
  switch (element) {
    case 'text':
      component = {
        name: 'text',
        properties: { text: 'Hello, World!' },
      };
      break;
    case 'image':
      component = {
        name: 'image',
        properties: { src: 'https://via.placeholder.com/150' },
      };
      break;
    case 'grid':
      component = {
        name: 'grid',
        properties: { columns: 2, rows: 2 },
        children: [], // Add default children as needed
      };
      break;
  }

  if (component) {
    this.designerStateService.updateState((state) => {
      this.addToGridSlot(state, targetRow, targetColumn, component);
    });
  }
}

private addToGridSlot(node: any, targetRow: number, targetColumn: number, component: any) {
  if (node.name === 'grid' && node.children) {
    const slotIndex = this.getSlotIndex(node, targetRow, targetColumn);
    if (slotIndex !== -1 && node.children[slotIndex]?.name === null) {
      // Assign component to the specified slot
      Object.assign(node.children[slotIndex], component);
    }
    return;
  }

  // Recursively check children for nested grids
  if (node.children) {
    for (let child of node.children) {
      this.addToGridSlot(child, targetRow, targetColumn, component);
    }
  }
}

private getSlotIndex(gridNode: any, targetRow: number, targetColumn: number): number {
  const { rows, columns } = gridNode.properties;
  if (!rows || !columns || !gridNode.children) {
    return -1;
  }

  // Convert row-column to a 1D index
  const totalSlots = rows * columns;
  const slotIndex = (targetRow - 1) * columns + (targetColumn - 1);

  return slotIndex >= 0 && slotIndex < totalSlots ? slotIndex : -1;
}
   */
}
