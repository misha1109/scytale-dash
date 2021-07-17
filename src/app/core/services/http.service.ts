import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(
    private http: HttpClient
  ) { }
  get(url, options = {}): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}${url}`, options);
  }
  post(url, payload = {}, options = {}): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}${url}`, payload, options);
  }
}
