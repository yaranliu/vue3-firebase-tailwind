<script setup>
import { computed } from "vue";

import { RouterLink, useRouter } from 'vue-router'
const router = useRouter()

import { useAuthStore} from "@/stores/auth";
const auth = useAuthStore();

const props = defineProps(
    {
      routeName: {
        type: String,
        default: ''
      },
      icon: {
        type: String,
        default: undefined
      },
      alwaysShow: {
        type: Boolean,
        default: false
      },
      isAction: {
        type: Boolean,
        default: false
      },
      showIcon: {
        type: Boolean,
        default: true
      }
    }
)

const emit = defineEmits(['navigated', 'action'])
const showNavItem = computed(() => { return props.alwaysShow || auth.isAuthenticated || !router.resolve({ name: props.routeName }).meta.requiresAuth })

const onClick = () => {
  if (props.isAction) emit('action')
  else {
    router.push( { name: props.routeName })
    emit('navigated')
  }
}

</script>

<template>
  <div class="flex flex-row items-center h-12 pl-4 whitespace-nowrap" @click="onClick">
    <div v-if="showIcon" class="p-2 text-xl mx-1.5 w-8" >
      <i v-if="icon" :class="icon" />
    </div>
    <div v-if="isAction">
      {{ $t(`navigation.${routeName}`) }}
    </div>
    <div v-if="router.hasRoute(routeName)"><span v-if="showNavItem">{{ $t(`navigation.${routeName}`) }}</span>
    </div>

  </div>

</template>


<style scoped>

</style>
