import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubdomainService {

  constructor() { }

  getSubDomain(): string {
    const hostname = window.location.hostname;
    const parts = hostname.split('.');
    if (parts.length > 2) {
      if(parts[0] === "www"){
        return "";
      }
      return parts[0];
    }
    return '';
  }
}
