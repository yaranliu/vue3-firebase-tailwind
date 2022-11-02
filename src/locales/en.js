const en = {
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
        signup: {
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
        common: {
            email: 'Please provide a valid email address',
            required: 'This field cannot be empty',
            minLength: 'Please '
        }
    }
}

export { en }
