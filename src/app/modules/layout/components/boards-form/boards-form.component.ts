import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { BoardsService } from '@services/boards.service';
import { Colors } from '@models/colors.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-boards-form',
  templateUrl: './boards-form.component.html'
})
export class BoardsFormComponent {

  @Output() closeOverlay = new EventEmitter<boolean>();

  form = this.formBuilder.nonNullable.group({
    title: ['', Validators.required],
    backgroundColor: new FormControl<Colors>('sky',{
      nonNullable: true,
      validators: Validators.required
    })
  });
  faCheck = faCheck;
  constructor(
    private formBuilder: FormBuilder,
    private boardsService: BoardsService,
    private router: Router
  ){}


  doSave(){
    if(this.form.valid){
      const {title, backgroundColor} = this.form.getRawValue();
      this.boardsService.createBoard(title,backgroundColor).subscribe( board => {
        this.closeOverlay.next(false);
        this.router.navigate(['/app/boards', board.id]);
      });
    }else{
      this.form.markAllAsTouched();
    }
  }
}
