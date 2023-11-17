import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import { Board } from '@models/board.model';
import { User } from '@models/user.model';

@Injectable({
  providedIn: 'root'
})
export class MeService {

  apiURL = environment.API_URL;

  constructor(
    private http: HttpClient
  ) { }

  getMeProfile(){
    return this.http.get<User>(`${this.apiURL}/api/v1/me/profile`,{
      context: checkToken()
    });
  }

  getMeBoards(){
    return this.http.get<Board[]>(`${this.apiURL}/api/v1/me/boards`,{
      context: checkToken()
    });
  }
}
