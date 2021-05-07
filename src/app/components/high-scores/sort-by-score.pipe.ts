import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByScore',
})
export class SortByScorePipe implements PipeTransform {
  transform(scores, ascending: boolean = false): unknown {
    return scores
      .sort((a, b) => {
        if (ascending) {
          return a.score - b.score;
        }
        return b.score - a.score;
      })
      .slice(0, 10);
  }
}
