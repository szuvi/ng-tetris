import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/Interfaces';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  @Output() setUser = new EventEmitter<User>();
  public name: string;
  public email: string;
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

  ngOnInit(): void {
    // this.name = '';
    // this.email = '';
  }

  public onNameChange(): void {
    if (this.name.length < 3) {
      this.errors.nameError.status = true;
    } else {
      this.errors.nameError.status = false;
    }
    this.checkButton();
  }

  public onEmailChange(): void {
    if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        this.email
      )
    ) {
      this.errors.emailError.status = true;
    } else {
      this.errors.emailError.status = false;
    }
    this.checkButton();
  }

  public onSubmitForm(): void {
    if (!this.buttonDisabled) {
      this.setUser.emit({ name: this.name, email: this.email });
    } else {
      this.triggerErrors();
    }
  }

  private checkButton(): void {
    this.buttonDisabled =
      !this.name ||
      !this.email ||
      this.errors.nameError.status ||
      this.errors.emailError.status;
  }

  private triggerErrors(): void {
    this.errors.nameError.showError = this.errors.nameError.status;
    this.errors.emailError.showError = this.errors.emailError.status;
  }
}
