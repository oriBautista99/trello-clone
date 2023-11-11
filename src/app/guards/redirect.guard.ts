import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { TokenService } from '@services/token.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RedirectGuard implements CanActivate {

  // Verifies that a session is open and redirects to the app

  constructor(
    private tokenServices: TokenService,
    private router: Router
  ){

  }

  canActivate(){
    const isValidToken = this.tokenServices.isValidRefresToken();
    if(isValidToken){
      this.router.navigate(['/app']);
    }
    return true;
  }
}
