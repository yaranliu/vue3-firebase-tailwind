<script setup lang="ts">
import { onMounted} from "vue";

import { useRouter } from "vue-router";
import { useAuthStore} from "@/stores/auth";

import { inject } from "vue";
import { DefaultRouteNames } from "@/configuration/AppConfiguration";
import { DefaultActions } from '@/configuration/LayoutConfiguration'

import { useI18n } from "vue-i18n"
import type {Axios} from "axios";
import Layout from "@/layout/layouts/Layout.vue";

const router = useRouter()

const auth = useAuthStore();
const $axios = inject<Axios>("$axios");


const i18n = useI18n()

onMounted(() => {
  if ($axios) {
    $axios.defaults.headers.common["Content-Type"] = "application/json";
    $axios.defaults.headers.common["Accept"] = "application/json";
  }
  auth.setup()

})

const drawerActionsHandler = (action: string) => {
  actionHandler('drawer', action)
}

const userButtonActionsHandler = (action : string) => {
  actionHandler('button', action)
}

const actionHandler = (source: string, action: string) => {

  switch (action) {
    case DefaultActions.signOut: signOut(); break;
    case 'changeLanguage': {
      if (i18n.locale.value === 'en') i18n.locale.value = 'tr'
      else i18n.locale.value = 'en'
      break;
    }
    default: console.log(`NOT IMPLEMENTED: [${source}/${action}]`); break;
  }
}

const signOut = () => {
  auth.signOut().then(() => {
    router.push({name: DefaultRouteNames.signIn })
  }).catch(error => {
    //
  });
}

</script>

<template>
  <Layout
      @drawer-action="drawerActionsHandler"
      @user-button-action="userButtonActionsHandler"
      class="bg-transparent overscroll-contain"
      :layout-threshold = 600
  />
</template>


<style scoped>
</style>

