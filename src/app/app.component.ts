import { Component } from '@angular/core';
import { User } from './Interfaces';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public user: User = {
    name: '',
    code: 0,
  };
}
