import { Pipe, PipeTransform } from '@angular/core';
import HistoryStamp from './helpers/HistoryStamp/HistoryStamp';

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
    console.log(filterVal);
    switch (filterVal) {
      case 'all':
        return result;
      case 'move':
        return result.filter(
          (item) =>
            item.name === 'right' ||
            item.name === 'left' ||
            item.name === 'down' ||
            item.name === 'rotate'
        );
      default:
        return result.filter((item) => item.name === filterVal);
    }
  }
}
