import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByName',
})
export class FilterByNamePipe implements PipeTransform {
  transform(scores, nameValue = ''): unknown {
    if (nameValue != '') {
      return scores.filter((score) =>
        score.name.toLowerCase().includes(nameValue.toLowerCase())
      );
    }
    return scores;
  }
}
