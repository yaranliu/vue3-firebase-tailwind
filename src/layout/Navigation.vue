<template>
  <header class="bg-primary-900 text-slate-100 shadow-gray-200 shadow-2xl z-10">
    <nav class="flex justify-between items-center text-sm py-1">
      <div class="flex items-center">
        <button class="block md:hidden p-2 ml-2 text-white hover:bg-primary-800 rounded-full transition-all duration-200 ease-in-out" @click="isOpen = !isOpen">
          <Bars3Icon class="h-6 w-6" />
        </button>
        <div class="hidden md:block flex items-center" v-for="routeGroup in routes" :key="`group-${routeGroup.group}`">
            <NavigationItem v-for="route in routeGroup.routes" :key="`route-${route.name}`" :route-name="route.name" class="w-full ml-1 px-6 py-1.5 rounded" />
        </div>
      </div>
      <div>
        <RouterLink v-if="!auth.inProgress && !auth.isAuthenticated" class="font-normal text-sm border-white border py-2 px-6 rounded-xl hover:text-primary-900 hover:bg-white duration-200" to="/sign-in">Goto App</RouterLink>
        <div v-if="auth.inProgress">Signing in...</div>
        <UserDropDown class="mr-1" v-if="!auth.inProgress && auth.isAuthenticated" />
      </div>


<!--      overlay-->
      <transition
          enter-class="opacity-0"
          enter-active-class="ease-out transition-medium"
          enter-to-class="opacity-100"
          leave-class="opacity-100"
          leave-active-class="ease-out transition-medium"
          leave-to-class="opacity-0"
      >
        <div
            @keydown.esc="isOpen = false"
            v-show="isOpen"
            class="z-10 fixed inset-0 transition-opacity"
        >
          <div
              @click="isOpen = false"
              class="absolute inset-0 bg-black opacity-50"
              tabindex="0"
          ></div>
        </div>
      </transition>

<!--      Vertical Nav-->
      <aside
          class="transform top-0 left-0 w-64 bg-white fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30"
          :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
      >
        <div class="h-full flex flex-col bg-primary-900 text-white space-y-6">
          <div class="text-right">
            <button class="p-2 ml-2 text-white hover:bg-primary-800 rounded-full transition-all duration-200 ease-in-out" @click="isOpen = !isOpen">
              <XMarkIcon class="h-6 w-6" />
            </button>
          </div>
          <div class="flex flex-col space-y-2" v-for="routeGroup in routes" :key="`group-${routeGroup.group}`">
            <div class="tracking-widest text-slate-400 pl-2">{{ routeGroup.group }}</div>
            <div class="flex flex-col" v-for="route in routeGroup.routes" :key="`route-${route.name}`">
              <NavigationItem :route-name="route.name" class="w-full pl-6 py-1 text-lg" @navigated="isOpen = false"/>
            </div>
          </div>
        </div>
      </aside>
    </nav>
    <div>
    </div>
  </header>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

import { RouterLink, useRouter } from 'vue-router'
const router = useRouter()

import { useAuthStore} from "@/stores/auth";
const auth = useAuthStore();

import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import NavigationItem from "@/layout/NavigationItem.vue";
import UserDropDown from "@/layout/UserDropDown.vue";

const isOpen = ref(false)
const routes = ref([
  {
    group: 'Public',
    routes: [{ name: 'home', icon: ''},{ name: 'about', icon: ''},]
  },
  {
    group: 'User',
    routes: [{ name: 'dashboard', icon: ''}]
  },
])

watch(isOpen, (newVal, oldValue) => {
  document.body.style.removeProperty("overflow")
  if (newVal) document.body.style.setProperty("overflow", "hidden")
})

onMounted(() => {
  // console.log('overflow:', document.body.style.overflow)
})

const signOut = () => {
  auth.signOut().then(() => {
    console.log('Signed out')
    router.push({ name: 'sign-in' })
  }).catch(error => {
    console.log(error)
  });
}

const isActive = (rName) => {
  return router.currentRoute.value.name === rName
}

</script>

<style scoped>

</style>
