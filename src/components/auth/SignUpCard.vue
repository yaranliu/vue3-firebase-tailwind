<script setup>
import { reactive, computed } from 'vue'

import { useAuthStore} from "@/stores/auth";
const auth = useAuthStore();

import SignInWithProviders from "@/components/auth/SignInWithProviders.vue";

const user = reactive({
  email: '',
  password: '',
  passwordConfirmation: ''
})

import { useVuelidate } from '@vuelidate/core'
import { required, email, sameAs, minLength } from '@vuelidate/validators'
import { i18nErrorMessage } from '@/lib/validation-error'

const rules = computed (() => { return {
  email: { required, email },
  password: { required, minLength: minLength(6) },
  passwordConfirmation: { sameAsPassword: sameAs(user.password) }
}})

const v$ = useVuelidate(rules, user, { $autoDirty: true })

const emit = defineEmits(['gotoSignIn', 'signedUp'])

const register = () => {
  auth.register(user.email, user.password).then(user => {
    console.log(user)
    emit('signedUp')
  }).catch(error => {
    console.log(error)
  });
}

</script>

<template>
  <form class="auth-card">
    <label for="user-email" class="auth-input-label">{{ $t('components.signUpCard.emailLabel')}}</label>
    <input id="user-email" type="email" autocomplete="e-mail"   :placeholder="$t('components.signUpCard.emailPlaceholder')" v-focus v-model.trim="user.email" class="auth-input" :class="{ 'auth-input-error': v$.email.$invalid && v$.email.$dirty }">
    <div class="validation-error-message" :class="{ 'opacity-100' : v$.email.$invalid }">{{ $t(i18nErrorMessage(v$.email.$errors[0], 'signUp')) }}</div>

    <label for="user-password" class="auth-input-label mt-6">{{ $t('components.signUpCard.passwordLabel')}}</label>
    <input id="user-password" type="password" autocomplete="new-password" :placeholder="$t('components.signUpCard.passwordLabel')" v-model.trim="user.password" class="auth-input" :class="{ 'auth-input-error': v$.password.$invalid && v$.password.$dirty }">
    <div class="validation-error-message" :class="{ 'opacity-100' : v$.password.$invalid }">{{ $t(i18nErrorMessage(v$.password.$errors[0], 'signUp')) }}</div>

    <label for="user-confirm" class="auth-input-label mt-6">{{ $t('components.signUpCard.confirmPasswordPlaceholder')}}</label>
    <input id="user-confirm" type="password" autocomplete="new-password" :placeholder="$t('components.signUpCard.confirmPasswordPlaceholder')" v-model.trim="user.passwordConfirmation" class="auth-input" :class="{ 'auth-input-error': v$.passwordConfirmation.$invalid && v$.passwordConfirmation.$dirty }">
    <div class="validation-error-message" :class="{ 'opacity-100' : v$.passwordConfirmation.$invalid }">{{ $t(i18nErrorMessage(v$.passwordConfirmation.$errors[0], 'signUp')) }}</div>

    <button @click="register" class="auth-primary-button mt-6" :disabled="v$.$invalid">
      {{ $t('components.signUpCard.signUpButton')}}
    </button>
    <div class="flex items-center mt-8 mb-4 text-gray-400">
      <hr class="flex-auto">
      <span class="lex-shrink text-xs text-center mx-2 whitespace-pre-wrap">{{ $t('components.signUpCard.providersLabel')}}</span>
      <hr class="flex-auto">
    </div>
    <SignInWithProviders class="mt-2" @signed-in="emit('signedIn')" />
    <div class="auth-secondary-button mt-8" @click="emit('gotoSignIn')">
      {{ $t('components.signUpCard.gotoSignIn') }}
    </div>
  </form>
</template>

<style scoped>

</style>
