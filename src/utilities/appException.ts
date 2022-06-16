import { ReportedExceptionCharacterType } from "../@types-and-const/@general";

export class AppException extends Error {
  constructor(
    message: string,
    private _messageForUser: string = "Wystąpił Błąd!",
    private _type: ReportedExceptionCharacterType = "error"
  ) {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppException);
    }
  }

  getMessageForUser() {
    return this._messageForUser;
  }
  getType() {
    return this._type;
  }
}
