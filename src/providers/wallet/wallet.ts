import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

@Injectable()
export class WalletProvider {

  constructor(
    private file: File,
  ) { }

  all() {
    return Observable.fromPromise(this.file.listDir(this.file.externalRootDirectory, 'superwallet'))
      .map(files => files.filter(file => file.name.substr(file.name.length - 4) === '.wlt'));
  }
}
