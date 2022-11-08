<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

import * as _ from "lodash/array";

import { useAuthStore} from "@/stores/auth";
const auth = useAuthStore();

import DockedDrawerItem from "@/layout/drawer/DockedDrawerItem.vue"

const props = defineProps({
  items: { type: Array },
  isOpen: { type: Boolean},
  isDocked: { type: Boolean},
  showGroups : { type: Boolean, default: false },
  showIcons: { type: Boolean, default: true },
  showDividers: { type: Boolean, default: false }
})

const emit = defineEmits(['navigated', 'action', 'toggleDock'])

const isActiveRoute = (rName) => {
  return router.currentRoute.value.name === rName
}

const isActiveGroup = (group) => {
  return _.findIndex(group.routes, (r) => { return r.name === router.currentRoute.value.name }) !== -1
}

</script>

<template>
  <div class="flex flex-col w-full h-full overflow-hidden">
    <div class="flex-none">
      <slot name="header"></slot>
    </div>
    <div class="flex-none text-center p-2">
      <button class="w-6 h-6 rounded-full" @click="emit('toggleDock')">
        <i :class="{'las la-chevron-right' : isDocked, 'las la-chevron-left': !isDocked} "></i>
      </button>
    </div>
    <div class="grow bg-primary-900 overflow-y-auto">
      <div
          v-for="itemGroup in items" :key="`group-${itemGroup.group}`"
          class="flex flex-col mt-4"
          :class="{ 'border-b border-primary-900' : showDividers }"
      >
        <div v-if="!itemGroup.auth || auth.isAuthenticated">
          <div v-if="showGroups && !props.isDocked" class="tracking-[.3em] text-slate-400 pl-2 text-xs mb-1.5" :class="{'text-slate-50' : isActiveGroup(itemGroup) }">{{ itemGroup.group }}</div>
          <div class="flex flex-col" v-for="item in itemGroup.items" :key="`route-${item.name}`">
            <DockedDrawerItem
                :is-docked="props.isDocked"
                :item-name="item.name"
                :is-action="item.action"
                :icon="item.icon"
                :show-icon="showIcons"
                class="py-1 text-base opacity-80 hover:scale-105 hover:opacity-100 hover:cursor-pointer  transition-all ease-in-out duration-300"
                :class="{
                  'hover:scale-110' : isDocked,
                  'bg-primary-900' : isActiveRoute(item.name),
                  'pl-2 border-r-8 border-secondary-300 shadow-inner' : !props.isDocked && isActiveRoute(item.name)
                }"
                @navigated="emit('navigated', item.name)"
                @action="emit('action', item.name)"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="flex-none">
      <slot name="footer"></slot>
    </div>
  </div>

</template>


<style scoped>

</style>
