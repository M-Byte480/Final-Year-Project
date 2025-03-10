import {Component, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {SubdomainService} from "./services/subdomain.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  subdomain: string = '';

  constructor(private subdomainService: SubdomainService, private router: Router) {
  }

  ngOnInit() {
    this.subdomain = this.subdomainService.getSubDomain();
    this.handleSubdomainLogic();
  }

  handleSubdomainLogic() {
    if (this.subdomain === '') {
      // Handle nothing meaning they came to the root
    } else {
      // So a sub domain was entered so we need to route to the subdomain render page and pull the content from the backend
      this.router.navigate([`/subdomain/${this.subdomain}.milan-kovacs.ie`]);
    }
  }


}

