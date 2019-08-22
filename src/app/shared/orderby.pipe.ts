import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderby'
})
export class OrderbyPipe implements PipeTransform {

  transform(items: any, field: string, reverse: boolean = false): any {

    // no array
    if (!items || !field || field === '') {
      return items;
    }

    // array with only one item
    if (items.length <= 1) { return items; }

    if (field) {
      items.sort((a, b) => a[field] > b[field] ? 1 : -1);
    }
    else {
      items.sort((a, b) => a > b ? 1 : -1);
    }

    if (reverse) {
      items.reverse();
    }

    return items;
  }

}
