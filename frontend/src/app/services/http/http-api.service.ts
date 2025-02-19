import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {REQUEST_TYPES} from "../../shared/constants";
import {Observable} from "rxjs";
import {EndpointConfig, Endpoints} from "../../shared/data-types";
import {environment} from "../../../environments/environment";
import {JwtServiceService} from "../authentication/jwt-service.service";
import {ENDPOINTS} from "./endpoints";


@Injectable({
  providedIn: 'root'
})
export class HttpApiService {

  private url = environment.apiUrl;

  constructor(private http: HttpClient,
              private jwtService: JwtServiceService) {
  }

  // TODO: ADD HANDLING OF EXPIRED JWT
  public call(endpoint: EndpointConfig, payload?: any): Observable<any> {
    let HEADERS = new HttpHeaders();
    if(endpoint !== ENDPOINTS['loginUser']) {
      HEADERS = new HttpHeaders({
        'Authorization': `Bearer ${this.jwtService.getToken()}`
      });
    }
    let response: Observable<any>;

    switch (endpoint.requestType) {
      case REQUEST_TYPES.POST:
        HEADERS.set('Content-Type', 'application/json');
        response = this.http.post(this.url + endpoint.endpoint, payload,
          {
            headers: HEADERS,
            params: {
              data: payload
            }
          });
        break;
      case REQUEST_TYPES.GET:
        if(payload){
          HEADERS.set('Content-Type', 'application/json');

          response = this.http.get(this.url + endpoint.endpoint, {
            headers: HEADERS,
            params: {
              data: payload
            }
          });
        }
        response = this.http.get(this.url + endpoint.endpoint, {
          headers: HEADERS
        });
        break;
      case REQUEST_TYPES.PUT:
        response = this.http.put(this.url + endpoint.endpoint, payload);
        break;
      case REQUEST_TYPES.DELETE:
        response = this.http.delete(this.url + endpoint.endpoint);
        break;
    }

    // check if response is 403:
    // @ts-ignore
    return response;
  }
}
