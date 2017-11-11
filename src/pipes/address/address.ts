import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the AddressPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
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
