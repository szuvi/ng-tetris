import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TetrisCoreModule } from 'ngx-tetris';
import { TitleScreenComponent } from './components/title-screen/title-screen.component';
import { GameScreenComponent } from './components/game-screen/game-screen.component';
import { ControlsComponent } from './components/./game-screen/controls/controls.component';
import { InfoBoxComponent } from './components/./game-screen/info-box/info-box.component';
import { GameHistoryComponent } from './components/./game-screen/game-history/game-history.component';
import { SortPipe } from './sort.pipe';
import { RouterModule } from '@angular/router';
import { UserFormComponent } from './components/title-screen/user-form/user-form.component';

@NgModule({
  declarations: [
    AppComponent,
    TitleScreenComponent,
    GameScreenComponent,
    ControlsComponent,
    InfoBoxComponent,
    GameHistoryComponent,
    SortPipe,
    UserFormComponent,
  ],
  imports: [
    BrowserModule,
    TetrisCoreModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'login', component: TitleScreenComponent },
      { path: 'game', component: GameScreenComponent },
      { path: '**', component: TitleScreenComponent },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
