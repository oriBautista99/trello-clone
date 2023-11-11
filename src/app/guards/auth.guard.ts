import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from '@services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private tokenServices: TokenService,
    private router: Router
  ){

  }

  canActivate(){
    const isValidToken = this.tokenServices.isValidRefresToken();
    if(!isValidToken){
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

}
