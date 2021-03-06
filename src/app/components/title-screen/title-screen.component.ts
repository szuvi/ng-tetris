import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/user-data.service';
import { User } from '../../Interfaces';

@Component({
  selector: 'title-screen',
  templateUrl: './title-screen.component.html',
  styleUrls: ['./title-screen.component.css'],
})
export class TitleScreenComponent {
  constructor(private _router: Router, private _userService: UserDataService) {}

  @Output() start = new EventEmitter<void>();
  public user: User;
  public buttonDisabled = true;
  // public errors = {
  //   nameError: {
  //     status: false,
  //     showError: false,
  //     text: 'Incorrect name input!',
  //   },
  //   emailError: {
  //     status: false,
  //     showError: false,
  //     text: 'Incorrect email input!',
  //   },
  // };

  // ngOnInit(): void {
  //   this.user = this._userService.getUserData();
  //   this.user.name = '';
  //   this.user.email = '';
  // }

  // public onNameChange(): void {
  //   if (this.user.name.length < 3) {
  //     this.errors.nameError.status = true;
  //   } else {
  //     this.errors.nameError.status = false;
  //   }
  //   this.checkButton();
  // }

  // public onEmailChange(): void {
  //   if (
  //     !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
  //       this.user.email
  //     )
  //   ) {
  //     this.errors.emailError.status = true;
  //   } else {
  //     this.errors.emailError.status = false;
  //   }
  //   this.checkButton();
  // }
  public handleSetUser({ name, email }) {
    this._userService.setUserData(name, email);

    this._router.navigate(['/game']);
  }
  // public onSubmitForm(): void {
  //   if (!this.buttonDisabled) {
  //     this._router.navigate(['/game']);
  //   } else {
  //     this.triggerErrors();
  //   }
  // }

  // private checkButton(): void {
  //   this.buttonDisabled =
  //     !this.user.name ||
  //     !this.user.email ||
  //     this.errors.nameError.status ||
  //     this.errors.emailError.status;
  // }

  // private triggerErrors(): void {
  //   this.errors.nameError.showError = this.errors.nameError.status;
  //   this.errors.emailError.showError = this.errors.emailError.status;
  // }
}
