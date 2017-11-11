import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';

@Injectable()
export class StorageApiProvider {

  constructor(
    private platform: Platform,
    private storage: Storage,
  ) {}

  get(key: string): Observable<any> {
    return Observable.fromPromise(this.platform.ready().then(() => this.storage.get(key)))
      .map(value => JSON.parse(value));
  }

  set(key: string, value: any) {
    return Observable.fromPromise(this.platform.ready().then(() => this.storage.set(key, JSON.stringify(value))));
  }
}
