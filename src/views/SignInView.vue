<script setup>

import { ref  } from 'vue'

import SignInCard from "@/components/auth/SignInCard.vue";

import { useRouter } from "vue-router";
import Loader from "@/components/misc/Loader.vue";
import SimpleDialog from "@/components/common/SimpleDialog.vue";
const router = useRouter()

import { useAuthStore } from "@/stores/auth";
const auth = useAuthStore()

const onGotoSignUp = () => {
  console.log("Go to Sign Up")
  router.push({ name: 'sign-up'})
}

const onSignedIn = () => {
  console.log("Signed In")
  router.push({ name: 'dashboard'})
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
  <main class="flex flex-row min-h-screen justify-center items-center">
    <Loader :show="showLoader" :title="'Signing in with ' + provider "/>
    <div class="xs:p-2 xs:w-1/3">
      <div class="text-center py-6 font-bold text-2xl">
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
  </main>

</template>

<style scoped>

</style>
