/*
This file was generated with the help of GitHub Copilot 2025
 */

import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from "@angular/material/table";
import {NgForOf, TitleCasePipe} from "@angular/common";
import {MatFormField, MatFormFieldModule } from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInput, MatInputModule } from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";

@Component({
  selector: 'app-mapper',
  standalone: true,
  imports: [
    MatButton,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    TitleCasePipe,
    MatHeaderCellDef,
    MatFormField,
    FormsModule,
    MatInput,
    MatSelect,
    MatOption,
    NgForOf,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './mapper.component.html',
  styleUrl: './mapper.component.css'
})
export class MapperComponent implements OnInit, AfterViewInit{
  @Input() mappedObjects: any;
  @Input() col1!: string;
  @Input() col1key!: string;
  @Input() col2!: string;
  @Input() col2key!: string;
  @Input() options!: any[];
  @Input() reversed: boolean = false;
  @Input() dropdownName: string = 'Select';
  @Output() mappedObjectsChange = new EventEmitter<any>();
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [];

  ngOnInit(){
    this.displayedColumns = [this.col1key, this.col2key, 'action'];
    this.dataSource = new MatTableDataSource<any>(this.mappedObjects);

  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.mappedObjects.push("DUMMY NODE");
      this.onDelete(this.mappedObjects[this.mappedObjects.length - 1]);
    }, 400);
  }

  updateMappedObjects() {
    this.mappedObjectsChange.emit(this.mappedObjects);
  }

  onDelete(item: any) {
    const index = this.mappedObjects.findIndex((obj: any) =>
      obj[this.col1key] === item[this.col1key] &&
      obj[this.col2key] === item[this.col2key]
    );

    if (index !== -1) {
      this.mappedObjects.splice(index, 1);
    }

    this.dataSource = new MatTableDataSource<any>(this.mappedObjects);
    this.updateMappedObjects();
  }

  generateRandomId(){
    return Math.random().toString(36).substring(7);
  }

  onAddEmptyRow(){
    if(this.col2key === 'socialMedia'){
      this.mappedObjects.push({[this.col1key]: '', [this.col2key]: 'linkedin', id: this.generateRandomId()});
    } else {
      this.mappedObjects.push({[this.col1key]: '', [this.col2key]: '', id: this.generateRandomId()});
    }
    this.dataSource = new MatTableDataSource<any>(this.mappedObjects);
    this.updateMappedObjects();
  }

  trackById(index: number, item: any){
    return item.id;
  }

}
