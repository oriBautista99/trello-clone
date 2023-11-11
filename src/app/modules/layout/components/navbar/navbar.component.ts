import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faBell, faInfoCircle, faClose, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '@services/auth.service';

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

  isOpenOverlayAvatar = false;
  isOpenOverlayBoards = false;

  user$ = this.authServices.user$;

  constructor(
    private authServices: AuthService,
    private router: Router
  ){

  }

  ngOnInit(): void {

  }

  logout(){
    this.authServices.logout();
    this.router.navigate(['/login']);
  }
}
