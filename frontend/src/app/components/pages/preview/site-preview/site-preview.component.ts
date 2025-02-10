import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {JwtServiceService} from "../../../../services/authentication/jwt-service.service";

@Component({
  selector: 'app-site-preview',
  standalone: true,
  imports: [],
  templateUrl: './site-preview.component.html'
})
export class SitePreviewComponent implements OnInit{
  constructor(private jwtService: JwtServiceService) {
  }

  ngOnInit() {
    if(!environment.dev){
      this.jwtService.authenticateUser();
    }
  }
}
