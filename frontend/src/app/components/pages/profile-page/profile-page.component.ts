import { Component } from '@angular/core';
import {NavigationBarComponent} from "../../shared/navigation-bar/navigation-bar.component";
import {NgOptimizedImage} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    NavigationBarComponent,
    NgOptimizedImage,
    FormsModule
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent {
  user = {
    firstname: "Milan",
    surname: "Kovacs",
    email: "k***@gmail.com",
    phone: "06-30-123-4567",
  }
}
