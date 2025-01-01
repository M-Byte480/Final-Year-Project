import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cache = new Map<String, any[]>();
  public cache$ = new BehaviorSubject<any[] | null>(null);

  set(key: string, data: any[]){
    if (this.cache.has(key)){
      throw new Error(`Data already exists for key: ${key}`);
    }

    this.cache.set(key, data);
    this.cache$.next(data);
  }

  get(key: string){
    return this.cache.get(key);
  }

  clear(key: string){
    this.cache.delete(key);
    this.cache$.next(null);
  }
}
