const en = {
    navigation: {
        home: 'Home',
        about: 'About',
        dashboard: 'Dashboard',
        userButton: {
            notifications: 'Notifications',
            messages: 'Messages',
            profile: 'My profile',
            settings: 'My settings',
            signOut : 'Sign Out'
        }
    },
    views: {
        signIn :{
            title: 'Sign In'
        },
        signUp :{
            title: 'Sign Up'
        }
    },
    components: {
        signInCard : {
            emailLabel: 'Email address',
            emailPlaceholder: 'E-mail',
            passwordLabel: 'Password',
            passwordPlaceholder: 'Password',
            forgotPassword: 'Forgot password?',
            signInButton: 'Sign In',
            providersLabel: 'or continue with',
            gotoRegistration: 'Create your account now!'
        },
        signUpCard : {
            emailLabel: 'Email address',
            emailPlaceholder: 'E-mail',
            passwordLabel: 'Password',
            passwordPlaceholder: 'Password',
            confirmPasswordLabel: 'Password',
            confirmPasswordPlaceholder: 'Password',
            signUpButton: 'Sign Up',
            providersLabel: 'or continue with',
            gotoSignIn: 'Create your account now!'
        }
    },
    validation: {
        noError: '',
        signUp: {
            email: {
                required: 'Please provide your e-mail address',
                email: 'Please provide a valid email address',
            },
            password: {
                required: 'Please provide a password',
                minLength: 'You password must be minimum 6 characters',

            },
            passwordConfirmation: {
                sameAsPassword: 'Your passwords do not match'
            }
        },
        signIn: {
            email: {
                required: 'Please provide your e-mail address',
                email: 'Please provide a valid email address',
            },
            password: {
                required: 'Please provide your password',
            }
        },
        common: {
            email: 'Please provide a valid email address',
            required: 'This field cannot be empty',
            minLength: 'Please '
        }
    },
    error: {
        dialog: {
            title: 'An error occurred',
            button: 'Close'
        },
        auth: {
            firebase: {
                adminRestrictedOperation : 'adminRestrictedOperation',
                argumentError : 'argumentError',
                appNotAuthorized : 'appNotAuthorized',
                appNotInstalled : 'appNotInstalled',
                captchaCheckFailed : 'captchaCheckFailed',
                codeExpired : 'codeExpired',
                cordovaNotReady : 'cordovaNotReady',
                corsUnsupported : 'corsUnsupported',
                credentialAlreadyInUse : 'credentialAlreadyInUse',
                customTokenMismatch : 'customTokenMismatch',
                requiresRecentLogin : 'requiresRecentLogin',
                dependentSdkInitializedBeforeAuth : 'dependentSdkInitializedBeforeAuth',
                dynamicLinkNotActivated : 'dynamicLinkNotActivated',
                emailChangeNeedsVerification : 'emailChangeNeedsVerification',
                emailAlreadyInUse : 'emailAlreadyInUse',
                emulatorConfigFailed : 'emulatorConfigFailed',
                expiredActionCode : 'expiredActionCode',
                cancelledPopupRequest : 'cancelledPopupRequest',
                internalError : 'internalError',
                invalidApiKey : 'invalidApiKey',
                invalidAppCredential : 'invalidAppCredential',
                invalidAppId : 'invalidAppId',
                invalidUserToken : 'invalidUserToken',
                invalidAuthEvent : 'invalidAuthEvent',
                invalidCertHash : 'invalidCertHash',
                invalidVerificationCode : 'invalidVerificationCode',
                invalidContinueUri : 'invalidContinueUri',
                invalidCordovaConfiguration : 'invalidCordovaConfiguration',
                invalidCustomToken : 'invalidCustomToken',
                invalidDynamicLinkDomain : 'invalidDynamicLinkDomain',
                invalidEmail : 'invalidEmail',
                invalidEmulatorScheme : 'invalidEmulatorScheme',
                invalidCredential : 'invalidCredential',
                invalidMessagePayload : 'invalidMessagePayload',
                invalidMultiFactorSession : 'invalidMultiFactorSession',
                invalidOauthClientId : 'invalidOauthClientId',
                invalidOauthProvider : 'invalidOauthProvider',
                invalidActionCode : 'invalidActionCode',
                unauthorizedDomain : 'unauthorizedDomain',
                wrongPassword : 'Your password is not correct. Please try again.',
                invalidPersistenceType : 'invalidPersistenceType',
                invalidPhoneNumber : 'invalidPhoneNumber',
                invalidProviderId : 'invalidProviderId',
                invalidRecipientEmail : 'invalidRecipientEmail',
                invalidSender : 'invalidSender',
                invalidVerificationId : 'invalidVerificationId',
                invalidTenantId : 'invalidTenantId',
                multiFactorInfoNotFound : 'multiFactorInfoNotFound',
                multiFactorAuthRequired : 'multiFactorAuthRequired',
                missingAndroidPkgName : 'missingAndroidPkgName',
                missingAppCredential : 'missingAppCredential',
                authDomainConfigRequired : 'authDomainConfigRequired',
                missingVerificationCode : 'missingVerificationCode',
                missingContinueUri : 'missingContinueUri',
                missingIframeStart : 'missingIframeStart',
                missingIosBundleId : 'missingIosBundleId',
                missingOrInvalidNonce : 'missingOrInvalidNonce',
                missingMultiFactorInfo : 'missingMultiFactorInfo',
                missingMultiFactorSession : 'missingMultiFactorSession',
                missingPhoneNumber : 'missingPhoneNumber',
                missingVerificationId : 'missingVerificationId',
                appDeleted : 'appDeleted',
                accountExistsWithDifferentCredential : 'accountExistsWithDifferentCredential',
                networkRequestFailed : 'networkRequestFailed',
                nullUser : 'nullUser',
                noAuthEvent : 'noAuthEvent',
                noSuchProvider : 'noSuchProvider',
                operationNotAllowed : 'operationNotAllowed',
                operationHotSupportedInThisEnvironment : 'operationHotSupportedInThisEnvironment',
                popupBlocked : 'popupBlocked',
                popupClosedByUser : 'popupClosedByUser',
                providerAlreadyLinked : 'providerAlreadyLinked',
                quotaExceeded : 'quotaExceeded',
                redirectCancelledByUser : 'redirectCancelledByUser',
                redirectOperationPending : 'redirectOperationPending',
                rejectedCredential : 'rejectedCredential',
                secondFactorAlreadyInUse : 'secondFactorAlreadyInUse',
                maximumSecondFactorCountExceeded : 'maximumSecondFactorCountExceeded',
                tenantIdMismatch : 'tenantIdMismatch',
                timeout : 'timeout',
                userTokenExpired : 'userTokenExpired',
                tooManyRequests : 'tooManyRequests',
                unauthorizedContinueUri : 'unauthorizedContinueUri',
                unsupportedFirstFactor : 'unsupportedFirstFactor',
                unsupportedPersistenceType : 'unsupportedPersistenceType',
                unsupportedTenantOperation : 'unsupportedTenantOperation',
                unverifiedEmail : 'unverifiedEmail',
                userCancelled : 'userCancelled',
                userNotFound: 'Cannot find any user for this email',
                userDisabled : 'userDisabled',
                userMismatch : 'userMismatch',
                userSignedOut : 'userSignedOut',
                weakPassword : 'weakPassword',
                webStorageUnsupported : 'webStorageUnsupported',
                alreadyInitialized : 'alreadyInitialized'
            },
            application: {
                providerNotImplemented : 'No implementation for this provider!'
            }
        }
    }
}

export { en }
