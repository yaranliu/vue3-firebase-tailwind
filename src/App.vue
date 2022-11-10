<script setup>
import { onMounted} from "vue";

import { useRouter } from "vue-router";
const router = useRouter()

console.log(router.currentRoute.value)

import { useAuthStore} from "@/stores/auth";
const auth = useAuthStore();

import { RouteNames } from "@/configuration/app-configuration";

import { inject } from "vue";
import WebLayout from "@/layout/layouts/WebLayout.vue";
import AppLayout from "@/layout/layouts/AppLayout.vue";
const $axios = inject("$axios");

import { DefaultActions } from '@/layout/configuration/LayoutConfiguration'
import DockedLayout from "@/layout/layouts/DockedLayout.vue";

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
    default: console.log(`NOT IMPLEMENTED: [${source}/${action}]`); break;
  }
}

const signOut = () => {
  auth.signOut().then(() => {
    router.push({name: RouteNames.signIn })
  }).catch(error => {
    //
  });
}

</script>

<template>
<!--  <AppLayout-->
<!--      @drawer-action="drawerActionsHandler"-->
<!--      @user-button-action="userButtonActionsHandler"-->
<!--  />-->
  <DockedLayout
      @drawer-action="drawerActionsHandler"
      @user-button-action="userButtonActionsHandler"
      class="bg-transparent overscroll-contain"
  />
</template>


<style scoped>
</style>

