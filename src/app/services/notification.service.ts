import {ApplicationRef, Injectable, Injector} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ErrorMessage, InfoMessage} from '../data_types/info-message';

@Injectable()
export class NotificationService {
  message = new BehaviorSubject<InfoMessage>(null);
  timeout: any;

  constructor(private injector: Injector) {}

  // Must manually refresh page: github.com/Stabzs/Angular2-Toaster/issues/126
  private appRef: ApplicationRef;

  emitError(error: string) {
    this.emitMessageObject(new ErrorMessage(error));
  }

  emitMessage(message: string) {
    this.emitMessageObject(new InfoMessage(message));
  }

  clearMessage() {
    if (!this.appRef) {
      this.appRef = this.injector.get(ApplicationRef);
    }

    this.message.next(null);
    this.appRef.tick();
  }

  private emitMessageObject(message: InfoMessage) {
    if (!this.appRef) {
      this.appRef = this.injector.get(ApplicationRef);
    }

    clearTimeout(this.timeout);
    this.message.next(message);
    this.timeout = setTimeout(() => this.clearMessage(), 5000);
    this.appRef.tick();
  }
}
