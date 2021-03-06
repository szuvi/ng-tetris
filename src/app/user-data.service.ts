import { Injectable } from '@angular/core';
import { User } from './Interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private user: User = { name: '', email: '' };

  getUserData() {
    return this.user;
  }

  setUserData(name, email) {
    this.user.name = name;
    this.user.email = email;
  }
}
