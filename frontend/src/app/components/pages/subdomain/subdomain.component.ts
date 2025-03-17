import {Component, OnInit} from '@angular/core';
import {SubdomainService} from "../../../services/subdomain.service";

@Component({
  selector: 'app-subdomain',
  standalone: true,
  imports: [],
  templateUrl: './subdomain.component.html'
})
export class SubdomainComponent implements OnInit{
  subdomain: string = '';

  constructor(private subdomainService: SubdomainService) {}

  ngOnInit() {
    this.subdomain = this.subdomainService.getStoredSubdomain();
    this.loadContent();
  }

  loadContent() {
    if (this.subdomain === 'shop') {
      console.log('Load shop content');
    } else if (this.subdomain === 'blog') {
      console.log('Load blog content');
    } else {
      console.log('Load default content');
    }
  }
}
