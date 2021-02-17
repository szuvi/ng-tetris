import {
  Component,
  Output,
  EventEmitter,
  Input,
  HostListener,
} from '@angular/core';
@Component({
  selector: 'controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css'],
})
export class ControlsComponent {
  @Input() gameStatus: string;
  @Output() dirCommand = new EventEmitter<string>();
  @Output() stateCommand = new EventEmitter<string>();

  @HostListener('window:keydown', ['$event'])
  public keyEvent(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowLeft':
        this.handleDirCommand('left');
        break;
      case 'ArrowDown':
        this.handleDirCommand('down');
        break;
      case 'ArrowRight':
        this.handleDirCommand('right');
        break;
      case 'ArrowUp':
        this.handleDirCommand('rotate');
        break;
      case ' ':
        const command =
          this.gameStatus === 'GAME OVER'
            ? 'reset'
            : this.gameStatus === 'Started'
            ? 'pause'
            : 'start';
        this.handleStateCommand(command);
    }
  }

  public handleStateCommand(command): void {
    if (this.gameStatus !== 'GAME OVER' || command === 'reset') {
      this.stateCommand.emit(command);
    }
  }

  public handleDirCommand(command): void {
    if (this.gameStatus === 'Started') this.dirCommand.emit(command);
  }
}
