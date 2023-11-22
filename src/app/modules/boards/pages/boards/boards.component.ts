import { Component, OnInit } from '@angular/core';
import { faTrello } from '@fortawesome/free-brands-svg-icons';
import { faClock, faHeart,faBorderAll, faUsers, faGear } from '@fortawesome/free-solid-svg-icons';
import { faBox } from '@fortawesome/free-solid-svg-icons';
import { faWaveSquare } from '@fortawesome/free-solid-svg-icons';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Board } from '@models/board.model';
import { MeService } from '@services/me.service';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html'
})
export class BoardsComponent implements OnInit {
  faTrello = faTrello;
  faClock = faClock;
  faBox = faBox;
  faWaveSquare = faWaveSquare;
  faAngleUp = faAngleUp;
  faAngleDown = faAngleDown;
  faHeart = faHeart;
  faBorderAll = faBorderAll;
  faUsers = faUsers;
  faGear = faGear;
  boards: Board[] = [];


  items = [
    {
      label: 'item 1',
      items: [
        {
          label: 'Sub Item 1.1'
        }
      ]
    },
    {
      label: 'item 2',
      items: [
        {
          label: 'Sub Item 2.1'
        }
      ]
    },
    {
      label: 'item 3',
      items: [
        {
          label: 'Sub Item 3.1'
        },
        {
          label: 'Sub Item 3.2'
        },
        {
          label: 'Sub Item 3.3'
        }
      ]
    }
  ];

  constructor( private meServices: MeService){}

  ngOnInit(): void {
    this.getMeBoards();
  }

  getMeBoards(){
    this.meServices.getMeBoards()
      .subscribe( boards => {
        this.boards = boards;
      })
  }
}
