import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timer, Observable, Subscription } from 'rxjs';
import { concatMap, filter } from 'rxjs/operators';
import { ScoresService } from 'src/app/scores.service';
import { UserDataService } from 'src/app/user-data.service';

@Component({
  selector: 'app-high-scores',
  templateUrl: './high-scores.component.html',
  styleUrls: ['./high-scores.component.css'],
})
export class HighScoresComponent {
  constructor(
    private _scores: ScoresService,
    private _router: Router,
    private _user: UserDataService
  ) {
    this.scoresData$ = timer(0, 3000).pipe(
      filter(() => this.autoRefresh),
      concatMap(() => this._scores.load())
    );
  }

  public scoresData$: Observable<any>;
  public scoresData = [];
  public sortAscending = false;
  public nameFilter = this._user.getUserData().name;
  public autoRefresh = true;

  toggleAscending() {
    this.sortAscending = !this.sortAscending;
  }

  return() {
    this._router.navigate(['/game']);
  }
}
