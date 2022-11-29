<script setup lang="ts">

import { useRouter } from 'vue-router'


import findIndex from "lodash/findIndex";
import {DrawerWidth} from "@/layout/drawer/DrawerWidth";

import { useAuthStore} from "@/stores/auth";
import type {DrawerItemGroup} from "@/configuration/LayoutConfiguration";
import type {DraweItemDefinition} from "@/configuration/LayoutConfiguration";
import type {PropType} from "vue";
import DrawerItem from "@/layout/drawer/DrawerItem.vue";
import {B} from "vitest/dist/global-58e8e951";

const auth = useAuthStore();
const router = useRouter()



const props = defineProps({
  items: { type: Array as PropType<Array<DrawerItemGroup>>},
  isOpen: { type: Boolean},
  width: { type: String, default: DrawerWidth.md },
  showGroups : { type: Boolean, default: false },
  showIcons: { type: Boolean, default: true },
  spaceGroups: { type: Boolean, default: false },
  inOverlay: { type: Boolean, default: false }
})

const emit = defineEmits(['navigated', 'action', 'widthChanged'])

const isActiveRoute = (rName: string) => {
  return router.currentRoute.value.name === rName
}

const isActiveGroup = (group: DrawerItemGroup) => {
  return findIndex(group.items, (r) => { return r.name === router.currentRoute.value.name }) !== -1
}

const itemClass = ((item : DraweItemDefinition) => (
    {
      // 'border-x-8 border-x-primary-900' : true,
      // 'bg-primary-400' : isActiveRoute(item.name),
      // 'border-r-secondary-300 shadow-inner' : props.width === DrawerWidth.lg && isActiveRoute(item.name)
    }
))

</script>

<template>
  <div class="flex flex-col w-full h-full overflow-hidden">
    <div class="flex-none flex row w-full justify-between h-12">
      <button v-if="width !== DrawerWidth.sm" class="grow p-3 text-left"  @click="emit('widthChanged', width === DrawerWidth.lg ? DrawerWidth.md : DrawerWidth.sm)"><i class="las la-angle-left text-sm" /></button>
      <button v-if="width !== DrawerWidth.lg" class="grow p-3" :class="{'text-center' : width === DrawerWidth.sm }" @click="emit('widthChanged', width === DrawerWidth.sm ? DrawerWidth.md : DrawerWidth.lg)"><i class="las la-angle-right text-sm" /></button>
    </div>
    <div class="flex-none">
      <slot name="header"></slot>
    </div>
    <div class="grow overflow-y-auto mt-2 " >
      <div
          v-for="itemGroup in items" :key="`group-${itemGroup.group}`"
          class="flex flex-col"
      >
        <div v-if="!itemGroup.auth || auth.isAuthenticated" :class="{'mb-8' : spaceGroups }">
          <div v-if="showGroups && props.width === DrawerWidth.lg"
               class="tracking-[.3em] text-slate-400 pl-2.5 text-xs mb-1.5"
               :class="{'text-slate-50' : isActiveGroup(itemGroup) }">{{ itemGroup.group }}
          </div>
          <div class="flex flex-col hide-scrollbars" v-for="item in itemGroup.items" :key="`route-${item.name}`">
            <DrawerItem
                :width="width"
                :item-name="item.name"
                :is-action="item.action"
                :icon="item.icon"
                :show-icon="showIcons"
                class="text-base opacity-80"
                :class="itemClass(item)"
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
