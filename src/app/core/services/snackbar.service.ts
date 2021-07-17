import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private snackMessage$ = new BehaviorSubject<string>(undefined);

  constructor() { }
  setSnackbarMessage(message): void {
    this.snackMessage$.next(message);
  }
  getSnackbarMessage$(): Observable<string> {
    return this.snackMessage$.asObservable();
  }
}
