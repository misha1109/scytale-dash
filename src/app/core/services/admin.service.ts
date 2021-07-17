import { Injectable } from '@angular/core';
import {HttpService} from './http.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private httpService: HttpService
  ) { }
  setMfaState(state): Observable<any> {
    return this.httpService
      .post('users/mfa', {setMfa: state})
  }
}
