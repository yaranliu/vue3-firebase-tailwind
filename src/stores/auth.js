import { defineStore } from 'pinia'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword, signInWithPopup, signOut,
    GoogleAuthProvider, TwitterAuthProvider, GithubAuthProvider,
    onAuthStateChanged
} from "firebase/auth";

import { inject } from "vue";

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        inProgress: false,
        user: null,
        error: null,
    }),
    actions: {
        register(email, password) {
            this.inProgress = true
            return new Promise((resolve, reject) => {
                createUserWithEmailAndPassword(getAuth(), email, password)
                    .then((userCredential) => {
                        this.user = userCredential.user;
                        resolve(this.user);
                    })
                    .catch((error) => {
                        reject(error)
                    })
                    .finally(() => {
                        this.inProgress = false
                    })
                ;
            })
        },
        signIn(email, password) {
            this.inProgress = true
            return new Promise((resolve, reject) => {
                signInWithEmailAndPassword(getAuth(), email, password)
                    .then((userCredential) => {
                        this.user = userCredential.user;
                        resolve(this.user)
                    })
                    .catch((error) => {
                        reject(error);
                    })
                    .finally(() => {
                        this.inProgress = false
                    })
            })
        },
        signInWithGoogle() {
            this.inProgress = true
            return new Promise((resolve, reject) => {
                const provider = new GoogleAuthProvider();
                signInWithPopup(getAuth(), provider)
                    .then((result) => {
                        this.user = result.user;
                        resolve(this.user)
                    })
                    .catch((error) => {
                        reject(error);
                    })
                    .finally(() => {
                        this.inProgress = false
                    });
            })
        },
        signOut() {
            this.inProgress = true
            return new Promise((resolve, reject) => {
                signOut(getAuth())
                    .then(() => {
                        this.user = null;
                        resolve();
                    })
                    .catch((error) => {
                        reject(error);
                    })
                    .finally(() => {
                        this.inProgress = false
                    });
            })
        },
        setup () {
            const $axios = inject("$axios")
            this.inProgress = true
            onAuthStateChanged(getAuth(), (user) => {
                this.user = user;
                delete $axios.defaults.headers.common["Authorization"]
                if (user !== null) {
                    user.getIdToken().then(result => { $axios.defaults.headers.common['Authorization'] = `Bearer ${result}` })
                        .catch(error => { console.log(error) })
                        .finally(() => {this.inProgress = false})
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
        displayName() {
            if (this.user !== null) {
                return this.user.displayName === null || this.user.displayName === '' ? this.user.email : this.user.displayName;
            }
            else return ''
        },
        hasAvatar() {
            return this.user !== null && this.user.photoURL !== null && this.user.photoURL !== '';
        },
        avatar() {
          return this.hasAvatar() ? this.user.photoURL : '';
        }
    }
})
