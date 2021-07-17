import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CoreModule} from './core/core.module';
import {LoginModule} from './modules/login/login.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DashboardModule} from './modules/dashboard/dashboard.module';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    CoreModule,
    LoginModule,
    BrowserAnimationsModule,
    DashboardModule,
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {
        duration: 2500,
        verticalPosition: 'top'
      }}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
