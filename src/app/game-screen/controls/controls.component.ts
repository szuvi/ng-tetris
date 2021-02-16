import { Component, Output, EventEmitter } from '@angular/core';
import { eventNames } from 'process';
@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css'],
})
export class ControlsComponent {
  @Output() dirCommand = new EventEmitter<string>();
  @Output() stateCommand = new EventEmitter<string>();

  public handleStateCommand(event) {
    this.stateCommand.emit(event.target.name);
  }

  public handleDirCommand(event) {
    this.dirCommand.emit(event.target.name);
  }
}
