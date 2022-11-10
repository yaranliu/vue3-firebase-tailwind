<script setup>

import { ref } from 'vue'

import SignInCard from "@/components/auth/SignInCard.vue";

import { useRouter } from "vue-router";
import Loader from "@/components/misc/Loader.vue";
import SimpleDialog from "@/components/common/SimpleDialog.vue";
const router = useRouter()

import { useAuthStore } from "@/stores/auth";
import {AuthErrorSource} from "@/components/auth/AuthErrorSource";
const auth = useAuthStore()

import { RouteNames} from "@/configuration/app-configuration";

const onGotoSignUp = () => {
  console.log("Go to Sign Up")
  router.push({ name: 'signUp'})
}

const onSignedIn = (redirect) => {
  console.log("Signed In")
  if (redirect) router.push({ name: redirect})
  else router.push({ name: RouteNames.home.user })
}

const showLoader = ref(false)
const showErrorDialog = ref(false)

const onSignInStarted = (authProvider) => {
  console.log("Load Started:", authProvider)
  showLoader.value = true
  provider.value = authProvider
}

const provider = ref('')

const onSignInEnded = (authProvider) => {
  console.log("Load Ended:", authProvider)
  showLoader.value = false
}

const onError = (authError) => {
  showErrorDialog.value = true
}

</script>

<template>
  <main class="h-full p-4">
    <div class="overflow-y-auto h-full grid place-content-center">
      <div v-if="!auth.inProgress">
        <Loader :show="showLoader" :title="'Signing in with ' + provider "/>
        <div class="">
          <div class="text-center py-6 font-bold text-2xl text-white">
            {{ $t('views.signIn.title') }}
          </div>
          <SignInCard
              vertical
              @goto-sign-up="onGotoSignUp"
              @signed-in="onSignedIn"
              @sign-in-started="onSignInStarted"
              @sign-in-ended="onSignInEnded"
              @error-encountered="onError"
          />
          <SimpleDialog
              alert-type="danger"
              :title="$t('error.dialog.title')"
              :description="$t(auth.error.toLocaleString())"
              :button-label="$t('error.dialog.button')"
              :is-open="showErrorDialog"
              @ok-clicked="showErrorDialog = false"
          />
        </div>
      </div>
      <div v-else class="text-white">Please wait</div>
    </div>
  </main>
</template>

<style scoped>

</style>
