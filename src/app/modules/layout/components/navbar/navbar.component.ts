import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faBell, faInfoCircle, faClose, faAngleDown, faUser } from '@fortawesome/free-solid-svg-icons';
import { Colors, NAVBAR_BACKGROUNDS } from '@models/colors.model';
import { AuthService } from '@services/auth.service';
import { BoardsService } from '@services/boards.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit{

  faBell = faBell;
  faInfoCircle = faInfoCircle;
  faClose = faClose;
  isOpen = false;
  faAngleDown = faAngleDown;
  faUser = faUser;

  isOpenOverlayAvatar = false;
  isOpenOverlayBoards = false;
  isOpenOverlayCreatBoard = false;

  user$ = this.authServices.user$;
  navbarBackgroundColor: Colors = 'sky';
  navbarColors = NAVBAR_BACKGROUNDS

  constructor(
    private authServices: AuthService,
    private router: Router,
    private boardService: BoardsService
  ){
    this.boardService.backgroundColor$.subscribe(color => {
      this.navbarBackgroundColor = color;
    });
  }

  ngOnInit(): void {

  }

  logout(){
    this.authServices.logout();
    this.router.navigate(['/login']);
  }

  close(event: boolean){
    this.isOpenOverlayCreatBoard = event;
  }

  get colors(){
    const classes = this.navbarColors[this.navbarBackgroundColor];
    return classes ? classes : {};
  }
}
