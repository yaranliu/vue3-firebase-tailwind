const i18nValidationRoot = 'validation'
const i18nErrorMessage = (error) => {
    if (error) {
        return `${i18nValidationRoot}.${error.$property}.${error.$validator}`
    }
    return `${i18nValidationRoot}.noError`
}

export { i18nErrorMessage }
