import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ROLES} from '../../../config/auth';
import {HttpService} from './http.service';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user$ = new BehaviorSubject<any>(false);
  private isAdmin$ = new BehaviorSubject<any>(false);
  constructor(
    private httpService: HttpService,
    private router: Router
  ) {
    this.user$
      .subscribe(user => this.isAdmin$.next(user?.role === ROLES.ADMIN));
  }

  getUser$(): Observable<any> {
    return this.user$.asObservable();
  }
  setUser(user): void {
    this.user$.next(user);
  }
  getIsAdmin$(): Observable<boolean> {
    return this.isAdmin$.asObservable();
  }
  login(credentials: any): Observable<any> {
    return this.httpService
      .post('login', credentials)
      .pipe(
        map(
          res => {
            const user = res.data;
            this.setUser(user);
            this.user$.next(user);
            return user;
          },
        )
      );
  }
  logout(): void {
    this.httpService
      .get('logout')
      .subscribe(res => {
        this.user$.next(undefined);
        this.router.navigateByUrl('/login');
      });
  }
}
