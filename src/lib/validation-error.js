const i18nValidationRoot = 'validation'
const i18nErrorMessage = (error, inView) => {
    if (error) {
        return `${i18nValidationRoot}.${inView}.${error.$property}.${error.$validator}`
    }
    return `${i18nValidationRoot}.noError`
}

export { i18nErrorMessage }
