<script setup>
import {computed, reactive } from 'vue'

import { useAuthStore} from "@/stores/auth";
const auth = useAuthStore();

import { AuthErrorCodes } from "firebase/auth";
import SignInWithProviders from "@/components/auth/SignInWithProviders.vue";

import { appAuthProviders } from "/src/components/auth/app-auth-providers.ts"

const user = reactive({
  email: '',
  password: '',
})



import { useVuelidate } from '@vuelidate/core'
import {required, email } from '@vuelidate/validators'
import { i18nErrorMessage } from '@/lib/validation-error'

const rules = computed (() => { return {
  email: { required, email },
  password: { required },
}})

const v$ = useVuelidate(rules, user, { $autoDirty: true })

const emit = defineEmits(['gotoSignUp', 'signedIn', 'signInStarted', 'signInEnded', 'errorEncountered'])

const signInWithPassword = () => {
  emitStarted('password')
  auth.signIn(user.email, user.password).then(user => {
    emitSignedIn(user)
  }).catch(error => {
    emitError(error)
    if (error.code === AuthErrorCodes.USER_DELETED) {
      console.log('User not found')
    }
  }).finally(() => {
    emitEnded('password')
  });
}

const emitSignedIn = (event) => {
  emit('signedIn', event)
}
const emitStarted = (event) => {
  emit('signInStarted', event)
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
    <label for="user-email" class="auth-input-label">{{ $t('components.signInCard.emailLabel') }}</label>
    <input id="user-email" type="email" autocomplete="e-mail" :placeholder="$t('components.signInCard.emailPlaceholder')" v-focus v-model.trim="user.email" class="auth-input w-full" :class="{ 'auth-input-error': v$.email.$invalid && v$.email.$dirty }">
    <div class="validation-error-message" :class="{ 'opacity-100' : v$.email.$invalid }">{{ $t(i18nErrorMessage(v$.email.$errors[0], 'signIn')) }}</div>

    <label for="user-password" class="auth-input-label mt-6">{{ $t('components.signInCard.passwordLabel') }}</label>
    <input id="user-password" type="password" autocomplete="current-password" :placeholder="$t('components.signInCard.passwordPlaceholder') " v-model.trim="user.password" class="auth-input" :class="{ 'auth-input-error': v$.password.$invalid && v$.password.$dirty }" >
    <div class="validation-error-message" :class="{ 'opacity-100' : v$.password.$invalid }">{{ $t(i18nErrorMessage(v$.password.$errors[0], 'signIn')) }}</div>

    <div class="flex justify-center mt-6 text-xs text-gray-500">
      <span class="text-indigo-700 hover:cursor-pointer hover:scale-105">{{ $t('components.signInCard.forgotPassword') }}</span>
    </div>
    <button @click="signInWithPassword" class="auth-primary-button mt-6" :disabled="v$.$invalid">
      {{ $t('components.signInCard.signInButton') }}
    </button>
    <div class="flex items-center mt-8 mb-4 text-gray-400">
      <hr class="flex-auto">
      <span class="flex-none text-xs mx-2">{{ $t('components.signInCard.providersLabel') }}</span>
      <hr class="flex-auto">
    </div>
    <SignInWithProviders
        class="mt-2"
        :providers="appAuthProviders"
        @signed-in="emitSignedIn($event)"
        @sign-in-started="emitStarted($event)"
        @sign-in-ended="emitEnded($event)"
        @error-encountered="emitError($event)"
    />
    <div class="auth-secondary-button mt-8" @click="emit('gotoSignUp')">
      {{ $t('components.signInCard.gotoRegistration') }}
    </div>
  </div>
</template>
<style scoped>
</style>




