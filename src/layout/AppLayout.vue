<script setup>
import { ref, watch, onMounted, computed, reactive } from 'vue'

import { useRouter } from 'vue-router'
const router = useRouter()

import { useAuthStore} from "@/stores/auth";
const auth = useAuthStore();

import NavigationItem from "@/layout/NavigationItem.vue";
import UserDropDown from "@/layout/UserDropDown.vue";
import Drawer from "@/layout/Drawer.vue";

const isOpen = ref(true)

import { routes, commands } from './LayoutConfiguration'
import LayoutHeader from "@/layout/LayoutHeader.vue";

const isActiveRoute = (rName) => {
  return router.currentRoute.value.name === rName
}

const userAction = (command) => {
  if (command === 'signOut') signOut()
}

const signOut = () => {
  auth.signOut().then(() => {
    router.push({name: 'signIn' })
  }).catch(error => {
  });
}

const onDrawerAction = (action) => {
  console.log('Action:', action)
}

const onDrawerNavigation = (route) => {
  console.log('Navigated to:', route)
}

onMounted(() => {
})

</script>
<template>
  <main>
    <div class="flex flex-col w-full h-screen overflow-hidden bg-slate-50">
      <div class="flex-none">
        <LayoutHeader class="bg-primary-900 text-slate-100 text-sm" :commands="commands" @menu-clicked="isOpen = !isOpen" />
      </div>
      <div class="grow overflow-y-auto">
        <div class="h-full flex flex-row">
          <div class="flex-none w-64 transition-all ease-in-out duration-300" :class="{'-translate-x-64 w-0' : !isOpen }">
            <Drawer
                class="bg-primary-700 text-white"
                :routes="routes"
                :is-open="isOpen"
                show-dividers
                show-groups
                show-icons
                @navigated="onDrawerNavigation"
                @action="onDrawerAction" />
          </div>
          <div class="grow max-h-screen overflow-y-auto">
            <RouterView />
          </div>
        </div>
      </div>
      <div class="flex-none h-8 p-1 bg-slate-400">
        Footer
      </div>
    </div>
  </main>


</template>
<style scoped>

</style>
