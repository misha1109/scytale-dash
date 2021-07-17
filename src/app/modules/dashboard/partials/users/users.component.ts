import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from '../../../../core/services/auth.service';
import {HttpService} from '../../../../core/services/http.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  isAdmin$: Observable<boolean>;
  currentData: any;

  constructor(
    private authService: AuthService,
    private httpService: HttpService,
  ) { }

  ngOnInit(): void {
    this.isAdmin$ = this.authService.getIsAdmin$();
    this.getData('users');
  }

  getData(type): void {
    const endpoint = {
      users: 'users',
      admins: 'users/admins'
    }[type];
    this.httpService
      .get(endpoint)
      .subscribe(res => {
        this.currentData = res;
      })
  }
}
