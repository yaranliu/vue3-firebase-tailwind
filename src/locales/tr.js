const tr = {
    navigation: {
        home: { md: 'Ana Sayfa', lg: 'Ana Sayfa', hint: 'Uygulama Ana Sayfası'},
        about: { md: 'Biz', lg: 'Hakkımızda', hint: 'Biz kimiz'},
        lorem: { md: 'Lorem', lg: 'Lorem Ipsum', hint: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
        user: { md: 'Sayfam', lg: 'Benim sayfam', hint: '' },
        dashboard: { md: 'Panel', lg: 'Kullanıcı paneli', hint: 'Kullanıcı paneli'},
        changeTheme: { md: 'Tema', lg: 'Temayı değiştir', hint: 'Uygulama arka plan görünümünü değiştir'},
        action1: { md: '', lg: 'Komut 1', hint: ''},
        action2: { md: '', lg: 'Komut 2', hint: 'Ana'},
        action3: { md: '', lg: 'Komut 3', hint: ''},
        userButton: {
            notifications: 'Bildirimler',
            messages: 'Mesajlar',
            profile: 'Profilim',
            settings: 'Ayarlarım',
            signOut : 'Çıkış yap'
        }
    },
    views: {
        signIn :{
            title: 'Giriş Yapın'
        },
        signUp :{
            title: 'Kayıt Olun'
        },
    },
    components: {
        signInCard : {
            emailLabel: 'E posta adresi',
            emailPlaceholder: 'E-posta',
            passwordLabel: 'Parola',
            passwordPlaceholder: 'Parola',
            forgotPassword: 'Parolamı unuttum',
            signInButton: 'Giriş yapın',
            providersLabel: 'ya da sosyal medya hesabınızı kullanın',
            gotoRegistration: 'Hemen bir hesap oluşturun!'
        },
        signUpCard : {
            emailLabel: 'E posta adresi',
            emailPlaceholder: 'E-posta',
            passwordLabel: 'Parola',
            passwordPlaceholder: 'Parola',
            confirmPasswordLabel: 'Parola (tekrar)',
            confirmPasswordPlaceholder: 'Parola (tekrar)',
            signUpButton: 'Kaydol',
            providersLabel: 'ya da sosyal medya hesabınızı kullanın',
            gotoSignIn: 'Zaten bir hesabım var!'
        }
    },
    validation: {
        noError: '',
        signUp: {
            email: {
                required: 'Lütfen e-posta adresinizi yazın',
                email: 'Lütfen geçerli bir e-posta adresi yazın',
            },
            password: {
                required: 'Lütfen parolanızı yazın',
                minLength: 'Parolanız en az 6 karakter uzunluğunda olmalıdır',

            },
            passwordConfirmation: {
                sameAsPassword: 'Parolanız uyuşmuyor'
            }
        },
        signIn: {
            email: {
                required: 'Lütfen e-posta adresinizi yazın',
                email: 'Lütfen e-posta adresinizi yazın',
            },
            password: {
                required: 'Lütfen parolanızı yazın',
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
            title: 'Bir hata oluştu',
            button: 'Kapat'
        },
        auth: {
            none: '',
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
                wrongPassword : 'Parolanız hatalı, lütfen tekrar deneyin',
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
                userNotFound: 'Bu e-posta adresine kayıtlı bir kullanıcı bulunamadı.',
                userDisabled : 'userDisabled',
                userMismatch : 'userMismatch',
                userSignedOut : 'userSignedOut',
                weakPassword : 'weakPassword',
                webStorageUnsupported : 'webStorageUnsupported',
                alreadyInitialized : 'alreadyInitialized'
            },
            application: {
                providerNotImplemented : 'Bu sağlayıcı için implementasyon yapılmadı'
            }
        }
    }
}

export { tr }
