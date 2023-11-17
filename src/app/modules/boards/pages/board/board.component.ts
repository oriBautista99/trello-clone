import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Dialog } from '@angular/cdk/dialog';
import { Column, ToDo } from 'src/app/models/todo.model';
import { faEllipsis, faPlus, faFloppyDisk, faXmark  } from '@fortawesome/free-solid-svg-icons';
import { TodoDialogComponent } from '../../components/todo-dialog/todo-dialog.component';
import { BoardsService } from '@services/boards.service';
import { ActivatedRoute } from '@angular/router';
import { Board } from '@models/board.model';
import { Card } from '@models/card.model';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styles: [
    `
      /* Animate items as they're being sorted. */
      .cdk-drop-list-dragging .cdk-drag {
        transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
      }
      /* Animate an item that has been dropped. */
      .cdk-drag-animating {
        transition: transform 300ms cubic-bezier(0, 0, 0.2, 1);
      }
    `
  ]
})
export class BoardComponent implements OnInit {

  faEllipsis = faEllipsis;
  faPlus = faPlus;
  faFloppyDisk = faFloppyDisk;
  faXmark = faXmark;

  columns: Column[] = [
    {
      title: 'ToDo',
      todos: [
        {
          id:'1',
          title: 'Task 1'
        },
        {
          id:'2',
          title: 'Task 2'
        },
        {
          id:'3',
          title: 'Task 3'
        }
      ],
      newCard: '',
      showFormAddCard: false
    },
    {
      title: 'Doing',
      todos: [
        {
          id:'5',
          title: 'Task 5'
        }
      ],
      newCard: '',
      showFormAddCard: false
    },
    {
      title: 'Done',
      todos:[
        {
          id:'4',
          title: 'Task 4'
        }
      ],
      newCard: '',
      showFormAddCard: false
    }
  ];

  board: Board | null = null;
  showFormAddCard: boolean = false;
  formCardAdd: any;

  constructor(
    private dialog: Dialog,
    private route: ActivatedRoute,
    private boardService: BoardsService
  ){
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe( params => {
      const id = params.get('boardId');
      if(id){
        this.getBoard(id);
      }
    })
  }

  drop(event:CdkDragDrop<Card[]>){
    if (event.previousContainer == event.container){
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

  }

  addColumn(){
    // this.columns.push({
    //   title: 'Nueva',
    //   todos: [],
    //   newCard: '',
    //   showFormAddCard: false
    // })
  }

  openDialog(card: Card){
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      minWidth: '300px',
      maxWidth: '50%',
      autoFocus: false,
      data: {
        card:card
      }
    });
    dialogRef.closed.subscribe( output => {
      console.log(output)
    });
  }

  private getBoard(id: string){
    this.boardService.getBoard(id).subscribe( board => {
      this.board = board;
    });
  }

}
