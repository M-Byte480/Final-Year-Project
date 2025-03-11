import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpApiService} from "../../../../../services/http/http-api.service";
import {ENDPOINTS} from "../../../../../services/http/endpoints";
import {HttpParams} from "@angular/common/http";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-domain-manager',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButton
  ],
  templateUrl: './domain-manager.component.html'
})
export class DomainManagerComponent implements OnInit {
  protected domainName = '';
  protected siteId = '';
  private currentRoute = window.location.href;

  domainFormGroup = new FormGroup({
    domainName: new FormControl("",
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern("^[a-zA-Z0-9]*$"),
      ]),
  });

  constructor(private api: HttpApiService) {
    this.siteId = this.currentRoute.substring(this.currentRoute.lastIndexOf('/') + 1);

  }

  ngOnInit() {
    const httpParams = new HttpParams().set('siteId', this.siteId);
    this.api.get(ENDPOINTS['getDomainName'], httpParams).subscribe((response) => {
      this.domainName = response['domainName'];
    });
  }

  updateSiteName() {
    console.log("Test");
    console.log(this.domainFormGroup.value);
    this.api.post(ENDPOINTS['setDomainName'], this.domainFormGroup.value).subscribe((response) => {
      console.log(response);
    });
  }
}
