import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpApiService} from "../../../../../services/http/http-api.service";
import {ENDPOINTS} from "../../../../../services/http/endpoints";
import {HttpParams} from "@angular/common/http";
import {MatButton} from "@angular/material/button";
import {environment} from "../../../../../../environments/environment";

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
  prefix = environment.dev ? 'localhost:4200/' : 'milan-kovacs.ie/';
  domainName = '';
  siteId = '';
  private currentRoute = window.location.href;
  @Output() domainNameUpdate = new EventEmitter<string>();

  domainFormGroup = new FormGroup({
    domainName: new FormControl("",
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern("^[a-zA-Z0-9-]*$"),
      ]),
    siteId: new FormControl(this.siteId)
  });

  constructor(private api: HttpApiService) {
    this.siteId = this.currentRoute.substring(this.currentRoute.lastIndexOf('/') + 1);
    // @ts-ignore
    this.domainFormGroup.get('siteId').setValue(this.siteId);
  }

  ngOnInit() {
    const httpParams = new HttpParams().set('siteId', this.siteId);
    this.api.get(ENDPOINTS['getDomainName'], httpParams).subscribe((response) => {
      // @ts-ignore
      this.domainFormGroup.get('domainName').setValue(response['domainName']);
      this.domainName = response['domainName'] === "" ? "No domain name set" : this.prefix + response['domainName'];
      this.domainUpdateEvent(this.domainName);
    });
  }

  updateSiteName() {
    this.api.post(ENDPOINTS['setDomainName'], this.domainFormGroup.value).subscribe((response) => {
      // @ts-ignore
      this.domainName = this.domainFormGroup.get("domainName")?.value === "" ? "No domain name set" :
        this.prefix + this.domainFormGroup.get("domainName")?.value;
    });
  }

  domainUpdateEvent(name: string) {
    this.domainNameUpdate.emit(name);
  }
}
