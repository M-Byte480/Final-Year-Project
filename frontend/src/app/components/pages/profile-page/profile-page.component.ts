import {Component, OnInit} from '@angular/core';
import {NavigationBarComponent} from "../../shared/navigation-bar/navigation-bar.component";
import {NgOptimizedImage} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {environment} from "../../../../environments/environment";
import {JwtServiceService} from "../../../services/authentication/jwt-service.service";

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    NavigationBarComponent,
    NgOptimizedImage,
    FormsModule
  ],
  templateUrl: './profile-page.component.html'
})
export class ProfilePageComponent implements OnInit{
  user = {
    firstname: "Milan",
    surname: "Kovacs",
    email: "k***@gmail.com",
    phone: "06-30-123-4567",
  }

  constructor(private jwtService: JwtServiceService) {

  }


  ngOnInit(){
    if(!environment.dev){
      this.jwtService.authenticateUser();
    }
  }
}
