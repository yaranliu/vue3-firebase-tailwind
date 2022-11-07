<script setup>

import { computed } from "vue";

import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()

const show = computed(() => { return auth.isAuthenticated || auth.inProgress})

</script>

<template>
  <section
      class="flex flex-col items-center justify-center w-full bg-[#071e34] text-em bg-[url('@/assets/profile-pattern.svg')] text-center transition-all ease-in-out duration-300"
      :class="{'h-48' : show , 'h-0' : !show}"
  >
      <div v-if="auth.inProgress" class="animate-pulse">
        <div class="w-24 h-24 block mx-auto rounded-full bg-slate-700"></div>
        <div class="mt-2.5 h-2 bg-slate-700 rounded"></div>
        <div class="mt-2.5 h-2 bg-slate-700 rounded"></div>
      </div>
      <div v-else>
        <div class="w-fit mx-auto">
          <img v-if="auth.hasAvatar" alt="avatar" :src="auth.hasAvatar ? auth.user.photoURL : ''" class="rounded-full w-24 " srcset="">
          <div v-else class="w-24 h-24 rounded-full border border-slate-700 text-white bg-[#071e34] grid place-content-center">
            <i class="las la-user text-[5rem]" />
          </div>
        </div>
        <div v-if="auth.displayName.length > 0" class="mt-2.5 text-lg font-light tracking-wide" :class="{'text-emerald-400' : auth.displayNameIsEmail }">
          {{ auth.displayName }}
        </div>
        <div v-if="!auth.displayNameIsEmail" class="mt-1 text-xs font-light text-emerald-400">{{ auth.email }}</div>
      </div>
  </section>
</template>


<style scoped>

</style>
