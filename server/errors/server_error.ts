abstract class AppError {
  static status: number;
  developerMessage: string;
  userMessage: string;

  constructor(userMessage: string, developerMessage = userMessage) {
    this.userMessage = userMessage;
    this.developerMessage = developerMessage;
  }
}

export function isAppError(obj: any): obj is AppError {
  return (<AppError>obj).userMessage !== undefined && (<AppError>obj).developerMessage !== undefined;
}

export class BadRequestError extends AppError {
  static status = 400;
}

export class UnauthorizedError extends AppError {
  static status = 401;
}

export class NotFoundError extends AppError {
  static status = 403;
}

export class ConflictError extends AppError {
  static status = 409;
}

export class ServerError extends AppError {
  static status = 500;
}
