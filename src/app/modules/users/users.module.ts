import { CdkTableModule } from '@angular/cdk/table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersTableComponent } from './pages/users-table/users-table.component';
import { UsersRoutingModule } from './users-routing.module';



@NgModule({
  declarations: [
    UsersTableComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    CdkTableModule
  ]
})
export class UsersModule { }
