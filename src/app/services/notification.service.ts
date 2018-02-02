import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ErrorMessage, InfoMessage} from '../data_types/info-message';

@Injectable()
export class NotificationService {
  message = new BehaviorSubject<InfoMessage>(null);
  timeout: any;

  emitError(error: string) {
    this.emitMessageObject(new ErrorMessage(error));
  }

  emitMessage(message: string) {
    this.emitMessageObject(new InfoMessage(message));
  }

  clearMessage() {
    this.message.next(null);
  }

  private emitMessageObject(message: InfoMessage) {
    clearTimeout(this.timeout);
    this.message.next(message);
    this.timeout = setTimeout(() => {this.message.next(null); }, 3000);
  }
}
