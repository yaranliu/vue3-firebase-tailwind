<script setup>

import SignUpCard from "@/components/auth/SignUpCard.vue";

import {useRouter} from "vue-router";
const router = useRouter()

const onGotoSignIn = () => {
  console.log("Go to Sign In")
  router.push({ name: 'sign-in'})
}

const onSignedUp = () => {
  console.log("Signed Up")
  router.push({ name: 'dashboard'})
}

</script>

<template>
  <main class="flex flex-row min-h-screen justify-center items-center">
    <div class="p-4 sm:w-1/3">
      <div class="text-center py-6 font-bold text-2xl">Sign Up</div>
      <SignUpCard @goto-sign-in="onGotoSignIn" @signed-up="onSignedUp" />
    </div>
  </main>

</template>

<style scoped>

</style>
