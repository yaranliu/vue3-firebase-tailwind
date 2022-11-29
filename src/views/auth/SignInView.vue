<script setup lang="ts">

import { ref, onMounted, computed } from 'vue'

import upperFirst from 'lodash/upperFirst'

import SignInCard from "@/components/auth/SignInCard.vue";

import { useRouter } from "vue-router";
import Loader from "@/components/misc/Loader.vue";
import SimpleDialog from "@/components/common/SimpleDialog.vue";
import { useAuthStore } from "@/stores/auth";
import {AuthErrorSource} from "@/components/auth/AuthErrorSource";
import { DefaultRouteNames} from "@/configuration/AppConfiguration";
import { useI18n } from "vue-i18n";
const router = useRouter()


const auth = useAuthStore()


const { t } = useI18n()



const onGotoSignUp = () => {
  // console.log("[SignInVıew] Go to Sign Up")
  router.push({ name: 'signUp'})
}

const onSignedIn = (args: any) => {
  // console.log("[SignInVıew] Signed In")
  // console.log("[SignInVıew] Redirect is:", args)
  if (args.redirect) router.push({ name: args.redirect})
  else router.push({ name: DefaultRouteNames.home.user })
}

const loading = ref(false)
const showErrorDialog = ref(false)

const showLoader = computed(() : boolean => { return showLoader.value || !auth.stateChecked})

const authMethod = ref('')
const authProvider = ref('')

const onSignInStarted = (args: any) => {
  // console.log("[SignInVıew] Load Started:", args)
  authMethod.value = args.method
  authProvider.value = args.provider
  loading.value = true
  provider.value = authProvider.value
}

const provider = ref('')

const onSignInEnded = (authProvider: string) => {
  // console.log("[SignInVıew] Load Ended:", authProvider)
  loading.value = false
}

const onError = (authError: string) => {
  showErrorDialog.value = true
}


onMounted(() => {
  // console.log('[SignInVıew] Auth is:', auth.isAuthenticated)
})

</script>

<template>
  <main class="h-full p-4">
    <div class="overflow-y-auto h-full grid place-content-center">
      <div v-show="!auth.inProgress">
        <div class="">
          <div class="text-center py-6 font-bold text-2xl text-white">
            {{ t('title') }}
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
              :title="t('error.dialog.title')"
              :description="t(auth.error.toLocaleString())"
              :button-label="t('error.dialog.button')"
              :is-open="showErrorDialog"
              @ok-clicked="showErrorDialog = false"
          />
        </div>
      </div>
      <div v-show="auth.inProgress" class="text-white">
        <Loader
            :show="loading"
            :title="t('loader.message')"
            :desc="t('loader.title', { method: authMethod === 'password' ? t('loader.credentials') : t('loader.account', { provider: upperFirst(authProvider)}) })"
        />
      </div>
    </div>
  </main>
</template>

<style scoped>

</style>
<i18n src="@/locales/error-messages.json"></i18n>
<i18n locale="tr">
{
  "title": "Giriş Yapın",
  "loader": {
    "state": "Kullanım bilgileri kontrol ediliyor",
    "title": "{method} ile giriş yapılıyor",
    "message": "Lütfen bekleyiniz",
    "account": "{provider} hesabınız",
    "credentials": "E-posta adresiniz ve parolanız"
  }
}

</i18n>
<i18n locale="en">
{
  "title": "Sign In",
  "loader": {
    "state": "Authenticating",
    "title": "Signing in with {method}",
    "message": "Please wait",
    "account": "your {provider} account",
    "credentials": "email and password"
  }
}

</i18n>
