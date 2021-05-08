import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { TetrisCoreComponent } from 'ngx-tetris';
import { GameState, Command } from '../../Interfaces';
import Timer from '../../helpers/timer/Timer';
import HistoryStamp from '../../helpers/HistoryStamp/HistoryStamp';
import { UserDataService } from 'src/app/user-data.service';
import { Router } from '@angular/router';
import { ScoresService } from 'src/app/scores.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game-screen',
  templateUrl: './game-screen.component.html',
  styleUrls: ['./game-screen.component.css'],
})
export class GameScreenComponent implements OnInit, OnDestroy {
  constructor(
    private _userService: UserDataService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _scores: ScoresService
  ) {
    this._route.params.subscribe(({ colorPalette }) => {
      this.colorPalette = colorPalette;
      console.log(colorPalette);
    });
  }
  @Output() exit = new EventEmitter<void>();
  @ViewChild(TetrisCoreComponent)
  private tetris: TetrisCoreComponent;
  private timer: Timer;
  private interval: number;
  public gameHistory: Array<HistoryStamp> = [];
  public gameStatus = GameState.paused;
  public timePassed = '0.00';
  public score = 0;
  public user = this._userService.getUserData();
  public colorPalette: string;
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
    this._scores.submitScore(this.score).subscribe((res) => {});
  }

  public handleExit(): void {
    this._router.navigate(['/login']);
  }

  public togglePalette(): void {
    const param = this.colorPalette === 'normal' ? 'highContrast' : 'normal';
    console.log(this.colorPalette);
    console.log(param);
    this._router.navigate(['/game', param]);
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
