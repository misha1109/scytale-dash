import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../core/services/auth.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {HttpService} from '../../core/services/http.service';
import {MFA_REQUIRED} from '../../../config/auth';
import {SnackbarService} from '../../core/services/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  mfaForm: FormGroup;
  showMfa: boolean;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private httpService: HttpService,
    private snackService: SnackbarService
  ) {
    this.loginForm = this.fb.group({
      userId: new FormControl('', [Validators.required, Validators.minLength(1)]),
      password: new FormControl('', [Validators.required, Validators.minLength(1)] ),
    });
    this.mfaForm = this.fb.group({
      mfa: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)] ),
    });
  }

  ngOnInit(): void {
    this.authService
      .getUser$()
      .subscribe(user => {
        this.router.navigateByUrl('/');
      });
  }
  async postLogin(): Promise<void> {
    const {userId, password} = this.loginForm.controls;
    const {mfa} = this.mfaForm.controls;
    const credentials = {
      userId: userId.value,
      password: password.value,
      mfa: mfa.value
    };
    this.authService.login(credentials)
      .subscribe(
        res => {
        },
        err => {
          const message = err.error;
          const mfaReq = message === MFA_REQUIRED;
          if (mfaReq && this.loginForm.valid) {
            this.showMfa = true;
          } else {
            this.snackService.setSnackbarMessage(err.error);
          }
        }
      );
  }
}
