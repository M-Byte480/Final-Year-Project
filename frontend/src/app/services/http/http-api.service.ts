import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {REQUEST_TYPES} from "../../shared/constants";
import {Observable} from "rxjs";
import {EndpointConfig, Endpoints} from "../../shared/data-types";


@Injectable({
  providedIn: 'root'
})
export class HttpApiService {

  private url = "http://localhost:8080";

  constructor(private http: HttpClient) {
  }

  public call(endpoint: EndpointConfig, payload?: any): Observable<any> {
    switch (endpoint.requestType) {
      case REQUEST_TYPES.POST:
        return this.http.post(this.url + endpoint.endpoint, payload);
      case REQUEST_TYPES.GET:
        if(payload){
          const HEADERS = { 'Content-Type': 'text/plain' }; // Set Content-Type to plain text
          return this.http.get(this.url + endpoint.endpoint, {
            headers: HEADERS,
            params: {
              data: payload
            }
          });
        }
        return this.http.get(this.url + endpoint.endpoint);
      case REQUEST_TYPES.PUT:
        return this.http.put(this.url + endpoint.endpoint, payload);
      case REQUEST_TYPES.DELETE:
        return this.http.delete(this.url + endpoint.endpoint);
    }

    throw new Error("Invalid request type");
  }
}
