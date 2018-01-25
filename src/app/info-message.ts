export class InfoMessage {
  readonly message: string;
  constructor(message?: string) {
    this.message = message || '';
  }
}

export class ErrorMessage extends InfoMessage {}
