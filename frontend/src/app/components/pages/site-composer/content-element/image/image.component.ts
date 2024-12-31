import {Component} from '@angular/core';

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [],
  templateUrl: './image.component.html',
  styleUrl: './image.component.css'
})
export class ImageComponent {

  getImage() {
    return "C:\\Users\\kmila\\IdeaProjects\\FinalYearProject\\frontend\\src\\app\\components\\pages\\site-composer\\content-element\\image\\sample.jpg";
  }
}
