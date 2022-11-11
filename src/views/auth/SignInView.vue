<script setup>

import { ref, onMounted, computed } from 'vue'

import * as _ from 'lodash/string'

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
  console.log("[SignInVıew] Go to Sign Up")
  router.push({ name: 'signUp'})
}

const onSignedIn = (args) => {
  console.log("[SignInVıew] Signed In")
  console.log("[SignInVıew] Redirect is:", args)
  if (args.redirect) router.push({ name: args.redirect})
  else router.push({ name: RouteNames.home.user })
}

const loading = ref(false)
const showErrorDialog = ref(false)

const showLoader = computed(() => { return showLoader.value || !auth.stateChecked})

const authMethod = ref('')
const authProvider = ref('')

const onSignInStarted = (args) => {
  console.log("[SignInVıew] Load Started:", args)
  authMethod.value = args.method
  authProvider.value = args.provider
  loading.value = true
  provider.value = authProvider.value
}

const provider = ref('')

const onSignInEnded = (authProvider) => {
  console.log("[SignInVıew] Load Ended:", authProvider)
  loading.value = false
}

const onError = (authError) => {
  showErrorDialog.value = true
}


onMounted(() => {
  console.log('[SignInVıew] Auth is:', auth.isAuthenticated)
})

</script>

<template>
  <main class="h-full p-4">
    <div class="overflow-y-auto h-full grid place-content-center">
      <div v-show="!auth.inProgress">
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
              @ok-clicked="showErrorDialog.value = false"
          />
        </div>
      </div>
      <div v-show="auth.inProgress" class="text-white">
        <Loader
            :show="loading"
            :title="$t('views.signIn.loader.message')"
            :desc="$t('views.signIn.loader.title', { method: authMethod === 'password' ? $t('views.signIn.loader.credentials') : $t('views.signIn.loader.account', { provider: _.upperFirst(authProvider)}) })"
        />
      </div>
    </div>
  </main>
</template>

<style scoped>

</style>
