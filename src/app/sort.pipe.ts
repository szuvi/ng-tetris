import { Pipe, PipeTransform } from '@angular/core';
import HistoryStamp from './helpers/HistoryStamp/HistoryStamp';
import { Command } from './Interfaces';
@Pipe({
  name: 'sortAndFilter',
})
export class SortPipe implements PipeTransform {
  transform(
    history: Array<HistoryStamp>,
    sortOld = true,
    filterVal = null
  ): Array<HistoryStamp> | null {
    if (!history) {
      return null;
    }
    let result = history;
    if (sortOld) {
      result = history.sort(
        (itemA, itemB) => itemA.timeStamp - itemB.timeStamp
      );
    } else {
      result = history.sort(
        (itemA, itemB) => itemB.timeStamp - itemA.timeStamp
      );
    }

    switch (filterVal) {
      case 'all':
        return result;
      case 'move':
        return result.filter(
          (item) =>
            item.name === Command.right ||
            item.name === Command.left ||
            item.name === Command.down ||
            item.name === Command.rotate
        );
      default:
        return result.filter((item) => item.name === filterVal);
    }
  }
}
