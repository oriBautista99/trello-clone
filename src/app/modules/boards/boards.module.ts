import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './pages/board/board.component';
import { BoardsComponent } from './pages/boards/boards.component';
import { SharedModule } from '../shared/shared.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { DialogModule } from '@angular/cdk/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BoardsRoutingModule } from './boards-routing.module';
import { TodoDialogComponent } from './components/todo-dialog/todo-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    BoardComponent,
    BoardsComponent,
    TodoDialogComponent
  ],
  imports: [
    CommonModule,
    BoardsRoutingModule,
    SharedModule,
    CdkAccordionModule,
    FontAwesomeModule,
    DragDropModule,
    ReactiveFormsModule,
    FormsModule,
    DialogModule
  ]
})
export class BoardsModule { }
