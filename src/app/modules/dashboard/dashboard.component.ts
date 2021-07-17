import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../core/services/http.service';
import {Observable} from 'rxjs';
import {AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isAdmin$: Observable<boolean>;
  constructor(
    private httpService: HttpService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.isAdmin$ = this.authService.getIsAdmin$();
  }
}
