import { Component, Input } from '@angular/core';
import HistoryStamp from 'src/app/helpers/HistoryStamp/HistoryStamp';

@Component({
  selector: 'game-history',
  templateUrl: './game-history.component.html',
  styleUrls: ['./game-history.component.css'],
})
export class GameHistoryComponent {
  @Input() history: Array<HistoryStamp>;
  public sortNewFirst: boolean;
  public filterVal: string;

  public handleTest(item) {
    console.log(item.checked);
  }
}
