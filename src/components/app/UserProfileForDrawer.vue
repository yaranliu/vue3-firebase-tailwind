<script setup>

import { computed } from "vue";

import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()

const props = defineProps({
  isDocked: { type: Boolean, default: false }
})

// const show = computed(() => { return auth.isAuthenticated || auth.inProgress})

</script>

<template>
  <section
      class="flex flex-col items-center justify-center w-full bg-[#071e34] text-em bg-[url('@/assets/profile-pattern.svg')] text-center transition-[width] ease-in-out duration-300"
      :class="{ 'py-2' : isDocked, 'py-8' : !isDocked }"
  >
      <div v-if="auth.inProgress" class="animate-pulse">
        <div class="block mx-auto rounded-full bg-slate-700" :class="{'w-24 h-24' : !isDocked, 'w-8 h-8' : isDocked }"></div>
        <div v-if="!isDocked" class="mt-2.5 h-2 bg-slate-700 rounded"></div>
        <div v-if="!isDocked" class="mt-2.5 h-2 bg-slate-700 rounded"></div>
      </div>
      <div v-else>
        <div v-if="auth.isAuthenticated" class="w-fit mx-auto">
          <img v-if="auth.hasAvatar" alt="avatar" :src="auth.hasAvatar ? auth.user.photoURL : '/user.png'" class="rounded-full transition-all ease-in-out duration-300" :class="{'w-24' : !isDocked, 'w-8' : isDocked}" srcset="" onerror="this.src='/user.png'" referrerpolicy="no-referrer">
          <div v-else class="rounded-full border border-slate-700 text-white bg-[#071e34] grid place-content-center transition-[width] ease-in-out duration-300" :class="{'w-24 h-24' : !isDocked, 'w-8 h-8' : isDocked}">
            <i class="las la-user" :class="{'text-[5rem]' : !isDocked, 'text-2xl' : isDocked }" />
          </div>
          <div v-if="!isDocked && auth.displayName.length > 0" class="mt-2.5 text-lg font-light tracking-wide" :class="{'text-emerald-400' : auth.displayNameIsEmail }">
            {{ auth.displayName }}
          </div>
          <div v-if="!isDocked && !auth.displayNameIsEmail" class="mt-1 text-xs font-light text-emerald-400">{{ auth.email }}</div>
        </div>
        <div v-else>
          <div class="rounded-full border border-slate-700 text-white bg-[#071e34] grid place-content-center" :class="{'w-24 h-24' : !isDocked, 'w-8 h-8' : isDocked}">
            <i class="las la-user" :class="{'text-[5rem]' : !isDocked, 'text-2xl' : isDocked }" />
          </div>
        </div>
      </div>
  </section>
</template>


<style scoped>

</style>
