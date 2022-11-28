<script setup>

import SignUpCard from "@/components/auth/SignUpCard.vue";

import {useRouter} from "vue-router";
import { useI18n } from "vue-i18n";

const { t } = useI18n()
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
        <div class="text-center py-6 font-bold text-2xl text-white">{{ t('title') }}</div>
        <SignUpCard @goto-sign-in="onGotoSignIn" @signed-up="onSignedUp" />
      </div>
    </div>
  </main>

</template>

<style scoped>

</style>
<i18n locale="tr">
{
  "title": "Giriş Yapın"
}

</i18n>
<i18n locale="en">
{
  "title": "Sign In"
}

</i18n>
