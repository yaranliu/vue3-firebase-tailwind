<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

import * as _ from "lodash/array";

import { useAuthStore} from "@/stores/auth";
const auth = useAuthStore();

import DrawerItem from "@/layout/DrawerItem.vue";

const props = defineProps({
  routes: { type: Array },
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
    <div class="flex-none bg-green-500 h-24 text-black">
      Header
    </div>
    <div class="grow bg-primary-900 overflow-y-auto">
      <div
          v-for="routeGroup in routes" :key="`group-${routeGroup.group}`"
          class="flex flex-col mt-1.5"
          :class="{ 'border-b border-primary-900' : showDividers }"
      >
        <div v-if="!routeGroup.auth || auth.isAuthenticated">
          <div v-if="showGroups" class="tracking-[.3em] text-slate-400 pl-2 text-xs mb-1.5" :class="{'text-slate-50' : isActiveGroup(routeGroup) }">{{ routeGroup.group }}</div>
          <div class="flex flex-col" v-for="route in routeGroup.routes" :key="`route-${route.name}`">
            <DrawerItem
                :route-name="route.name"
                :is-action="route.action"
                :icon="route.icon"
                :show-icon="showIcons"
                class="pl-2 py-1 text-base hover:opacity-100 hover:cursor-pointer opacity-80"
                :class="{ 'bg-primary-900 border-r-4 border-secondary-300' : isActiveRoute(route.name) }"
                @navigated="emit('navigated', route.name)"
                @action="emit('action', route.name)"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="flex-none bg-red-500 h-24 text-black">Footer</div>

<!--    <div class="flex flex-col justify-start">-->
<!--      &lt;!&ndash;      Header&ndash;&gt;-->
<!--      <div class="h-24 mb-2 bg-green-500">Header</div>-->

<!--      &lt;!&ndash;      Drawer Items&ndash;&gt;-->
<!--      <div class="grow overflow-y-auto">-->
<!--        <div-->
<!--            v-for="routeGroup in routes" :key="`group-${routeGroup.group}`"-->
<!--            class="flex flex-col mt-1.5"-->
<!--            :class="{ 'border-b border-primary-900' : showDividers }"-->
<!--        >-->
<!--          <div v-if="!routeGroup.auth || auth.isAuthenticated">-->
<!--            <div v-if="showGroups" class="tracking-[.3em] text-slate-400 pl-2 text-xs mb-1.5" :class="{'text-slate-50' : isActiveGroup(routeGroup) }">{{ routeGroup.group }}</div>-->
<!--            <div class="flex flex-col" v-for="route in routeGroup.routes" :key="`route-${route.name}`">-->
<!--              <DrawerItem-->
<!--                  :route-name="route.name"-->
<!--                  :is-action="route.action"-->
<!--                  :icon="route.icon"-->
<!--                  :show-icon="showIcons"-->
<!--                  class="pl-2 py-1 text-base hover:opacity-100 hover:cursor-pointer opacity-80"-->
<!--                  :class="{ 'bg-primary-900 border-r-4 border-secondary-300' : isActiveRoute(route.name) }"-->
<!--                  @navigated="emit('navigated', route.name)"-->
<!--                  @action="emit('action', route.name)"-->
<!--              />-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->

<!--    </div>-->

<!--    &lt;!&ndash;    Footer&ndash;&gt;-->
<!--    <div class="h-24 bg-green-300">Footer</div>-->
  </div>

</template>


<style scoped>

</style>
