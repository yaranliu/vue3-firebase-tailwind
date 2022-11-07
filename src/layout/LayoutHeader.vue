<script setup>

import { useRouter } from 'vue-router'
const router = useRouter()

import UserDropDown from "@/layout/UserDropDown.vue";

const emit = defineEmits(['menuClicked'])
const props = defineProps(['commands'])

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
    <nav class="flex justify-between items-center">
      <div class="flex items-center">
        <button class="p-1.5 ml-2 text-white focus:outline-0 hover:bg-primary-800 rounded-full transition-all duration-200 ease-in-out" @click="emit('menuClicked')">
          <i class="las la-bars text-2xl w-8 h-8" />
        </button>
      </div>
      <div>
        <UserDropDown
            route-after-sign-out="signIn"
            :commands="commands"
            @action="userAction"
        />
      </div>
    </nav>
</template>


<style scoped>

</style>
