import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'


import App from './App.vue'
import router from './router'

import './assets/main.css'

import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FB_API_KEY,
    authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FB_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FB_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FB_APPID,
};

initializeApp(firebaseConfig);

import { en } from "@/locales/en";
import { tr } from "@/locales/tr";

const i18n = createI18n({
    legacy: true,
    locale: 'tr',
    fallbackLocale: 'en',
    messages: {
        'en': en,
        'tr': tr,
    }
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

import vFocus from './directives/vFocus'
app.directive('focus', vFocus)

import axios from 'axios'
app.provide('$axios', axios)

app.mount('#app')
