<script setup>
import {computed, reactive, defineEmits } from 'vue'

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
import {required, email, minLength } from '@vuelidate/validators'

const rules = computed (() => { return {
  email: { required, email },
  password: { required, minLength: minLength(6) },
}})

const $v = useVuelidate(rules, user, { $autoDirty: true })

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
    <label for="user-email" class="auth-input-label">Email address</label>
    <input id="user-email" type="text" placeholder="E-mail" v-focus v-model.trim="user.email" class="auth-input" :class="{ 'auth-input-error': $v.email.$error }" >
    <label for="user-password" class="auth-input-label mt-6">Password</label>
    <input id="user-password" type="password" placeholder="Password" v-model.trim="user.password" class="auth-input" :class="{ 'auth-input-error': $v.password.$error }" >
    <div class="flex justify-center mt-6 text-xs text-gray-500">
      <span class="text-indigo-700 hover:cursor-pointer hover:scale-105">Forgot password?</span>
    </div>
    <button @click="signInWithPassword" class="auth-primary-button mt-6" :disabled="$v.$error">
      Sign in
    </button>
    <div class="flex items-center mt-8 mb-4 text-gray-400">
      <hr class="flex-auto">
      <span class="flex-none text-xs mx-2">or continue with</span>
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
      Sign up now!
    </div>
  </div>
</template>
<style scoped>
</style>




