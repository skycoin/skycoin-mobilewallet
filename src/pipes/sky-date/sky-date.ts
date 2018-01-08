import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the SkyDatePipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'sky-date',
})
export class SkyDatePipe implements PipeTransform {
  /**
   * Takes a value and makes it transform like the design.
   */
  transform(value: string) {
    let _value: string = '';
    let _date = new Date(Number.parseInt(value));
    let _now = new Date();

    let _dateDif = _now.getTime() - _date.getTime();
    let _dateDay = _date.getDate();
    let _dateMonth = _date.getMonth();
    let _dateYear = _date.getFullYear();
    let _nowDay = _now.getDate();
    let _nowMonth = _now.getMonth();
    let _nowYear = _now.getFullYear();

    if(_dateDif <= 60000){
      _value = 'Just now!';
    } else if(_dateDif > 60000 && _dateDif < 600000){
      _value = 'Minutes ago';
    } else if(_dateDay == _nowDay && _dateMonth == _nowMonth && _dateYear == _nowYear){
      _value = 'Today'
    } else {
      _value = this.getDateString(_dateDay, _dateMonth, _dateYear);
    }

    return _value;
  }

  private getDateString(day: number, month: number, year: number){
    let months = ['January', 'February', 'March', 'May', 'April', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let _value = 'Month Day, Year';
    _value = _value.replace('Month', months[month]);
    _value = _value.replace('Year', year.toString());

    if(day < 10){
      _value = _value.replace('Day', '0'+day);
    } else {
      _value = _value.replace('Day', day.toString());
    }

    return _value;
  }
}
