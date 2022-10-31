<script setup>

import { ref  } from 'vue'

import SignInCard from "@/components/auth/SignInCard.vue";

import {useRouter} from "vue-router";
import Loader from "@/components/misc/Loader.vue";
const router = useRouter()

const onGotoSignUp = () => {
  console.log("Go to Sign Up")
  router.push({ name: 'sign-up'})
}

const onSignedIn = () => {
  console.log("Signed In")
  router.push({ name: 'dashboard'})
}

const showLoader = ref(false)

const onLoadStarted = (event) => {
  console.log("Load Started")
  showLoader.value = true
  provider.value = event
}

const provider = ref('')

const onLoadEnded = () => {
  console.log("Load Ended")
  showLoader.value = false

}

</script>

<template>
  <main class="flex flex-row min-h-screen justify-center items-center">
    <Loader :show="showLoader" :title="'Signing in with ' + provider "/>
    <div class="p-4 sm:w-1/3">
      <div class="text-center py-6 font-bold text-2xl">Sign In</div>
      <SignInCard @goto-sign-up="onGotoSignUp" @signed-in="onSignedIn" @started="onLoadStarted($event)" @ended="onLoadEnded"/>
    </div>
  </main>

</template>

<style scoped>




</style>
