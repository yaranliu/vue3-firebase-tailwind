<script setup>
import {computed, reactive, defineEmits } from 'vue'

import { useAuthStore} from "@/stores/auth";
const auth = useAuthStore();

import { AuthErrorCodes } from "firebase/auth";
import SignInWithProviders from "@/components/auth/SignInWithProviders.vue";

const user = reactive({
  email: '',
  password: '',
})

import { useVuelidate } from '@vuelidate/core'
import {required, email } from '@vuelidate/validators'

const rules = computed (() => { return {
  email: { required, email },
  password: { required },
}})

const v$ = useVuelidate(rules, user, { $autoDirty: true })

const emit = defineEmits(['gotoSignUp', 'signedIn', 'started', 'ended'])

const signIn = () => {
  emit('started', 'Password')
  auth.signIn(user.email, user.password).then(user => {
    console.log(user)
    emit('signedIn')
  }).catch(error => {
    console.log('Mapped error', error)
    if (error.code === AuthErrorCodes.USER_DELETED) {
      console.log('User not found')
    }
  }).finally(() => {
        emit('ended')
  });
}

const emitStarted = (event) => {
  console.log(event)
  emit('started', event)
}

</script>
<template>
  <div class="auth-card">
    <label for="user-email" class="auth-input-label">Email address</label>
    <input id="user-email" type="text" placeholder="E-mail" v-focus v-model.trim="user.email" class="auth-input" :class="{ 'auth-input-error': v$.email.$error }" >
    <label for="user-password" class="auth-input-label mt-6">Password</label>
    <input id="user-password" type="password" placeholder="Password" v-model.trim="user.password" class="auth-input" :class="{ 'auth-input-error': v$.password.$error }" >
    <div class="flex justify-center mt-6 text-xs text-gray-500">
      <span class="text-indigo-700 hover:cursor-pointer hover:scale-105">Forgot password?</span>
    </div>
    <button @click="signIn" class="auth-primary-button mt-6" :disabled="v$.$error">
      Sign in
    </button>
    <div class="flex items-center mt-8 mb-4 text-gray-400">
      <hr class="flex-auto">
      <span class="flex-none text-xs mx-2">or continue with</span>
      <hr class="flex-auto">
    </div>
    <SignInWithProviders class="mt-2" @signed-in="emit('signedIn')"  @started="emitStarted($event)" @ended="emit('ended')"/>
    <div class="auth-secondary-button mt-8" @click="emit('gotoSignUp')">
      Sign up now!
    </div>
  </div>
</template>
<style scoped>
</style>




