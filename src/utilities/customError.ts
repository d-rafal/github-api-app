export type CustomErrorType = "error" | "warning" | "info";

export class CustomError extends Error {
  constructor(
    message: string,
    private _messageForUser: string = "Wystąpił Błąd!",
    private _type: CustomErrorType = "error"
  ) {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }
  }

  getMessageForUser() {
    return this._messageForUser;
  }
  getType() {
    return this._type;
  }
}
