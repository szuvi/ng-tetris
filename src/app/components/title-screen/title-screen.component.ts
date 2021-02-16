import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../Interfaces';

@Component({
  selector: 'title-screen',
  templateUrl: './title-screen.component.html',
  styleUrls: ['./title-screen.component.css'],
})
export class TitleScreenComponent implements OnInit {
  @Input() user: User;
  @Output() start = new EventEmitter<void>();
  public buttonDisabled = true;

  public errors = {
    nameError: {
      status: false,
      showError: false,
      text: 'Incorrect name input!',
    },
    emailError: {
      status: false,
      showError: false,
      text: 'Incorrect email input!',
    },
  };

  ngOnInit() {
    this.user.name = '';
    this.user.email = '';
  }

  public onNameChange(): void {
    if (this.user.name.length < 3) {
      this.errors.nameError.status = true;
    } else {
      this.errors.nameError.status = false;
    }
    this.checkButton();
  }

  public onEmailChange(): void {
    if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        this.user.email
      )
    ) {
      this.errors.emailError.status = true;
    } else {
      this.errors.emailError.status = false;
    }
    this.checkButton();
  }

  public checkButton() {
    console.log(this.buttonDisabled);

    this.buttonDisabled =
      !this.user.name ||
      !this.user.email ||
      this.errors.nameError.status ||
      this.errors.emailError.status;
  }

  public triggerErrors() {
    this.errors.nameError.showError = this.errors.nameError.status;
    this.errors.emailError.showError = this.errors.emailError.status;
  }

  public submitForm(): void {
    if (!this.buttonDisabled) {
      this.start.emit();
    } else {
      this.triggerErrors();
    }
  }
}
