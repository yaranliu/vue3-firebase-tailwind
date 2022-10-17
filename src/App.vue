<template>
  <header class="bg-indigo-900 text-white flex justify-between items-center p-4 h-16 shadow-gray-200 shadow-2xl">
    <div>
      <nav class="space-x-8 font-medium">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink v-if="auth.isAuthenticated" to="/dashboard">Dashboard</RouterLink>
      </nav>
    </div>
    <div>
      <RouterLink v-if="!auth.inProgress && !auth.isAuthenticated" class="font-normal text-sm border-white border py-2 px-6 rounded-xl hover:text-indigo-900 hover:bg-white duration-200" to="/sign-in">Goto App</RouterLink>
      <div v-if="auth.inProgress">Signing in...</div>
      <div v-if="!auth.inProgress && auth.isAuthenticated" class="flex items-center space-x-1.5">
        <img v-if="auth.hasAvatar" alt="avatar" :src="auth.hasAvatar ? auth.user.photoURL : ''" class="w-8 h-8 rounded-full border border-indigo-200" />
        <div  class="text-sm" @click="signOut">
          {{ auth.displayName }}
        </div>
      </div>
    </div>
  </header>
  <RouterView />
</template>
<script setup>
import { onMounted} from "vue";
import { RouterLink, RouterView, useRouter } from 'vue-router'

import { useAuthStore} from "@/stores/auth";
const auth = useAuthStore();

import { inject } from "vue";
const $axios = inject("$axios");

const router = useRouter()

onMounted(() => {
  $axios.defaults.headers.common["Content-Type"] = "application/json";
  $axios.defaults.headers.common["Accept"] = "application/json";
  auth.setup()

})

const signOut = () => {
  auth.signOut().then(() => {
    console.log('Signed out')
    router.push({ name: 'sign-in' })
  }).catch(error => {
    console.log(error)
  });
}

</script>



<style scoped>
</style>
