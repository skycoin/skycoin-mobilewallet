import {AbstractControl} from '@angular/forms';
export class SeedValidation {

  static MatchSeed(AC: AbstractControl) {
    const seed = AC.get('seed').value; // to get value in input tag
    const confirmSeed = AC.get('confirmSeed').value; // to get value in input tag
    if (seed !== confirmSeed) {
      AC.get('confirmSeed').setErrors( {MatchSeed: true} );
    } else {
      return null;
    }
  }
}
