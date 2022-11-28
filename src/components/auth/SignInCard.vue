<script setup>
import {computed, reactive, onMounted } from 'vue'

import { useAuthStore} from "@/stores/auth";
import { useRouter } from "vue-router";
import { AuthErrorCodes } from "firebase/auth";
import SignInWithProviders from "@/components/auth/SignInWithProviders.vue";

import { appAuthProviders } from "/src/components/auth/app-auth-providers.ts"

import { useI18n } from "vue-i18n";
import { useVuelidate } from '@vuelidate/core'
import {required, email } from '@vuelidate/validators'
import { i18nErrorMessage} from "@/lib/i18nErrorMessage"
const auth = useAuthStore();


const router = useRouter()


const { t } = useI18n()

const user = reactive({
  email: '',
  password: '',
})

onMounted(() => {
  // console.log('[SignInCard] Auth is:', auth.isAuthenticated)
})



const rules = computed (() => { return {
  email: { required, email },
  password: { required },
}})

const redirect = computed(() => {
  return router.currentRoute.value.query.redirect ? router.currentRoute.value.query.redirect : ''
})

const v$ = useVuelidate(rules, user, { $autoDirty: true })

const emit = defineEmits(['gotoSignUp', 'signedIn', 'signInStarted', 'signInEnded', 'errorEncountered'])

const signInWithPassword = () => {
  emitStarted({ method: 'password' })
  auth.signIn(user.email, user.password).then(user => {
    // console.log('[SignInCard] signed in with password, Redirect:', redirect.value)
    // console.log('[SignInCard] signed in with password, User:', user.uid)
    // emitSignedIn({ redirect : redirect.value })
    emit('signedIn', { redirect: redirect.value, user: user })
  }).catch(error => {
    emitError(error)
    if (error.code === AuthErrorCodes.USER_DELETED) {
      // console.log('[SignInCard] User not found')
    }
  }).finally(() => {
    emitEnded('password')
  });
}

const signedInWithProvider = (event) => {
  // console.log('[SignInCard] Signed In with provider', auth.user.uid)
  emitSignedIn({ redirect: redirect.value } )
}

const emitSignedIn = (event) => {
  // console.log(('[SignInCard] emitting signed in:', event))
  if (event)  emit('signedIn', event)
  else emit('signedIn', '')
}
const emitStarted = (args) => {
  // console.log(('[SignInCard] emitting sign in start:', args))
  emit('signInStarted', args)
}
const emitEnded = (event) => {
  emit('signInEnded', event)
}
const emitError = (event) => {
  emit('errorEncountered', event)
}

</script>
<template>
  <div class="auth-card">
    <label for="user-email" class="auth-input-label">{{ t('emailLabel') }}</label>
    <input id="user-email" type="email" autocomplete="e-mail" :placeholder="t('emailPlaceholder')" v-model.trim="user.email" class="auth-input w-full" :class="{ 'auth-input-error': v$.email.$invalid && v$.email.$dirty }">
    <div class="validation-error-message" :class="{ 'opacity-100' : v$.email.$invalid }">{{ t(i18nErrorMessage(v$.email.$errors[0])) }}</div>

    <label for="user-password" class="auth-input-label mt-6">{{ t('passwordLabel') }}</label>
    <input id="user-password" type="password" autocomplete="current-password" :placeholder="t('passwordPlaceholder') " v-model.trim="user.password" class="auth-input" :class="{ 'auth-input-error': v$.password.$invalid && v$.password.$dirty }" >
    <div class="validation-error-message" :class="{ 'opacity-100' : v$.password.$invalid }">{{ t(i18nErrorMessage(v$.password.$errors[0])) }}</div>

    <div class="flex justify-center mt-6 text-xs text-gray-500">
      <span class="text-primary-700 hover:cursor-pointer hover:scale-105 transition-all ease-in-out duration-300">{{ t('forgotPassword') }}</span>
    </div>
    <button @click="signInWithPassword" class="auth-primary-button mt-6" :disabled="v$.$invalid">
      {{ t('signInButton') }}
    </button>
    <div class="flex items-center mt-8 mb-4 text-gray-400">
      <hr class="flex-auto">
      <span class="flex-shrink text-xs text-center mx-2 whitespace-pre-wrap">{{ t('providersLabel') }}</span>
      <hr class="flex-auto">
    </div>
    <SignInWithProviders
        class="mt-2"
        :providers="appAuthProviders"
        @signed-in="signedInWithProvider"
        @sign-in-started="emitStarted({ method: 'provider', provider: $event })"
        @sign-in-ended="emitEnded($event)"
        @error-encountered="emitError($event)"
    />
    <div class="auth-secondary-button mt-8" @click="emit('gotoSignUp')">
      {{ t('gotoRegistration') }}
    </div>
  </div>
</template>
<style scoped>
</style>
<i18n locale="tr">
{
  "emailLabel": "E posta adresi",
  "emailPlaceholder": "E-posta",
  "passwordLabel": "Parola",
  "passwordPlaceholder": "Parola",
  "forgotPassword": "Parolamı unuttum",
  "signInButton": "Giriş yapın",
  "providersLabel": "ya da sosyal medya hesabınızı kullanın",
  "gotoRegistration": "Hemen bir hesap oluşturun!",
  "validation" : {
    "noError": "",
    "email": {
      "required": "Lütfen e-posta adresinizi yazın",
      "email": "Lütfen e-posta adresinizi yazın"
    },
    "password": {
      "required": "Lütfen parolanızı yazın"
    }
  }
}
</i18n>
<i18n locale="en">
{
  "emailLabel": "Email address",
  "emailPlaceholder": "E-mail",
  "passwordLabel": "Password",
  "passwordPlaceholder": "Password",
  "forgotPassword": "Forgot password?",
  "signInButton": "Sign In",
  "providersLabel": "or continue with",
  "gotoRegistration": "Create your account now!",
  "validation" : {
    "email": {
      "required": "Please provide your e-mail address",
      "email": "Please provide a valid email address"
    },
    "password": {
      "required": "Please provide your password"
    }
  }
}
</i18n>




