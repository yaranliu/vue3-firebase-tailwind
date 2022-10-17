<script setup>

import SignInCard from "@/components/auth/SignInCard.vue";

import {useRouter} from "vue-router";
const router = useRouter()

const onGotoSignUp = () => {
  console.log("Go to Sign Up")
  router.push({ name: 'sign-up'})
}

const onSignedIn = () => {
  console.log("Signed In")
  router.push({ name: 'dashboard'})
}

</script>

<template>
  <main class="flex flex-row min-h-screen justify-center items-center">
    <div class="p-4 sm:w-1/3">
      <div class="text-center py-6 font-bold text-2xl">Sign In</div>
      <SignInCard @goto-sign-up="onGotoSignUp" @signed-in="onSignedIn" />
    </div>
  </main>

</template>

<style scoped>

</style>
