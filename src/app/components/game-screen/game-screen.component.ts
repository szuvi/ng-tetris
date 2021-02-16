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
import { User, Commands } from '../../Interfaces';
import Timer from '../../helpers/timer/Timer';
import HistoryStamp from '../../helpers/HistoryStamp/HistoryStamp';

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
  public gameHistory: Array<HistoryStamp> = [];
  public gameStatus = 'Paused';
  public timePassed = '0.00';
  public score = 0;

  // Component lifecycle functions

  ngOnInit() {
    this.timer = new Timer();
    this.interval = window.setInterval(() => {
      this.timePassed = (this.timer.getTime() / 1000).toFixed(2);
    }, 10);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  // Game  flow controllers

  public handleStateCommand(command) {
    this.tetris[Commands[command]]();
    this.changeStatus(command);
    this.handleTimer(command);
    this.gameHistory.push(new HistoryStamp(command, this.timer.getTime()));
    if (command === 'reset') {
      this.gameHistory = [];
    }
  }

  public handleDirCommand(command) {
    this.tetris[Commands[command]]();
    this.gameHistory.push(new HistoryStamp(command, this.timer.getTime()));
  }

  public onLineCleared() {
    this.score += 10;
    this.gameHistory.push(
      new HistoryStamp('line cleared', this.timer.getTime())
    );
  }

  public onGameOver() {
    this.gameStatus = 'GAME OVER';
    this.timer.pause();
    this.gameHistory.push(new HistoryStamp('game over', this.timer.getTime()));
  }

  public handleExit() {
    this.exit.emit();
  }

  // Helpers

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
