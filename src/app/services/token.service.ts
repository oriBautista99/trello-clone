import { Injectable } from '@angular/core';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { setCookie, getCookie, removeCookie } from 'typescript-cookie';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  saveToken(token: string){
    setCookie('token-trello', token, {expires: 365, path:'/'});
  }

  getToken(){
    const token = getCookie('token-trello');
    return token;
  }

  removeToken(){
    removeCookie('token-trello');
  }

  saveRefresToken(token: string){
    setCookie('refres-token-trello', token, {expires: 365, path:'/'});
  }

  getRefresToken(){
    const token = getCookie('refres-token-trello');
    return token;
  }

  removeRefresToken(){
    removeCookie('refres-token-trello');
  }

  isValidToken(){
    const token = this.getToken();
    if(!token){
      return false;
    }
    const decodeToken = jwtDecode<JwtPayload>(token);
    if(decodeToken && decodeToken?.exp){
      const tokenDate = new Date(0);
      tokenDate.setUTCSeconds(decodeToken.exp);
      const today  = new Date();
      return tokenDate.getTime() > today.getTime();
    }
    return false;
  }

  isValidRefresToken(){
    const token = this.getRefresToken();
    if(!token){
      return false;
    }
    const decodeToken = jwtDecode<JwtPayload>(token);
    if(decodeToken && decodeToken?.exp){
      const tokenDate = new Date(0);
      tokenDate.setUTCSeconds(decodeToken.exp);
      const today  = new Date();
      return tokenDate.getTime() > today.getTime();
    }
    return false;
  }
}
