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

const signInWithGoogle = () => {
  auth.signInWithGoogle().then(user => {
    console.log(user)
    emit('signedUp')
  }).catch(error => {
    console.log(error)
  });
}

</script>

<template>
  <div class="auth-card">
    <label for="user-email" class="auth-input-label">Email address</label>
    <input id="user-email" type="text" placeholder="E-mail" v-focus v-model.trim="user.email" class="auth-input" :class="{ 'auth-input-error': v$.email.$error }">
    <label for="user-password" class="auth-input-label mt-6">Password</label>
    <input id="user-password" type="password" placeholder="Password" v-model.trim="user.password" class="auth-input" :class="{ 'auth-input-error': v$.password.$error }">
    <label for="user-confirm" class="auth-input-label mt-6">Confirm password</label>
    <input id="user-confirm" type="password" placeholder="Password" v-model.trim="user.passwordConfirmation" class="auth-input" :class="{ 'auth-input-error': v$.passwordConfirmation.$error }">
    <button @click="register" class="auth-primary-button mt-6" :disabled="v$.$error">
      Sign up
    </button>
    <div class="flex items-center mt-8 mb-4 text-gray-400">
      <hr class="flex-auto">
      <span class="flex-none text-xs mx-2">or continue with</span>
      <hr class="flex-auto">
    </div>
    <SignInWithProviders class="mt-2" @signed-in="emit('signedIn')" />
    <div class="auth-secondary-button mt-8" @click="emit('gotoSignIn')">
      I already have an account
    </div>
  </div>
</template>

<style scoped>

</style>
