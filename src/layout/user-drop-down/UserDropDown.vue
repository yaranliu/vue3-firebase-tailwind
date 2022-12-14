<script setup lang="ts">

import { computed } from "vue";

import flatten from 'lodash/flatten'
import sumBy from 'lodash/sumBy'
import { useAuthStore } from "@/stores/auth";
import { useI18n } from "vue-i18n"
import { DefaultRouteNames} from "@/configuration/AppConfiguration";
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { useRouter} from "vue-router";
const router = useRouter()
const auth = useAuthStore();
const { t } = useI18n()



const props = defineProps([ 'actions' ])

const showSignIn = computed(() => {
  return router.currentRoute.value.name !== DefaultRouteNames.signIn && router.currentRoute.value.name !== DefaultRouteNames.signUp
})

const totalCount = computed(() => { return sumBy(flatten(props.actions), 'count') })

const emit = defineEmits(['action'])

</script>

<template>
  <div class="flex items-center space-x-1.5 mt-1 mr-1">
    <Menu as="div" class="relative inline-block text-left">
      <div>
        <MenuButton
            v-if="auth.isAuthenticated"
            class="relative inline-flex w-full justify-center items-center rounded-md bg-white bg-opacity-0 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-20 focus:outline-none focus:bg-opacity-20"
        >
          <img v-if="auth.hasAvatar" alt="avatar" :src="auth.hasAvatar ? auth.user.photoURL : ''" class="w-8 h-8 rounded-full border border-indigo-200" onerror="this.src='/img/user.png'" referrerpolicy="no-referrer"/>
          <button v-else class="w-8 h-8 rounded-full text-white border-2 border-white bg-primary-700">
            <i class="las la-user text-xl" />
          </button>
          <span v-if="totalCount > 0" class="w-2.5 h-2.5 rounded-full bg-red-700 absolute top-1.5 left-10 animate-ping"></span>
          <div v-if="auth.displayName.length > 0" class="hidden md:block ml-2.5">{{ auth.displayName }}</div>
          <span><i class="las la-angle-down hidden md:block ml-2.5 text-primary-200 hover:text-primary-100" /></span>
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
            class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-30"
        >
          <div class="px-1 py-1" v-for="group in actions">
            <MenuItem v-for="action in group" v-slot="{ active }">
              <button
                  :class="[
                  active ? 'bg-primary-600 text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md px-2 py-1 text-sm',
                ]"
                  @click="emit('action', action.name)"
              >
                <i :class="`${action.icon} text-lg mr-1 pr-1 pl-0.5 text-primary-600 group-hover:text-white`" />
                <span class="grow text-left">{{ t( `${action.label}`) }}</span>
                <button v-if="action.count" class="rounded-full bg-red-100 w-5 h-5 text-red-800 text-xs font-semibold text-ellipsis overflow-hidden">{{ action.count > 9 ? '~' : action.count }}</button>
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

<i18n>
{
  "en": {
    "notifications": "Notifications",
    "messages": "Messages",
    "profile": "My profile",
    "settings": "My settings",
    "signOut": "Sign Out"
  },
  "tr": {
    "notifications": "Bildirimler",
    "messages": "Mesajlar",
    "profile": "Profilim",
    "settings": "Ayarlar??m",
    "signOut" :"????k???? yap"
  }
}
</i18n>

