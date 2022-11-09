<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

import * as _ from "lodash/array";

import { useAuthStore} from "@/stores/auth";
const auth = useAuthStore();

import DockedDrawerItem from "@/layout/drawer/DockedDrawerItem.vue"
import {DrawerWidth} from "@/layout/drawer/DrawerWidth.ts";

const props = defineProps({
  items: { type: Array },
  isOpen: { type: Boolean},
  width: { type: String, default: DrawerWidth.md },
  showGroups : { type: Boolean, default: false },
  showIcons: { type: Boolean, default: true },
  showDividers: { type: Boolean, default: false }
})

const emit = defineEmits(['navigated', 'action', 'widthChanged'])

const isActiveRoute = (rName) => {
  return router.currentRoute.value.name === rName
}

const isActiveGroup = (group) => {
  return _.findIndex(group.routes, (r) => { return r.name === router.currentRoute.value.name }) !== -1
}

</script>

<template>
  <div class="flex flex-col w-full h-full overflow-hidden">
    <div class="flex-none flex row w-full justify-between h-12">
      <button v-if="width !== DrawerWidth.sm" class="grow p-2 bg-red-500" @click="emit('widthChanged', -1)"><i class="las la-chevron-left" /></button>
      <button v-if="width !== DrawerWidth.lg" class="grow p-2 bg-red-500" @click="emit('widthChanged', 1)"><i class="las la-chevron-right" /></button>
    </div>
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
          <div v-if="showGroups && props.width === DrawerWidth.lg"
               class="tracking-[.3em] text-slate-400 pl-2 text-xs mb-1.5"
               :class="{'text-slate-50' : isActiveGroup(itemGroup) }">{{ itemGroup.group }}
          </div>
          <div class="flex flex-col" v-for="item in itemGroup.items" :key="`route-${item.name}`">
            <DockedDrawerItem
                :width="width"
                :item-name="item.name"
                :is-action="item.action"
                :icon="item.icon"
                :show-icon="showIcons"
                class="text-base opacity-80 border-x-8 border-x-primary-900"
                :class="{
                  'bg-primary-900' : isActiveRoute(item.name),
                  'border-r-secondary-300 shadow-inner' : width === DrawerWidth.lg && isActiveRoute(item.name)
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
