import type { ErrorObject } from "@vuelidate/core"

const i18nValidationRoot = 'validation'
const i18nErrorMessage = (error: ErrorObject ) : string => {
    if (error) {
        return `${i18nValidationRoot}.${error.$property}.${error.$validator}`
    }
    return `${i18nValidationRoot}.noError`
}

export { i18nErrorMessage }
