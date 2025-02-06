/*
Made with the help of ChatGpt
 */

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  setSessionData(key: string, value: any): void{
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  getSessionData(key: string): any{
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  removeSessionData(key: string): void{
    sessionStorage.removeItem(key);
  }

  clearSession(): void{
    sessionStorage.clear();
  }

}
