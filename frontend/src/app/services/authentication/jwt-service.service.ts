import {Injectable} from '@angular/core';
import {LocalStorageManagerService} from "../managers/local-storage-manager.service";
import {JWT} from "../../shared/constants";
import {SessionStorageService} from "../session-storage/session-storage.service";
import {JwtToken} from "../../shared/data-types";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {ENDPOINTS} from "../http/endpoints";

@Injectable({
  providedIn: 'root'
})
export class JwtServiceService {
  public static JWT: JwtToken = {access_token: "", refresh_token: ""};

  constructor(private localStorageMng: LocalStorageManagerService,
              private sessionStorageMgr: SessionStorageService,
              private router: Router,
              private http: HttpClient) {
    // @ts-ignore
    JwtServiceService.JWT[JWT.ACCESS_TOKEN] = this.localStorageMng.getItem(JWT.ACCESS_TOKEN);
    // @ts-ignore
    JwtServiceService.JWT[JWT.REFRESH_TOKEN] = this.sessionStorageMgr.getSessionData(JWT.REFRESH_TOKEN);
  }

  getToken() {
    // @ts-ignore
    return JwtServiceService.JWT[JWT.ACCESS_TOKEN];
  }

  validateTokenExists(): boolean {
    return JwtServiceService.JWT !== null;
  }

  authenticateUser() {

    if (JwtServiceService.JWT === null || JwtServiceService.JWT === undefined) {
      this.router.navigate(['login']).then();
    }
  }

  save(jwt: JwtToken) {
    this.saveToken(jwt);
    this.saveRefreshToken(jwt);
    JwtServiceService.JWT = jwt;
  }

  saveToken(jwt: JwtToken) {
    // @ts-ignore
    this.localStorageMng.setItem(JWT.ACCESS_TOKEN, jwt[JWT.ACCESS_TOKEN]);
    // @ts-ignore
    JwtServiceService[JWT.ACCESS_TOKEN] = jwt[JWT.ACCESS_TOKEN];
  }

  saveRefreshToken(jwt: JwtToken) {
    // @ts-ignore
    this.sessionStorageMgr.setSessionData(JWT.REFRESH_TOKEN, jwt[JWT.REFRESH_TOKEN]);
    // @ts-ignore
    JwtServiceService[JWT.REFRESH_TOKEN] = jwt[JWT.REFRESH_TOKEN];
  }

  // refreshToken(): Observable<any> {
  // return this.http.post(ENDPOINTS['refreshToken'].endpoint, {
  //   refresh_token: JwtServiceService.JWT.refresh_token
  // }).pipe(
  //   tap((tokens: any) => {
  //     JwtServiceService.JWT = tokens;
  //     localStorage.setItem('access_token', tokens.access_token);
  //     sessionStorage.setItem('refresh_token', tokens.refresh_token);
  //   })
  // );
  // }

  logout() {
    localStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
    JwtServiceService.JWT = {access_token: "", refresh_token: ""};
    this.router.navigate(['login']).then();
  }

}
