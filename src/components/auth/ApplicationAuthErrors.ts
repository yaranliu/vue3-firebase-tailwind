import {AuthErrorSource} from "./AuthErrorSource";

const enum ApplicationAuthError {
  ProviderNotImplemented = 'provider-not-implemented'
}

class ApplicationAuthErrorMessage {
  Code: ApplicationAuthError
  Message: string

  constructor(Code: ApplicationAuthError, Message: string) {
    this.Code = Code
    this.Message = Message
  }
}

const ApplicationAuthErrorMessages: ApplicationAuthErrorMessage[] = [
  new ApplicationAuthErrorMessage(ApplicationAuthError.ProviderNotImplemented, "No implementation found for authentication provider")
]

const getApplicationAuthErrorMessage =  (Code: ApplicationAuthError) => {
  let error = ApplicationAuthErrorMessages.find(e => e.Code === Code)
  return error ? error.Message : ''
}

export {
  ApplicationAuthError,
  getApplicationAuthErrorMessage
}
