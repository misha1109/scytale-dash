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
  currentData: any;
  isAdmin$: Observable<boolean>;
  constructor(
    private httpService: HttpService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.isAdmin$ = this.authService.getIsAdmin$();
    this.getData('users');
  }
  getData(type): void {
    console.log(type);
    const endpoint = {
      users: 'users',
      admins: 'users/admins'
    }[type];
    this.httpService
      .get(endpoint)
      .subscribe(res => {
        console.log(res)
        this.currentData = res;
      })
  }
}
