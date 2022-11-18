import { defineStore } from 'pinia'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword, signInWithPopup, signOut,
    GoogleAuthProvider, TwitterAuthProvider, GithubAuthProvider, FacebookAuthProvider,
    onAuthStateChanged
} from "firebase/auth";

import { inject } from "vue";

import { AuthError } from "@/components/auth/AuthError"
import { AuthenticationProvider } from "@/components/auth/AuthenticationProvider";
import { AuthErrorSource } from "@/components/auth/AuthErrorSource";
import { ApplicationAuthError, getApplicationAuthErrorMessage} from "@/components/auth/ApplicationAuthErrors";

import { useRouter } from "vue-router";

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        provider: AuthenticationProvider.None,
        stateChecked: false,
        inProgress: false,
        user: null,
        credential: null,
        error: new AuthError(AuthErrorSource.None,'', ''),
        header: null,
    }),
    actions: {
        register(email, password) {
            this.inProgress = true
            this.error.clear()
            return new Promise((resolve, reject) => {
                createUserWithEmailAndPassword(getAuth(), email, password)
                    .then((userCredential) => {
                        this.user = userCredential.user;
                        this.provider = AuthenticationProvider.Password
                        resolve(this.user);
                    })
                    .catch((error) => {
                        this.error = new AuthError(AuthErrorSource.Firebase, error.code, error.message)
                        reject(error)
                    })
                    .finally(() => {
                        setTimeout(() => { this.inProgress = false }, 100)
                    })
                ;
            })
        },
        signIn(email, password) {
            this.inProgress = true
            this.error.clear()
            return new Promise((resolve, reject) => {
                signInWithEmailAndPassword(getAuth(), email, password)
                    .then((userCredential) => {
                        this.user = userCredential.user;
                        this.provider = AuthenticationProvider.Password
                        resolve(this.user)
                    })
                    .catch((error) => {
                        this.error = new AuthError(AuthErrorSource.Firebase, error.code, error.message)
                        reject(error);
                    })
                    .finally(() => {
                        setTimeout(() => { this.inProgress = false }, 100)
                    })
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

        signInWithProvider(authenticationProvider) {
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
                            reject(error);
                        })
                        .finally(() => {
                            setTimeout(() => { this.inProgress = false }, 100)
                        });
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
                        resolve();
                    })
                    .catch((error) => {
                        this.error = this.error = new AuthError(AuthErrorSource.Firebase, error.code, error.message)
                        reject(error);
                    })
                    .finally(() => {
                        this.inProgress = false
                    });
            })
        },

        setup () {

            const router = useRouter()
            const $axios = inject("$axios")
            this.inProgress = true
            onAuthStateChanged(getAuth(), (user) => {
                const urlSearchParams = new URLSearchParams(window.location.search);
                const params = Object.fromEntries(urlSearchParams.entries());
                this.user = user;
                delete $axios.defaults.headers.common["Authorization"]
                if (user !== null) {
                    user.getIdToken().then(
                        result => {
                            // $axios.defaults.headers.common['Authorization'] = `Bearer ${result}`
                            this.header = `Bearer ${result}`
                            if (router && params.redirect) {
                                router.push({ name: params.redirect})
                            }
                        })
                        .catch(error => {
                            this.error = new AuthError(AuthErrorSource.Firebase, error.code, error.message)
                        })
                        .finally(() => {
                            this.stateChecked = true
                            setTimeout(() => { this.inProgress = false }, 500)
                        })
                } else {
                    this.inProgress = false;
                }
            })
        }
    },
    getters: {
        isAuthenticated() {
            return this.user !== null;
        },
        email() {
            return this.user !== null ? this.user.email : ''
        },
        displayName() {
            if (this.user !== null) {
                return this.user.displayName === null || this.user.displayName === '' ? this.user.email : this.user.displayName;
            }
            else return ''
        },
        displayNameIsEmail() {
            return this.user !== null && (this.user.displayName === null || this.user.displayName === '')
        },
        hasAvatar() {
            return this.user !== null && this.user.photoURL !== null && this.user.photoURL !== '';
        },
        avatar() {
            return this.hasAvatar ? this.user.photoURL : '';
        }
    }
})
