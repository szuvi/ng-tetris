import { Component } from '@angular/core';
import { User } from './Interfaces';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public gameActiveState = true; // TODO Change to false to start

  public user: User = {
    name: '',
    email: '',
  };

  public startGame(): void {
    this.gameActiveState = true;
  }

  public exitGame(): void {
    this.gameActiveState = false;
  }
}

// Known bugs:
//  - sorting and filtering game history works only on select change, not all the time,
//  - since spacebar is set fot start/pause/reset using mouse click
//    for controls first and then using spacebar triggers last pressed key each time
// TODO:
//  - add more points for multiple lines, combos points
//  - add history option in mobile view
