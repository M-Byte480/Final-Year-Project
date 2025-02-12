import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {REQUEST_TYPES} from "../../shared/constants";
import {Observable} from "rxjs";
import {EndpointConfig, Endpoints} from "../../shared/data-types";
import {environment} from "../../../environments/environment";
import {JwtServiceService} from "../authentication/jwt-service.service";


@Injectable({
  providedIn: 'root'
})
export class HttpApiService {

  private url = environment.apiUrl;

  constructor(private http: HttpClient,
              private jwtService: JwtServiceService) {
  }

  public call(endpoint: EndpointConfig, payload?: any): Observable<any> {

    let HEADERS = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtService.getToken()}`
    });
    switch (endpoint.requestType) {
      case REQUEST_TYPES.POST:
        return this.http.post(this.url + endpoint.endpoint, payload);
      case REQUEST_TYPES.GET:
        if(payload){
          HEADERS.set('Content-Type', 'application/json');

          return this.http.get(this.url + endpoint.endpoint, {
            headers: HEADERS,
            params: {
              data: payload
            }
          });
        }
        return this.http.get(this.url + endpoint.endpoint, {
          headers: HEADERS
        });
      case REQUEST_TYPES.PUT:
        return this.http.put(this.url + endpoint.endpoint, payload);
      case REQUEST_TYPES.DELETE:
        return this.http.delete(this.url + endpoint.endpoint);
    }

    throw new Error("Invalid request type");
  }
}
