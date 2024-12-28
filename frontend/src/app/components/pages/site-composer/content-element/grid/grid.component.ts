import {Component, Input} from '@angular/core';
import {ButtonComponent} from "../button/button.component";
import {ImageComponent} from "../image/image.component";
import {TextComponent} from "../text/text.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})
export class GridComponent {
  @Input() children: any[] = [];

  // childComponent(node: any) {
  //   const componentMap = {
  //     text: TextComponent,
  //     image: ImageComponent,
  //     button: ButtonComponent,
  //     grid: GridComponent,
  //   };
  //
  //   return {
  //     component: componentMap[node.name],
  //     inputs: {
  //       props: node.props,
  //       children: node.children || [],
  //     },
  //   };
  // }
}
