<script setup>
import { ref, watch } from 'vue'

import { RouterLink, useRouter } from 'vue-router'
const router = useRouter()

import { useAuthStore} from "@/stores/auth";
const auth = useAuthStore();

import NavigationItem from "@/layout/NavigationItem.vue";
import UserDropDown from "@/layout/UserDropDown.vue";
import DrawerItem from "@/layout/DrawerItem.vue";

const isOpen = ref(false)
const routes = ref([
  {
    group: 'Public',
    routes: [{ name: 'home', icon: ''},{ name: 'about' },]
  },
  {
    group: 'User',
    routes: [{ name: 'dashboard', icon: 'las la-briefcase'}]
  },
])

const userCommands = ref([
  [ { name:'notifications', label: 'notifications', icon: 'las la-bell' }, { name:'messages', label: 'messages', icon: 'las la-envelope', count: 5 } ],
  [ { name:'profile', label: 'profile', icon: 'las la-user'}, { name:'settings', label: 'settings', icon: 'las la-cog' } ],
  [ { name:'signOut', label: 'signOut', icon: 'las la-sign-out-alt' } ],
])

watch(isOpen, (newVal, oldValue) => {
  document.body.style.removeProperty("overflow")
  if (newVal) document.body.style.setProperty("overflow", "hidden")
})

const isActive = (rName) => {
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

</script>
<template>
  <header class="bg-primary-900 text-slate-100 shadow-gray-200 shadow-2xl z-10" @keyup.esc="isOpen = false">
    <nav class="flex justify-between items-center text-sm">
      <div class="flex items-center">
        <button class="block md:hidden p-1.5 ml-2 text-white focus:outline-0 hover:bg-primary-800 rounded-full transition-all duration-200 ease-in-out" @click="isOpen = !isOpen">
          <i class="las la-bars text-2xl w-8 h-8" />
        </button>
        <div class="hidden md:block flex items-center" v-for="routeGroup in routes" :key="`group-${routeGroup.group}`">
          <NavigationItem v-for="route in routeGroup.routes" :key="`route-${route.name}`" :route-name="route.name" class="w-full ml-1 px-6 py-1.5 rounded text-base" :class="{ 'text-secondary-300' : isActive(route.name) }" />
        </div>
      </div>
      <div>
        <UserDropDown
            route-after-sign-out="signIn"
            :commands="userCommands"
            @action="userAction"
        />
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
          @keyup.esc = "isOpen = false"
      >
        <div class="h-full flex flex-col bg-primary-800 text-white space-y-6" @keyup.esc = "isOpen = false">
          <div class="text-right">
            <button class="p-2 ml-2 text-white hover:bg-primary-800 rounded-full transition-all duration-200 ease-in-out" @click="isOpen = !isOpen">
              <i class="las la-times text-2xl" />
            </button>
          </div>
          <div class="flex flex-col space-y-2" v-for="routeGroup in routes" :key="`group-${routeGroup.group}`">
            <div class="tracking-widest text-slate-400 pl-2 text-xs">{{ routeGroup.group }}</div>
            <div class="flex flex-col" v-for="route in routeGroup.routes" :key="`route-${route.name}`">
              <DrawerItem
                  :route-name="route.name"
                  :icon="route.icon"
                  class="w-full pl-2 py-1 text-lg"
                  :class="{ 'text-secondary-300 bg-primary-900 border-r-4 border-secondary-500' : isActive(route.name) }"
                  @navigated="isOpen = false"/>
            </div>
          </div>
        </div>
      </aside>
    </nav>
    <div>
    </div>
  </header>
</template>



<style scoped>

</style>
