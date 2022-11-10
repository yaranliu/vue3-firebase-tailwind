<script setup>
import { computed, onMounted } from "vue";

import { useRouter } from 'vue-router'
const router = useRouter()

import { useAuthStore} from "@/stores/auth";
import {DrawerWidth} from "@/layout/drawer/DrawerWidth";
const auth = useAuthStore();

const props = defineProps(
    {
      itemName: { type: String, default: '' },
      icon: { type: String, default: undefined },
      alwaysShow: { type: Boolean, default: false },
      isAction: { type: Boolean, default: false },
      showIcon: { type: Boolean, default: true },
      defaultNavIcon: { type: String, default: 'las la-link' },
      defaultActionIcon: { type: String, default: 'las la-caret-right' },
      width: { type: String, default: DrawerWidth.md },
    }
)

const emit = defineEmits(['navigated', 'action'])
const showNavItem = computed(() => { return props.alwaysShow || auth.isAuthenticated || !router.resolve({ name: props.itemName }).meta.requiresAuth })
const displayIcon = computed(() => { return props.icon ? props.icon : ( props.isAction ? props.defaultActionIcon : props.defaultNavIcon ) })
const iconSize = computed(() => {
  switch (props.width) {
    case DrawerWidth.lg: return 'text-xl';
    case DrawerWidth.md: return 'text-2xl';
    case DrawerWidth.sm: return 'text-xl';
    default: return 'text-8xl'
  }
})

const iconVisible = computed(() => {
  if (props.width === DrawerWidth.lg) {
    return props.showIcon
  } else return true
})


const iconOnly = computed(() => {
  return props.width === props.width === DrawerWidth.sm
})

const onClick = () => {
  if (props.isAction) emit('action')
  else {
    router.push( { name: props.itemName })
    emit('navigated')
  }
}


</script>

<template>
    <div
        @click="onClick"
        class="flex px-1 py-1 max-w-xs group hover:opacity-100 hover:cursor-pointer"
        :class="{'mx-auto' : width !== DrawerWidth.lg} "
    >
      <div v-if="width === DrawerWidth.sm" class="group-hover:scale-110 ">
        <i class="text-center" :class="`${displayIcon} ${iconSize}`" />
      </div>
      <div
          v-else
          class="transition-all ease-in-out duration-300"
          :class="{
            'flex flex-row items-center w-full pl-3 pr-8 py-1 text-left space-x-2 group-hover:scale-105' : width === DrawerWidth.lg,
            'flex flex-col items-center w-full px-4 space-y-1 mb-3 text-center max-w-[3.5rem] text-xs group-hover:scale-105' : width === DrawerWidth.md,
      }"
      >
        <i :class="`${displayIcon} ${iconSize}`" />
        <div v-if="isAction" :class="{ 'max-h-[2rem] max-w-[3.2rem] text-ellipsis overflow-hidden' : width === DrawerWidth.md }">
          {{ $t(`navigation.${itemName}.${width}`) }}
        </div>
        <div v-if="!isAction && router.hasRoute(itemName)" :class="{ 'max-h-[2rem] max-w-[3.2rem] text-ellipsis overflow-hidden' : width === DrawerWidth.md }"><span v-if="showNavItem">{{ $t(`navigation.${itemName}.${width}`) }}</span></div>
      </div>
    </div>
</template>


<style scoped>

</style>
