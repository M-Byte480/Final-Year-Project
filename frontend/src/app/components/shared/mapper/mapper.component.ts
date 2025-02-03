/*
This file was generated with the help of GitHub Copilot 2025
 */

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
export class MapperComponent implements OnInit{
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

    console.log(this.options);
  }

  updateMappedObjects() {
    this.mappedObjectsChange.emit(this.mappedObjects);
  }

  onDelete(item: any) {
    this.mappedObjects = this.mappedObjects.filter((obj: any) => obj[this.col1key] !== item[this.col1key]);
    this.dataSource = new MatTableDataSource<any>(this.mappedObjects);
    this.updateMappedObjects();
  }

  onAddEmptyRow(){
    this.mappedObjects.push({[this.col1key]: 'test', [this.col2key]: 'test'});
    this.dataSource = new MatTableDataSource<any>(this.mappedObjects);
    this.updateMappedObjects();
  }
}
