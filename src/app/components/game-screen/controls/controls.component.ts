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
  @Output() dirCommand = new EventEmitter<string>();
  @Output() stateCommand = new EventEmitter<string>();
  @Input() gameStatus: string;
  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event.key);
    switch (event.key) {
      case 'ArrowLeft':
        this.handleDirCommand({ target: { name: 'left' } });
        break;
      case 'ArrowDown':
        this.handleDirCommand({ target: { name: 'down' } });
        break;
      case 'ArrowRight':
        this.handleDirCommand({ target: { name: 'right' } });
        break;
      case 'ArrowUp':
        this.handleDirCommand({ target: { name: 'rotate' } });
        break;
      case ' ':
        const command =
          this.gameStatus === 'GAME OVER'
            ? 'reset'
            : this.gameStatus === 'Started'
            ? 'pause'
            : 'start';
        this.handleStateCommand({ target: { name: command } });
    }
  }

  public handleStateCommand(event) {
    if (this.gameStatus !== 'GAME OVER' || event.target.name === 'reset') {
      this.stateCommand.emit(event.target.name);
    }
  }

  public handleDirCommand(event) {
    if (this.gameStatus === 'Started') this.dirCommand.emit(event.target.name);
  }
}
