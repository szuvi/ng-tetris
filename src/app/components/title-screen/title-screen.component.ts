import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ScoresService } from 'src/app/scores.service';
import { UserDataService } from 'src/app/user-data.service';
import { User } from '../../Interfaces';

@Component({
  selector: 'title-screen',
  templateUrl: './title-screen.component.html',
  styleUrls: ['./title-screen.component.css'],
})
export class TitleScreenComponent {
  constructor(
    private _router: Router,
    private _userService: UserDataService,
    private _scores: ScoresService
  ) {}

  public user: User;
  public validationError = '';

  public handleSetUser({ name, code }) {
    if (this._scores.validate(code)) {
      this._userService.setUserData(name, code);
      this.validationError = '';
      this._router.navigate(['/game']);
    } else {
      this.validationError = 'Incorrect Code!';
    }
    // this._scores.validate(code).subscribe((res) => {
    //   if (res.success) {
    //     this._userService.setUserData(name, code);
    //     this.validationError = '';
    //     this._router.navigate(['/game']);
    //   } else {
    //     this.validationError = 'Incorrect Code!';
    //   }
    // });
  }
}
