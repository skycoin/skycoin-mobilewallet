import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'address',
})
export class AddressPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string) {
    return value.substr(0, 4) + ' ... ' + value.substr(value.length - 4);
  }
}
