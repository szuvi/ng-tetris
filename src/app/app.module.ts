import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TetrisCoreModule } from 'ngx-tetris';
import { TitleScreenComponent } from './components/title-screen/title-screen.component';
import { GameScreenComponent } from './components/game-screen/game-screen.component';
import { ControlsComponent } from './components/./game-screen/controls/controls.component';
import { InfoBoxComponent } from './components/./game-screen/info-box/info-box.component';
import { GameHistoryComponent } from './components/./game-screen/game-history/game-history.component';
import { SortPipe } from './sort.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TitleScreenComponent,
    GameScreenComponent,
    ControlsComponent,
    InfoBoxComponent,
    GameHistoryComponent,
    SortPipe,
  ],
  imports: [BrowserModule, TetrisCoreModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
