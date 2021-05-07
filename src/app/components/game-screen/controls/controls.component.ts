import {
  Component,
  Output,
  EventEmitter,
  Input,
  HostListener,
} from '@angular/core';
import { Router } from '@angular/router';
import { GameState, Command } from '../../../Interfaces';
@Component({
  selector: 'controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css'],
})
export class ControlsComponent {
  @Input() gameStatus: string;
  @Output() dirCommand = new EventEmitter<Command>();
  @Output() stateCommand = new EventEmitter<Command>();

  constructor(private _router: Router) {}

  @HostListener('window:keydown', ['$event'])
  public keyEvent(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowLeft':
        this.handleDirCommand(Command.left);
        break;
      case 'ArrowDown':
        this.handleDirCommand(Command.down);
        break;
      case 'ArrowRight':
        this.handleDirCommand(Command.right);
        break;
      case 'ArrowUp':
        this.handleDirCommand(Command.rotate);
        break;
      case ' ':
        const command =
          this.gameStatus === GameState.gameOver
            ? Command.reset
            : this.gameStatus === GameState.started
            ? Command.pause
            : Command.start;
        this.handleStateCommand(command);
    }
  }

  public handleStateCommand(command: Command): void {
    if (this.gameStatus !== GameState.gameOver || command === Command.reset) {
      this.stateCommand.emit(command);
    }
  }

  public handleDirCommand(command: Command): void {
    if (this.gameStatus === GameState.started) this.dirCommand.emit(command);
  }

  navigateToScores() {
    this._router.navigate(['/highscore']);
  }
}
