import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import { Card, UpdateCardDto } from '@models/card.model';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  apiURL = environment.API_URL;

  constructor(
    private http: HttpClient
  ) { }

  update(id: Card['id'], changes:UpdateCardDto) {
    return this.http.put(`${this.apiURL}/api/v1/cards/${id}`,changes, {
      context: checkToken()
    });
  }

}
