<script setup>
import styles from './auth.css'
import { ref } from 'vue'

import { useAuthStore} from "@/stores/auth";
const auth = useAuthStore();

import { AuthErrorCodes } from "firebase/auth";
import SignInWithProviders from "@/components/auth/SignInWithProviders.vue";

const email = ref('')
const password = ref('')

const emit = defineEmits(['gotoSignUp', 'signedIn'])

const signIn = () => {
  auth.signIn(email.value, password.value).then(user => {
    console.log(user)
    emit('signedIn')
  }).catch(error => {
    console.log('Mapped error', error)
    if (error.code === AuthErrorCodes.USER_DELETED) {
      console.log('User not found')
    }
  });
}

const rememberMe = ref(false)

</script>
<template>
  <div class="auth-card">
    <label for="user-email" class="auth-input-label">Email address</label>
    <input id="user-email" type="text" placeholder="E-mail" v-model.trim="email" class="auth-input" v-focus>
    <label for="user-password" class="auth-input-label mt-6">Password</label>
    <input id="user-password" type="password" placeholder="Password" v-model.trim="password" class="auth-input" >
    <div class="flex justify-center mt-6 text-xs text-gray-500">
      <span class="text-indigo-700 hover:cursor-pointer hover:scale-105">Forgot password?</span>
    </div>
    <button @click="signIn" class="auth-primary-button mt-6">
      Sign in
    </button>
    <div class="flex items-center mt-8 mb-4 text-gray-400">
      <hr class="flex-auto">
      <span class="flex-none text-xs mx-2">or continue with</span>
      <hr class="flex-auto">
    </div>
    <SignInWithProviders class="mt-2" @signed-in="emit('signedIn')" />
    <div class="auth-secondary-button mt-8" @click="emit('gotoSignUp')">
      Sign up now!
    </div>
  </div>
</template>
<style scoped>
</style>




