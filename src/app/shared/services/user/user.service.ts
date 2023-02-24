import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Globals} from "../../globals/globals";
import YandexToken from "../../interfaces/YandexToken";
import {Router} from "@angular/router";
import {map, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public yandexUserCode!: string;
  private path: string = "/jwt/";

  constructor(private httpClient: HttpClient,
              private router: Router) {
  }

  public getJWTFromAPI() {
    let path = this.path + "token"; //+ "?grant_type=authorization_code" + `&code=${this.yandexUserCode}`;
    let body = new URLSearchParams();
    body.set('grant_type', 'authorization_code');
    body.set('code', this.yandexUserCode);
    body.set('client_id', Globals.Client_ID);
    body.set('client_secret', Globals.Client_secret);

    let headers = new HttpHeaders()
      .set('Content-type', 'application/x-www-form-urlencoded')

    this.httpClient.post(path, body, {headers: headers}).subscribe({
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

  public refreshToken(token: string) {
    let path = this.path + "token";
    let body = new URLSearchParams();
    body.set('grant_type', 'refresh_token');
    body.set('refresh_token', token);

    let headers = new HttpHeaders()
      .set('Content-type', 'application/x-www-form-urlencoded')
      .set('Authorization', "Basic " + btoa(Globals.Client_ID + ":" + Globals.Client_secret))

    let obs = this.httpClient.post(path, body, {headers: headers});

    obs.subscribe({
      next: value => {
        let yandexResult = (value as YandexToken);
        localStorage.setItem('access_token', yandexResult.access_token);
        localStorage.setItem('refresh_token', yandexResult.refresh_token);
      }
    });

    return obs.pipe(
      map(value => {
        let yandexResult = (value as YandexToken);
        return {
          accessToken: yandexResult.access_token,
          refreshToken: yandexResult.refresh_token
        };
      }));
  }

  public logout() {
    localStorage.clear();
  }
}
