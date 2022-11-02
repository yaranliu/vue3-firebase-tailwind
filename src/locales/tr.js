const tr = {
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
    }
}

export { tr }
