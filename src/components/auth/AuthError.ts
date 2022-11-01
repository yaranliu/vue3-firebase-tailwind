import { AuthErrorSource } from "./AuthErrorSource";

export class AuthError {
  Source: AuthErrorSource;
  Code: string;
  Message: string;
  constructor(source: AuthErrorSource, code: string, message: string) {
    this.Source = source
    this.Code = code
    this.Message = message;
  }
  clear() {
    this.Source = AuthErrorSource.None
    this.Code = ''
    this.Message = ''
  }
}
