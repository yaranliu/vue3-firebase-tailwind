import * as _ from 'lodash/string'
import {AuthErrorSource} from "./AuthErrorSource";

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
    if (this.Source === AuthErrorSource.Application) {
      let code = _.camelCase(this.Code)
      return `${prefix}.application.${code}`
    }
    else {
      let code = _.camelCase(this.Code.split("/")[1])
      return `${prefix}.firebase.${code}`
    }
  }
}