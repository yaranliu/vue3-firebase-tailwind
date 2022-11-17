<script setup>

import SignUpCard from "@/components/auth/SignUpCard.vue";

import {useRouter} from "vue-router";
const router = useRouter()

const onGotoSignIn = () => {
  // console.log("Go to Sign In")
  router.push({ name: 'signIn'})
}

const onSignedUp = () => {
  // console.log("Signed Up")
  router.push({ name: 'dashboard'})
}

</script>

<template>
  <main class="h-full p-4">
    <div class="overflow-y-auto h-full grid place-content-center">
      <div>
        <div class="text-center py-6 font-bold text-2xl text-white">{{ $t('views.signUp.title') }}</div>
        <SignUpCard @goto-sign-in="onGotoSignIn" @signed-up="onSignedUp" />
      </div>
    </div>
  </main>

</template>

<style scoped>

</style>
