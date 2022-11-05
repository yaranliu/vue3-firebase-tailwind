<script setup>

import {computed} from "vue";

import { useAuthStore } from "@/stores/auth";
const auth = useAuthStore();

import { useRouter} from "vue-router";
const router = useRouter()

import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

const props = defineProps(['commands', 'routeAfterSignOut'])

const showSignIn = computed(() => {
  return router.currentRoute.value.name !== 'signIn'
})

const emit = defineEmits(['action'])

</script>

<template>
  <div class="flex items-center space-x-1.5">
    <Menu as="div" class="relative inline-block text-left">
      <div>
        <MenuButton
            v-if="auth.isAuthenticated"
            class="inline-flex w-full justify-center items-center space-x-2 rounded-md bg-black bg-opacity-0 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          <img v-if="auth.hasAvatar" alt="avatar" :src="auth.hasAvatar ? auth.user.photoURL : ''" class="w-8 h-8 rounded-full border border-indigo-200" />
          <div class="hidden md:block">{{ auth.displayName }}</div>
          <span><i class="las la-angle-down hidden md:block mx-1 text-primary-200 hover:text-primary-100" /></span>
        </MenuButton>
        <button
            v-else
            class="flex flex-row w-full h-12 justify-center items-center space-x-2 rounded-md pl-2 pr-4 py-2 text-sm font-medium text-white hover:text-secondary-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            @click="router.push({ name: 'signIn' })"
        >
          <span v-show="showSignIn" class="hidden md:block ml-3">Sign In</span>
          <i v-show="showSignIn" class="las la-sign-in-alt text-xl" />
        </button>
      </div>

      <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
      >
        <MenuItems
            class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div class="px-1 py-1" v-for="group in commands">
            <MenuItem v-for="command in group" v-slot="{ active }">
              <button
                  :class="[
                  active ? 'bg-primary-600 text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md px-2 py-1 text-sm',
                ]"
                  @click="emit('action', command.name)"
              >
                <i :class="`${command.icon} text-lg mr-1 pr-1 pl-0.5 text-primary-600 group-hover:text-white`" />
                <span>{{ $t( `navigation.userButton.${command.label}`) }}</span>
                <span v-if="command.count" class="rounded-full bg-red-700 text-white text-xs px-2 justify-self-end ">{{ command.count }}</span>
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>



</template>


<style scoped>

</style>
