import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class Globals {
  error: BehaviorSubject<string> = new BehaviorSubject<string>('');
  timeout: any;

  emitError(error) {
    this.error.next(error);
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {this.error.next(''); }, 3000);
  }
}
