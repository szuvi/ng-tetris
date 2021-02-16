import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { TetrisCoreComponent } from 'ngx-tetris';
import { User, Commands } from '../Interfaces';
import Timer from '../timer/Timer';
@Component({
  selector: 'app-game-screen',
  templateUrl: './game-screen.component.html',
  styleUrls: ['./game-screen.component.css'],
})
export class GameScreenComponent implements OnInit, OnDestroy {
  @Input() user: User;
  @Output() exit = new EventEmitter<void>();
  @ViewChild(TetrisCoreComponent)
  private tetris: TetrisCoreComponent;
  private timer: Timer;
  private interval: number;
  public gameStatus = 'Paused';
  public timePassed = '0.00';
  public score = 0;

  ngOnInit() {
    this.timer = new Timer();
    this.interval = window.setInterval(() => {
      this.timePassed = (this.timer.getTime() / 1000).toFixed(2);
    }, 10);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  public handleStateCommand(command) {
    // Game Control
    this.tetris[Commands[command]]();
    // Game Status Control
    this.changeStatus(command);
    // Handle Timer;
    this.handleTimer(command);
  }

  public handleDirCommand(command) {
    this.tetris[Commands[command]]();
  }

  public onLineCleared() {
    this.score += 10;
  }

  public onGameOver() {
    this.gameStatus = 'GAME OVER';
    this.timer.pause();
  }

  public handleExit() {
    this.exit.emit();
  }

  private changeStatus(command) {
    switch (command) {
      case 'start':
        this.gameStatus = 'Started';
        break;
      case 'pause':
        this.gameStatus = 'Paused';
        break;
      case 'reset':
        this.gameStatus =
          this.gameStatus === 'GAME OVER' ? 'Paused' : this.gameStatus;
        this.score = 0;
        break;
    }
  }

  private handleTimer(command) {
    switch (command) {
      case 'start':
        if (this.gameStatus === 'GAME OVER') this.timer = new Timer();
        this.timer.start();
        break;
      case 'pause':
        this.timer.pause();
        break;
      case 'reset':
        this.timer = new Timer();
        if (this.gameStatus === 'Started') this.timer.start();
        break;
    }
  }
}
