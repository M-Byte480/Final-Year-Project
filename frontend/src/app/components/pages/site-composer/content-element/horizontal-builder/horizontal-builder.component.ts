import {AfterViewInit, Component, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {COMPOSER_TYPE} from "../../../../../shared/constants";
import {NgForOf, NgIf} from "@angular/common";
import {ChildComponent} from "../child/child.component";
import {HorizontalManagerService} from "../../../../../services/managers/horizontal-manager.service";
import {MatChip} from "@angular/material/chips";
import {MatButton, MatFabButton, MatMiniFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-horizontal-builder',
  standalone: true,
  imports: [
    NgForOf,
    ChildComponent,
    NgIf,
    MatChip,
    MatButton,
    MatIcon,
    MatMiniFabButton,
    MatFabButton
  ],
  templateUrl: './horizontal-builder.component.html'
})
export class HorizontalBuilderComponent implements OnInit, AfterViewInit {
  @Input() childGridArr: number[] = [];
  @Input() id: number = -1;
  @Input() noElements: number = 0;
  @Input() isPreview: boolean = false;
  @ViewChild('childContainer', { read: ViewContainerRef, static: false })
  childContainer!: ViewContainerRef;
  name = COMPOSER_TYPE.HORIZONTAL_BUILDER;

  constructor(private horizontalManagerService: HorizontalManagerService) {
  }

  ngOnInit(){
  }

  ngAfterViewInit(){
  }

  onAddToLeft(){
    this.horizontalManagerService.addToLeft(this.childGridArr, this.id);
  }

  onAddToRight(){
    this.horizontalManagerService.addToRight(this.childGridArr, this.id);
  }
}
