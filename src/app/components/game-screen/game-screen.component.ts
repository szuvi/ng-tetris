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
import { User, GameState, Command } from '../../Interfaces';
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
  public gameStatus = GameState.paused;
  public timePassed = '0.00';
  public score = 0;

  // Component lifecycle functions

  ngOnInit(): void {
    this.timer = new Timer();
    this.interval = window.setInterval(() => {
      this.timePassed = (this.timer.getTime() / 1000).toFixed(2);
    }, 10);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  // Game  flow controllers

  public handleStateCommand(command: Command): void {
    this.tetris[command]();
    this.changeStatus(command);
    this.handleTimer(command);
    this.gameHistory.push(new HistoryStamp(command, this.timer.getTime()));
    if (command === Command.reset) {
      this.gameHistory = [];
    }
  }

  public handleDirCommand(command: Command): void {
    this.tetris[command]();
    this.gameHistory.push(new HistoryStamp(command, this.timer.getTime()));
  }

  public onLineCleared(): void {
    this.score += 10;
    this.gameHistory.push(
      new HistoryStamp(GameState.point, this.timer.getTime())
    );
  }

  public onGameOver(): void {
    this.gameStatus = GameState.gameOver;
    this.timer.pause();
    this.gameHistory.push(
      new HistoryStamp(GameState.gameOver, this.timer.getTime())
    );
  }

  public handleExit(): void {
    this.exit.emit();
  }

  // Helpers

  private changeStatus(command: Command): void {
    switch (command) {
      case Command.start:
        this.gameStatus = GameState.started;
        break;
      case Command.pause:
        this.gameStatus = GameState.paused;
        break;
      case Command.reset:
        this.gameStatus =
          this.gameStatus === GameState.gameOver
            ? GameState.paused
            : this.gameStatus;
        this.score = 0;
        break;
    }
  }

  private handleTimer(command: Command): void {
    switch (command) {
      case Command.start:
        if (this.gameStatus === GameState.gameOver) this.timer = new Timer();
        this.timer.start();
        break;
      case Command.pause:
        this.timer.pause();
        break;
      case Command.reset:
        this.timer = new Timer();
        if (this.gameStatus === GameState.started) this.timer.start();
        break;
    }
  }
}
