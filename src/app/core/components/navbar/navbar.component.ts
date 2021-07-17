import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {ROLES} from '../../../../config/auth';
import {AdminService} from '../../services/admin.service';
import {SnackbarService} from '../../services/snackbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user$: Observable<any>;
  isAdmin$: Observable<boolean>;
  constructor(
    private authService: AuthService,
    private adminService: AdminService,
    private snackService: SnackbarService
  ) {
  }

  ngOnInit(): void {
    this.user$ = this.authService.getUser$();
    this.isAdmin$ = this.authService.getIsAdmin$();
  }
  setMfaState(state): any {
    this.adminService.setMfaState(state)
      .subscribe(res => {
        this.authService.logout();
        this.snackService.setSnackbarMessage(`MFA set to ${state} for all users`);
      });
  }
}
