import { Directive, EventEmitter, Input, Output } from '@angular/core';

@Directive({
  selector: '[counto]',
})
export class CounttoDirective {
  @Output() countoChange = new EventEmitter();
  @Output() countoEnd = new EventEmitter();
  private _timer: any;
  private _duration: number;
  private _countTo: number;
  private _countFrom: number;
  private _step: number;

  @Input()
  set duration(duration: string) {
    this._duration = parseFloat(duration);
    this.run();
  }

  @Input()
  set countTo(countTo: string) {
    this._countTo = parseFloat(countTo);
    this.run();
  }

  @Input()
  set countFrom(countFrom: string) {
    this._countFrom = parseFloat(countFrom);
    this.run();
  }

  @Input()
  set step(step: string) {
    this._step = parseFloat(step);
    this.run();
  }

  run() {
    const _this = this;
    clearInterval(_this._timer);

    if (isNaN(_this._duration)) {
      return false;
    }

    if (isNaN(_this._step)) {
      return false;
    }

    if (isNaN(_this._countFrom)) {
      return false;
    }

    if (isNaN(_this._countTo)) {
      return false;
    }

    if (_this._step <= 0) {
      // tslint:disable-next-line:no-console
      console.info('Step must be greater than 0.');
      return false;
    }

    if (_this._duration <= 0) {
      // tslint:disable-next-line:no-console
      console.info('Duration must be greater than 0.');
      return false;
    }

    if (_this._step > _this._duration * 1000) {
      // tslint:disable-next-line:no-console
      console.info('Step must be equal or smaller than duration.');
      return false;
    }

    let intermediate = _this._countFrom;
    const increment =
      Math.abs(_this._countTo - _this._countFrom) /
      (_this._duration * 1000 / _this._step);

    _this.countoChange.emit(intermediate);

    (_this._timer = setInterval => {
      if (_this._countTo < _this._countFrom) {
        if (intermediate <= _this._countTo) {
          clearInterval(_this._timer);
          _this.countoChange.emit(_this._countTo);
          _this.countoEnd.emit();
        } else {
          _this.countoChange.emit(intermediate);
          intermediate -= increment;
        }
      } else {
        if (intermediate >= _this._countTo) {
          clearInterval(_this._timer);
          _this.countoChange.emit(_this._countTo);
          _this.countoEnd.emit();
        } else {
          _this.countoChange.emit(intermediate);
          intermediate += increment;
        }
      }
      // tslint:disable-next-line:no-unused-expression
    }),
      _this._step;
  }
}
