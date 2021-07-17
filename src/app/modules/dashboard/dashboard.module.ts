import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {SharedModule} from '../../shared/shared.module';
import {UsersComponent} from './partials/users/users.component';
import { ProjectsComponent } from './partials/projects/projects.component';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';



@NgModule({
  declarations: [DashboardComponent, UsersComponent, ProjectsComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    MatButtonModule,
    SharedModule,
    MatListModule,
    MatCardModule,
    MatExpansionModule,
  ]
})
export class DashboardModule { }
