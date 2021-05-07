import { Injectable } from '@angular/core';
import { User } from './Interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private user: User = { name: '', code: 0 };
  constructor() {}

  getUserData() {
    return this.user;
  }

  setUserData(name, code) {
    this.user.name = name;
    this.user.code = +code;
  }
}
