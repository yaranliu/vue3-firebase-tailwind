<script setup>

import { computed } from "vue";

import { useAuthStore } from '@/stores/auth'
import {DrawerWidth} from "@/layout/drawer/DrawerWidth.ts";
const auth = useAuthStore()

const props = defineProps({
  isDocked: { type: Boolean, default: false },
  width: { type: String, default: DrawerWidth.md }
})

const imgClass = computed(() => ({
  'w-8 h-8' : props.width === DrawerWidth.sm,
  'w-12 h-12' : props.width === DrawerWidth.md,
  'w-24 h-24' : props.width === DrawerWidth.lg,
}))

</script>

<template>
  <section
      class="flex flex-col items-center justify-center w-full bg-[#071e34] bg-[url('@/assets/profile-pattern.svg')] text-center transition-width ease-in-out duration-300"
      :class="
      {
        'p-2' : width === DrawerWidth.sm,
        'p-3' : width === DrawerWidth.md,
        'p-4' : width === DrawerWidth.lg,
      }"
  >
      <div v-if="auth.inProgress" class="animate-pulse">
        <div class="block mx-auto rounded-full bg-slate-700" :class="imgClass"></div>
        <div v-if="width === DrawerWidth.lg" class="mt-2.5 h-2 bg-slate-700 rounded"></div>
        <div v-if="width === DrawerWidth.lg" class="mt-2.5 h-2 bg-slate-700 rounded"></div>
      </div>
      <div v-else>
        <div v-if="auth.isAuthenticated" class="flex flex-col items-center mx-auto">
          <img
              v-if="auth.hasAvatar"
              alt="avatar"
              :src="auth.hasAvatar ? auth.user.photoURL : '/user.png'"
              srcset=""
              onerror="this.src='/img/user.png'"
              referrerpolicy="no-referrer"
              class="rounded-full transition-all ease-in-out duration-300"
              :class="imgClass"
          >
          <div v-else class="rounded-full border border-slate-700 text-white bg-[#071e34] grid place-content-center transition-[width] ease-in-out duration-300 p-2"
               :class="imgClass">
            <i class="las la-user" :class="{'text-[5rem]' : width === DrawerWidth.lg, 'text-[2rem]' : width === DrawerWidth.md }" />
          </div>
          <div v-if="width === DrawerWidth.lg && auth.displayName.length > 0" class="mt-2.5 text-lg font-light tracking-wide" :class="{'text-emerald-400' : auth.displayNameIsEmail }">
            {{ auth.displayName }}
          </div>
          <div v-if="width === DrawerWidth.lg && !auth.displayNameIsEmail" class="mt-1 text-xs font-light text-emerald-400">{{ auth.email }}</div>
        </div>
        <div v-else>
          <div class="rounded-full border border-slate-700 text-white bg-[#071e34] grid place-content-center p-2"
               :class="imgClass">
            <i class="las la-user" :class="{'text-[5rem]' : width === DrawerWidth.lg, 'text-[2rem]' : width === DrawerWidth.md }" />
          </div>
        </div>
      </div>
  </section>
</template>


<style scoped>

</style>
