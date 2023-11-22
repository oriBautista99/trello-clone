import { Component, OnInit, OnDestroy } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Dialog } from '@angular/cdk/dialog';
import { Column, ToDo } from 'src/app/models/todo.model';
import { faEllipsis, faPlus, faFloppyDisk, faXmark  } from '@fortawesome/free-solid-svg-icons';
import { TodoDialogComponent } from '../../components/todo-dialog/todo-dialog.component';
import { BoardsService } from '@services/boards.service';
import { ActivatedRoute } from '@angular/router';
import { Board } from '@models/board.model';
import { Card } from '@models/card.model';
import { CardService } from '@services/card.service';
import { List } from '@models/list.model';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ListsService } from '@services/lists.service';
import { BACKGROUNDS } from '@models/colors.model';


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
export class BoardComponent implements OnInit, OnDestroy {

  faEllipsis = faEllipsis;
  faPlus = faPlus;
  faFloppyDisk = faFloppyDisk;
  faXmark = faXmark;
  showListForm: boolean = true;

  board: Board | null = null;
  showFormAddCard: boolean = false;
  colorBackgrounds = BACKGROUNDS;

  formCardAdd = new FormControl<string>('',{
    nonNullable: true,
    validators: Validators.required
  });

  formListAdd = new FormControl<string>('',{
    nonNullable: true,
    validators: Validators.required
  });

  constructor(
    private dialog: Dialog,
    private route: ActivatedRoute,
    private boardService: BoardsService,
    private cardService: CardService,
    private listsService: ListsService
  ){
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe( params => {
      const id = params.get('boardId');
      if(id){
        this.getBoard(id);
      }
    });
  }

  drop(event:CdkDragDrop<Card[]>){
    if (event.previousContainer == event.container){
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    const position = this.boardService.getPosition(event.container.data,event.currentIndex);
    const card = event.container.data[event.currentIndex];
    const listId = event.container.id;
    this.updateCard(card, position, listId);
  }

  createCard(list: List){
    const title = this.formCardAdd.value;
    if(this.board){
      this.cardService.create({
        title: title,
        boardId: this.board.id,
        listId: list.id,
        position: this.boardService.getPositionNewItem(list.cards)
      }).subscribe( card => {
        list.cards.push(card);
        this.formCardAdd.setValue('');
        this.showFormAddCard = false;
      });
    }
  }

  closeCardForm(list: List){
    list.showCardForm = !list.showCardForm;
  }

  addList(){
    const title = this.formListAdd.value;
    console.log(title);
    if (this.board) {
      this.listsService.create({
        title,
        boardId: this.board.id,
        position: this.boardService.getPositionNewItem(this.board.lists)
      }).subscribe( list => {
        this.board?.lists.push({
          ...list,
          cards: []
        });
        this.showListForm = false;
        this.formListAdd.setValue('');
      });
    }
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
      this.boardService.setBackgroundColor(this.board.backgroundColor);
    });
  }

  private updateCard(card: Card, position: number, listId: string | number){
    this.cardService.update(card.id, {position, listId})
      .subscribe((cardUpdated) => {
        console.log(cardUpdated);
      });
  }

  openFormCard(list: List){
    list.showCardForm = !list.showCardForm;
    if(this.board?.lists){
      this.board.lists = this.board.lists.map(itertorList => {
        if(itertorList.id == list.id){
          return {
            ...itertorList,
            showCardForm: true
          }
        }
        return {
          ...itertorList,
          showCardForm: false
        }
      });
    }
  }

  get colors() {
    if(this.board){
      const classes = this.colorBackgrounds[this.board.backgroundColor];
      return classes ? classes : {}
    }
    return {};
  }

  ngOnDestroy(): void {
    this.boardService.setBackgroundColor('sky');
  }
}
