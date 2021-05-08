import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/Interfaces';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent {
  @Output() setUser = new EventEmitter<any>();
  public name: string;
  public code: string;
  public buttonDisabled = true;
  public errors = {
    nameError: {
      status: false,
      showError: false,
      text: 'Incorrect name input!',
    },
    codeError: {
      status: false,
      showError: false,
      text: 'Incorrect code input!',
    },
  };
  public colorPalette: string = 'normal';

  public onNameChange(): void {
    if (this.name.length < 3) {
      this.errors.nameError.status = true;
    } else {
      this.errors.nameError.status = false;
    }
    this.checkButton();
  }

  public onCodeChange(): void {
    if (this.code.length !== 4 && !isNaN(+this.code)) {
      this.errors.codeError.status = true;
    } else {
      this.errors.codeError.status = false;
    }
    this.checkButton();
  }

  public onSubmitForm(): void {
    if (!this.buttonDisabled) {
      this.setUser.emit({
        name: this.name,
        code: +this.code,
        colorPalette: this.colorPalette,
      });
    } else {
      this.triggerErrors();
    }
  }

  private checkButton(): void {
    this.buttonDisabled =
      !this.name ||
      !this.code ||
      this.errors.nameError.status ||
      this.errors.codeError.status;
  }

  private triggerErrors(): void {
    this.errors.nameError.showError = this.errors.nameError.status;
    this.errors.codeError.showError = this.errors.codeError.status;
  }
}
