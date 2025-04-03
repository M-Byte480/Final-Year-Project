import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {REQUEST_TYPES} from "../../shared/constants";
import {Observable} from "rxjs";
import {EndpointConfig, Endpoints} from "../../shared/data-types";
import {environment} from "../../../environments/environment";
import {JwtServiceService} from "../authentication/jwt-service.service";
import {ENDPOINTS} from "./endpoints";
import {RequestParameter} from "@angular/cli/src/analytics/analytics-parameters";


@Injectable({
  providedIn: 'root'
})
export class HttpApiService {

  private url = environment.apiUrl;

  constructor(private http: HttpClient,
              private jwtService: JwtServiceService) {
  }

  public get(endPoint: EndpointConfig, params?: HttpParams): Observable<any> {
    let HEADERS = new HttpHeaders();
    HEADERS = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtService.getToken()}`
    });

    return this.http.get(this.url + endPoint.endpoint, { headers: HEADERS, params });
  }

  public getNoAuth(endPoint: EndpointConfig, params?: HttpParams): Observable<any> {
    return this.http.get(this.url + endPoint.endpoint, { params });
  }

  public postNoAuth(endPoint: EndpointConfig, payload?: any): Observable<any> {
    let HEADERS = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.url + endPoint.endpoint, payload, { headers: HEADERS });
  }

  public post(endPoint: EndpointConfig, payload?: any): Observable<any> {
    let HEADERS = new HttpHeaders();
    HEADERS = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtService.getToken()}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(this.url + endPoint.endpoint, payload, { headers: HEADERS });
  }

  public uploadImage(endPoint: EndpointConfig, formData: FormData): Observable<any> {
    let HEADERS;
    HEADERS = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtService.getToken()}`
    });
    return this.http.post(this.url + endPoint.endpoint, formData, { headers: HEADERS });
  }

  // TODO: ADD HANDLING OF EXPIRED JWT
  public call(endpoint: EndpointConfig, payload?: any, params?: HttpParams): Observable<any> {
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
          break;
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
