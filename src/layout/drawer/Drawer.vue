<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

import * as _ from "lodash/array";

import { useAuthStore} from "@/stores/auth";
const auth = useAuthStore();

import DrawerItem from "@/layout/drawer/DrawerItem.vue";

const props = defineProps({
  items: { type: Array },
  isOpen: { type: Boolean},
  showGroups : { type: Boolean, default: false },
  showIcons: { type: Boolean, default: true },
  showDividers: { type: Boolean, default: false }
})

const emit = defineEmits(['navigated', 'action'])

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
    <div class="grow bg-primary-900 overflow-y-auto">
      <div
          v-for="itemGroup in items" :key="`group-${itemGroup.group}`"
          class="flex flex-col mt-4"
          :class="{ 'border-b border-primary-900' : showDividers }"
      >
        <div v-if="!itemGroup.auth || auth.isAuthenticated">
          <div v-if="showGroups" class="tracking-[.3em] text-slate-400 pl-2 text-xs mb-1.5" :class="{'text-slate-50' : isActiveGroup(itemGroup) }">{{ itemGroup.group }}</div>
          <div class="flex flex-col" v-for="item in itemGroup.items" :key="`route-${item.name}`">
            <DrawerItem
                :item-name="item.name"
                :is-action="item.action"
                :icon="item.icon"
                :show-icon="showIcons"
                class="pl-2 py-1 text-base hover:opacity-100 hover:cursor-pointer opacity-80"
                :class="{ 'bg-primary-900 border-r-8 border-secondary-300 shadow-inner' : isActiveRoute(item.name) }"
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
