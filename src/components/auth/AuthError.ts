import camelCase from 'lodash/camelCase'
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
  toLocaleString() {
    const prefix = 'error.auth'
    if (this.Source === AuthErrorSource.None) return 'error.auth.none'
    else if (this.Source === AuthErrorSource.Application) {
      let code = camelCase(this.Code)
      return `${prefix}.application.${code}`
    }
    else {
      let code = camelCase(this.Code.split("/")[1])
      return `${prefix}.firebase.${code}`
    }
  }
}
