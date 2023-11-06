import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { faBars, faCheckSquare, faCheckToSlot, faClock, faClose, faTag, faUser } from '@fortawesome/free-solid-svg-icons';
import { ToDo } from 'src/app/models/todo.model';

interface inputData{
  todo: ToDo
}

interface outputData{
  rta: boolean
}

@Component({
  selector: 'app-todo-dialog',
  templateUrl: './todo-dialog.component.html'
})
export class TodoDialogComponent {

  faClose = faClose;
  faCheckToSlot = faCheckToSlot;
  faBars = faBars;
  faUser = faUser;
  faTag = faTag;
  faCheckSquare = faCheckSquare;
  faClock = faClock;

  todo!: ToDo;

  constructor(
    private dialogRef: DialogRef<outputData>,
    @Inject(DIALOG_DATA) private data:inputData
  ){
    this.todo = data.todo;
  }

  close(){
    this.dialogRef.close();
  }

  closeWithRta(rta: boolean){
    this.dialogRef.close({
      rta
    });
  }
}
