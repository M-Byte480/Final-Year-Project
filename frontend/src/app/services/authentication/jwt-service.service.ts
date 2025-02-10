import { Injectable } from '@angular/core';
import {LocalStorageManagerService} from "../managers/local-storage-manager.service";
import {JWT} from "../../shared/constants";
import {SessionStorageService} from "../session-storage/session-storage.service";
import {JwtToken} from "../../shared/data-types";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class JwtServiceService {
  public static JWT: null | JwtToken = null;

  constructor(private localStorageMng: LocalStorageManagerService,
              private sessionStorageMgr: SessionStorageService,
              private router: Router) { }

  validateTokenExists(): boolean {
    return JwtServiceService.JWT !== null;
  }

  authenticateUser(){
    if(JwtServiceService.JWT !== null){
      this.router.navigate(['auth/login']).then();
    }
  }

  save(jwt: JwtToken){
    this.saveToken(jwt);
    this.saveRefreshToken(jwt);
    JwtServiceService.JWT=jwt;
  }

  saveToken(jwt: JwtToken){
    this.localStorageMng.setItem(JWT.ACCESS_TOKEN, jwt.access_token);
    // @ts-ignore
    JwtServiceService[JWT.ACCESS_TOKEN] = jwt.access_token;
  }

  saveRefreshToken(jwt: JwtToken){
    this.sessionStorageMgr.setSessionData(JWT.REFRESH_TOKEN, jwt.refresh_token);
    // @ts-ignore
    JwtServiceService[JWT.REFRESH_TOKEN] = jwt.refresh_token;
  }


}
