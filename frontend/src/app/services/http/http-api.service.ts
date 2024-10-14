import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {REQUEST_TYPES} from "../../shared/constants";
import {Observable} from "rxjs";
import {Endpoints} from "../../shared/data-types";

@Injectable({
  providedIn: 'root'
})
export class HttpApiService {

  private url = "'http://localhost:8080"
  private endPoints: Endpoints = {
    registerUser: {
      endpoint: "/auth/register",
      requestType: REQUEST_TYPES.POST
    },
    sendVerificationEmail: {
      endpoint: "/auth/email",
      requestType: REQUEST_TYPES.POST
    }
  }

  constructor(private http: HttpClient) {
  }

  public call(data: any): Observable<any> {

  }
}
