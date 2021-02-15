import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TetrisCoreModule } from 'ngx-tetris';
import { TitleScreenComponent } from './title-screen/title-screen.component';
import { GameScreenComponent } from './game-screen/game-screen.component';
import { ControlsComponent } from './game-screen/controls/controls.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TitleScreenComponent,
    GameScreenComponent,
    ControlsComponent,
  ],
  imports: [BrowserModule, TetrisCoreModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
