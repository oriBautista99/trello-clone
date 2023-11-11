import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContextToken,
  HttpContext
} from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { TokenService } from '@services/token.service';
import { AuthService } from '@services/auth.service';

const CHECK_TOKEN = new HttpContextToken<boolean>(() => false);

export function checkToken() {
  return new HttpContext().set(CHECK_TOKEN,true);
}


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService,
    private authService: AuthService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.context.get(CHECK_TOKEN)){
      const isValidToken = this.tokenService.isValidToken();
      if(isValidToken){
        return this.addToken(request,next);
      }else{
        return this.updateAccessTokenRefresToken(request,next);
      }
    }
    return next.handle(request);
  }

  private addToken(request: HttpRequest<unknown>, next: HttpHandler){
    const accessToken = this.tokenService.getToken();
    if(accessToken){
      const authRequest = request.clone({
        headers: request.headers.set('Authorization',`Bearer ${accessToken}`)
      });
      return next.handle(authRequest);
    }
    return next.handle(request);
  }

  private updateAccessTokenRefresToken(request: HttpRequest<unknown>, next: HttpHandler){
    const refresToken = this.tokenService.getRefresToken();
    const isValidRefresToken = this.tokenService.isValidRefresToken();
    if(refresToken && isValidRefresToken){
      return this.authService.refresToken(refresToken)
        .pipe(
          switchMap(() => this.addToken(request,next)),
        )
    }
    return next.handle(request);
  }


}
