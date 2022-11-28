<script setup>
import { onMounted} from "vue";

import { useRouter } from "vue-router";
import { useAuthStore} from "@/stores/auth";

import { inject } from "vue";
import { DefaultRouteNames } from "@/configuration/AppConfiguration";
import { DefaultActions } from '@/configuration/LayoutConfiguration'
import DockedLayout from "@/layout/layouts/DockedLayout.vue";

import { useI18n } from "vue-i18n"

const router = useRouter()

const auth = useAuthStore();
const $axios = inject("$axios");


const i18n = useI18n()

onMounted(() => {
  $axios.defaults.headers.common["Content-Type"] = "application/json";
  $axios.defaults.headers.common["Accept"] = "application/json";
  auth.setup()

})

const drawerActionsHandler = (action) => {
  actionHandler('drawer', action)
}

const userButtonActionsHandler = (action) => {
  actionHandler('button', action)
}

const actionHandler = (source, action) => {

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
  <DockedLayout
      @drawer-action="drawerActionsHandler"
      @user-button-action="userButtonActionsHandler"
      class="bg-transparent overscroll-contain"
  />
</template>


<style scoped>
</style>

