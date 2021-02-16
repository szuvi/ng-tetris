import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { TetrisCoreComponent } from 'ngx-tetris';
import { User, Commands } from '../Interfaces';
import Timer from '../timer/Timer';
@Component({
  selector: 'app-game-screen',
  templateUrl: './game-screen.component.html',
  styleUrls: ['./game-screen.component.css'],
})
export class GameScreenComponent {
  @Input() user: User;
  @ViewChild(TetrisCoreComponent)
  private tetris: TetrisCoreComponent;

  public gameStatus = 'Paused';
  public timePassed = '123';
  public score = 0;

  public handleStateCommand(command) {
    // Game Control
    this.tetris[Commands[command]]();
    // Game Status Control
    this.changeStatus(command);
  }

  public handleDirCommand(command) {
    this.tetris[Commands[command]]();
  }

  public onLineCleared() {
    this.score += 10;
  }

  public onGameOver() {
    this.gameStatus = 'GAME OVER';
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
        break;
    }
  }
}
