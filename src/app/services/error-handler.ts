import {ApplicationRef, ErrorHandler, Injectable, Injector} from '@angular/core';
import {NotificationService} from './notification.service';
import {HttpErrorResponse} from '@angular/common/http';
import {isAppError, ServerError} from '../../../server/errors/server_error';


@Injectable()
export class IiglErrorHandler implements ErrorHandler {
  constructor(private notifier: NotificationService) {}

  public handleError(error: any) {
    console.error(error);

    if (error instanceof HttpErrorResponse && isAppError(error.error)) {
      this.notifier.emitError((<ServerError>error.error).userMessage);
    } else if (error.hasOwnProperty('message') && error.message) {
      this.notifier.emitError(error.message);
    } else if (typeof error === 'string') {
      this.notifier.emitError(error);
    } else {
      this.notifier.emitError('Something went wrong :(');
    }
  }
}

