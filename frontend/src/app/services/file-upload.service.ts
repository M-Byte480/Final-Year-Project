import { Injectable } from '@angular/core';
import {HttpApiService} from "./http/http-api.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private apiService: HttpApiService) { }

}
