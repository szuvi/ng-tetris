import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDataService } from './user-data.service';

@Injectable({
  providedIn: 'root',
})
export class ScoresService {
  constructor(private _http: HttpClient, private _user: UserDataService) {}
  private URL = 'http://tetris.chrum.it/';
  private TOKEN = this._user.getUserData().code;

  private headers = new HttpHeaders({
    accept: 'application/json',
    'Content-Type': 'application/json',
    // 'auth-token': this.TOKEN.toString(),
  });

  load() {
    const route = `${this.URL}/scores`;
    return this._http.get(route, { headers: this.headers });
  }

  validate(code) {
    return (
      typeof code === 'number' &&
      !Number.isNaN(code) &&
      code.toString().length === 4
    );

    // const route = `${this.URL}/check-token`;
    // return this._http.post(route, { 'auth-token': this.TOKEN }, { headers: this.headers });
  }

  submitScore(score) {
    const route = `${this.URL}/scores`;
    const user = this._user.getUserData();
    const body = {
      name: user.name,
      score,
    };
    return this._http.post(route, body, { headers: this.headers });
  }
}
