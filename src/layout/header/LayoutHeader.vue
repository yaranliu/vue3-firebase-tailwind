<script setup>

import { useRouter } from 'vue-router'
const router = useRouter()

import UserDropDown from "@/layout/user-drop-down/UserDropDown.vue";

const emit = defineEmits(['userAction', 'menuClicked'])
const props = defineProps(['userButtonActions'])

const onUserAction = (action ) => {
  emit('userAction', action)
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
            :actions="userButtonActions"
            @action="onUserAction"
        />
      </div>
    </nav>
</template>


<style scoped>

</style>
