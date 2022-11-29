import {defineStore} from 'pinia'

import {
    createUserWithEmailAndPassword,
    FacebookAuthProvider,
    getAuth,
    GithubAuthProvider,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    TwitterAuthProvider
} from "firebase/auth";

import {inject} from "vue";

import {AuthError} from "@/components/auth/AuthError"
import {AuthenticationProvider} from "@/components/auth/AuthenticationProvider";
import {AuthErrorSource} from "@/components/auth/AuthErrorSource";
import {ApplicationAuthError, getApplicationAuthErrorMessage} from "@/components/auth/ApplicationAuthErrors";

import {useRouter} from "vue-router";
import type {Axios} from "axios";

interface IAuthState {
    provider: AuthenticationProvider,
    stateChecked: boolean,
    inProgress: boolean,
    user: any,
    credential: any,
    error: AuthError,
    header: string,
}

export const useAuthStore = defineStore({
    id: 'auth',
    // state: () => (new AuthState()),
    state: () : IAuthState => {
        return {
            provider: AuthenticationProvider.None,
            stateChecked: false,
            inProgress: false,
            user: null,
            credential: null,
            error: new AuthError(AuthErrorSource.None, '', ''),
            header: ''
        }
    },
    actions: {
        register(email: string, password: string) {
            this.inProgress = true
            this.error.clear()
            return new Promise((resolve, reject) => {
                createUserWithEmailAndPassword(getAuth(), email, password)
                    .then((userCredential) => {
                        this.user = userCredential.user;
                        this.provider = AuthenticationProvider.Password
                        setTimeout(() => { this.inProgress = false }, 100)
                        resolve(this.user);
                    })
                    .catch((error) => {
                        this.error = new AuthError(AuthErrorSource.Firebase, error.code, error.message)
                        setTimeout(() => { this.inProgress = false }, 100)
                        reject(error)
                    })
                // .finally(() => {
                //     setTimeout(() => { this.inProgress = false }, 100)
                // })
                ;
            })
        },
        signIn(email: string, password: string) {
            this.inProgress = true
            this.error.clear()
            return new Promise((resolve, reject) => {
                signInWithEmailAndPassword(getAuth(), email, password)
                    .then((userCredential) => {
                        this.user = userCredential.user;
                        this.provider = AuthenticationProvider.Password
                        setTimeout(() => { this.inProgress = false }, 100)
                        resolve(this.user)
                    })
                    .catch((error) => {
                        this.error = new AuthError(AuthErrorSource.Firebase, error.code, error.message)
                        setTimeout(() => { this.inProgress = false }, 100)
                        reject(error);
                    })
                // .finally(() => {
                //     setTimeout(() => { this.inProgress = false }, 100)
                // })
            })
        },

        getAuthProvider() {
            switch (this.provider) {
                case AuthenticationProvider.Google :return new GoogleAuthProvider();
                case AuthenticationProvider.Twitter : return new TwitterAuthProvider();
                default: return null;
            }
        },

        // TODO: Implement Oauth2, Apple, LinkedIn

        signInWithProvider(authenticationProvider: AuthenticationProvider) {
            this.provider = authenticationProvider
            this.inProgress = true
            this.error.clear()
            return new Promise((resolve, reject) => {
                const provider = this.getAuthProvider()
                if (provider) {
                    signInWithPopup(getAuth(), provider)
                        .then((result) => {
                            switch (authenticationProvider) {
                                case AuthenticationProvider.Google : this.credential = GoogleAuthProvider.credentialFromResult(result); break;
                                case AuthenticationProvider.Github : this.credential = GithubAuthProvider.credentialFromResult(result); break;
                                case AuthenticationProvider.Twitter : this.credential = TwitterAuthProvider.credentialFromResult(result); break;
                                case AuthenticationProvider.Facebook : this.credential = FacebookAuthProvider.credentialFromResult(result); break;
                                default: this.credential = null
                            }
                            this.user = result.user
                            setTimeout(() => { this.inProgress = false }, 100)
                            resolve(this.user)
                        })
                        .catch((error) => {
                            this.error = new AuthError(AuthErrorSource.Firebase, error.code, error.message)
                            switch (authenticationProvider) {
                                case AuthenticationProvider.Google : this.credential = GoogleAuthProvider.credentialFromError(error); break;
                                case AuthenticationProvider.Github : this.credential = GithubAuthProvider.credentialFromError(error); break;
                                case AuthenticationProvider.Twitter : this.credential = TwitterAuthProvider.credentialFromError(error); break;
                                case AuthenticationProvider.Facebook : this.credential = FacebookAuthProvider.credentialFromError(error); break;
                                default: this.credential = null
                            }
                            setTimeout(() => { this.inProgress = false }, 100)
                            reject(error);
                        })
                    // .finally(() => {
                    //     setTimeout(() => { this.inProgress = false }, 100)
                    // });
                }
                else {
                    this.error = new AuthError(AuthErrorSource.Application, ApplicationAuthError.ProviderNotImplemented, getApplicationAuthErrorMessage(ApplicationAuthError.ProviderNotImplemented))
                    this.inProgress = false
                    reject(ApplicationAuthError.ProviderNotImplemented)
                }
            })
        },

        signOut() {
            this.inProgress = true
            this.error.clear()
            return new Promise((resolve, reject) => {
                signOut(getAuth())
                    .then(() => {
                        this.user = null;
                        this.inProgress = false
                        resolve(true);
                    })
                    .catch((error) => {
                        this.error = this.error = new AuthError(AuthErrorSource.Firebase, error.code, error.message)
                        this.inProgress = false
                        reject(error);
                    })
                // .finally(() => {
                //     this.inProgress = false
                // });
            })
        },

        setup () {
            const router = useRouter()
            const $axios = inject<Axios>("$axios")
            this.inProgress = true
            onAuthStateChanged(getAuth(), (user) => {
                const urlSearchParams = new URLSearchParams(window.location.search);
                let redirect = ''
                for (const [key, value] of urlSearchParams.entries()) {
                    if (key.toLowerCase() === 'redirect') redirect = value
                }
                this.user = user;
                if (user !== null) {
                    user.getIdToken().then(
                        result => {
                            // $axios.defaults.headers.common['Authorization'] = `Bearer ${result}`
                            this.header = `Bearer ${result}`
                            if (router && redirect !== '') {
                                router.push({ name: redirect})
                            }
                            this.stateChecked = true
                            setTimeout(() => { this.inProgress = false }, 500)
                        })
                        .catch(error => {
                            this.error = new AuthError(AuthErrorSource.Firebase, error.code, error.message)
                            this.stateChecked = true
                            setTimeout(() => { this.inProgress = false }, 500)
                        })
                    // .finally(() => {
                    //     this.stateChecked = true
                    //     setTimeout(() => { this.inProgress = false }, 500)
                    // })
                } else {
                    this.inProgress = false;
                }
            })
        }
    },
    getters: {
        isAuthenticated():boolean {
            return this.user !== null;
        },
        email(): string {
            return this.user !== null ? this.user.email : ''
        },
        displayName(): string {
            if (this.user !== null) {
                return this.user.displayName === null || this.user.displayName === '' ? this.user.email : this.user.displayName;
            }
            else return ''
        },
        displayNameIsEmail(): boolean {
            return this.user !== null && (this.user.displayName === null || this.user.displayName === '')
        },
        hasAvatar(): boolean {
            return this.user !== null && this.user.photoURL !== null && this.user.photoURL !== '';
        },
        avatar(): string {
            return this.hasAvatar ? this.user.photoURL : '';
        }
    }
})
