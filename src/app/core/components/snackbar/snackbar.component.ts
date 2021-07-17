import { Component, OnInit } from '@angular/core';
import {SnackbarService} from '../../services/snackbar.service';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {

  constructor(
    private snackBar: MatSnackBar,
    private snackbarService: SnackbarService
  ) {
    this.snackbarService.getSnackbarMessage$()
      .subscribe(message => this.open(message));
  }

  ngOnInit(): void {
  }

  open(message: string): void {
    if (message) {
      this.snackBar.open(message);
    }
  }
}
