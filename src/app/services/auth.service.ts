import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@environments/environment'
import { switchMap, tap, BehaviorSubject } from 'rxjs';
import { TokenService } from './token.service';
import { ResponseLogin } from '@models/auth.model';
import { User } from '@models/user.model';
import { checkToken } from '@interceptors/token.interceptor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL = environment.API_URL;
  user$ = new BehaviorSubject<User | null>(null);

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  login(email: string, password: string){
    return this.http.post<ResponseLogin>(`${this.apiURL}/api/v1/auth/login`, {
      email,
      password
    })
    .pipe(
      tap(response => {
        this.tokenService.saveToken(response.access_token);
        this.tokenService.saveRefresToken(response.refresh_token);
      })
    );
  }

  register(name: string, email: string, password:string){
    return this.http.post(`${this.apiURL}/api/v1/auth/register`, {
      name,
      email,
      password
    });
  }

  registerAndLogin(name: string, email: string, password:string){
    return this.register(name,email,password)
      .pipe(
        switchMap(() => this.login(email, password))
      )
  }

  isAvailable(email: string){
    return this.http.post<{isAvailable:boolean}>(`${this.apiURL}/api/v1/auth/is-available`, {email});
  }

  recovery(email: string){
    return this.http.post(`${this.apiURL}/api/v1/auth/recovery`, {email});
  }

  refresToken(refresToken: string){
    return this.http.post<ResponseLogin>(`${this.apiURL}/api/v1/auth/refres-token`, {refresToken})
    .pipe(
      tap(response => {
        this.tokenService.saveToken(response.access_token);
        this.tokenService.saveRefresToken(response.refresh_token);
      })
    );
  }

  changePassword(token: string, newPassword:string){
    return this.http.post(`${this.apiURL}/api/v1/auth/change-password`, {token, newPassword});
  }

  getProfile(){
    return this.http.get<User>(`${this.apiURL}/api/v1/auth/profile`, {
      context: checkToken()
    }).pipe(
      tap( response => {
        this.user$.next(response);
      })
    );
  }

  logout(){
    this.tokenService.removeToken();
  }
}
