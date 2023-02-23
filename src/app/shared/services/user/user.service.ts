import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Globals} from "../../globals/globals";
import YandexToken from "../../interfaces/YandexToken";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public yandexUserCode!: string;

  constructor(private httpClient: HttpClient,
              private router: Router) { }

  public async getJWTFromAPI() {
    let path = "https://oauth.yandex.ru/token"; //+ "?grant_type=authorization_code" + `&code=${this.yandexUserCode}`;
    let body = new URLSearchParams();
      body.set('grant_type', 'authorization_code');
      body.set('code', this.yandexUserCode);
      body.set('client_id', Globals.Client_ID);
      body.set('client_secret', Globals.Client_secret);

    let headers = new HttpHeaders()
      .set('Content-type', 'application/x-www-form-urlencoded')

    await this.httpClient.post(path, body, { headers: headers }).subscribe({
      next: (value: Object) => {
        let yandexResult = (value as YandexToken);
        localStorage.setItem('access_token', yandexResult.access_token);
        localStorage.setItem('refresh_token', yandexResult.refresh_token);
        this.router.navigate(['main']);
        },
      error: err => {
        this.router.navigate(['login']);
      }
    })


  }
}
