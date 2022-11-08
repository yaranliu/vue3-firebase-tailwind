<script setup>
import { computed } from "vue";

import { useRouter } from 'vue-router'
const router = useRouter()

import { useAuthStore} from "@/stores/auth";
const auth = useAuthStore();

const props = defineProps(
    {
      itemName: {
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
      },
      isDocked: {
        type: Boolean,
        default: false
      },
      defaultNavIcon: {
        type: String,
        default: 'las la-link'
      },
      defaultActionIcon: {
        type: String,
        default: 'las la-caret-right'
      }
    }
)

const emit = defineEmits(['navigated', 'action'])
const showNavItem = computed(() => { return props.alwaysShow || auth.isAuthenticated || !router.resolve({ name: props.itemName }).meta.requiresAuth })
const displayIcon = computed(() => { return props.icon ? props.icon : ( props.isAction ? props.defaultActionIcon : props.defaultNavIcon ) })

const onClick = () => {
  if (props.isAction) emit('action')
  else {
    router.push( { name: props.itemName })
    emit('navigated')
  }
}

</script>

<template>
  <div v-if="isDocked" class="grid place-content-center" @click="onClick">
    <div class="text-xl w-full" >
      <i :class="displayIcon" />
    </div>
  </div>
  <div v-else class="flex flex-row items-center h-12 pl-4 whitespace-nowrap" @click="onClick">
    <div v-if="showIcon" class="p-2 text-xl mx-1.5 w-8" >
      <i v-if="icon" :class="icon" />
    </div>
    <div v-if="isAction">
      {{ $t(`navigation.${itemName}`) }}
    </div>
    <div v-if="router.hasRoute(itemName)"><span v-if="showNavItem">{{ $t(`navigation.${itemName}`) }}</span>
    </div>
  </div>

</template>


<style scoped>

</style>
