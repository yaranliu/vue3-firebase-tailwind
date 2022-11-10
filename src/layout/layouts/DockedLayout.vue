<script setup>
import { ref, computed } from 'vue'

import { useRouter } from 'vue-router'
const router = useRouter()

import { useAuthStore} from "@/stores/auth";
const auth = useAuthStore();

import { DrawerItems, UserButtonActions } from '../configuration/LayoutConfiguration'
import LayoutHeader from "@/layout/header/LayoutHeader.vue";
import DockedDrawer from "@/layout/drawer/DockedDrawer.vue";
import { DrawerWidth } from "@/layout/drawer/DrawerWidth.ts";

const emit = defineEmits([ 'drawerAction', 'userButtonAction'])

const isOpen = ref(true)
const drawerWidth = ref(DrawerWidth.sm) // sm, md,

const onDrawerAction = (action) => {
  emit('drawerAction', action)
}

const onDrawerNavigation = (route) => {
}

const onUserButtonAction = (action) => {
  emit('userButtonAction', action)
}

const changeWidth = (w) => {
  drawerWidth.value = w
}

const containerClass = computed(() => ({
  'w-0' : !isOpen.value,
  'w-12' : isOpen.value && drawerWidth.value === DrawerWidth.sm,
  'w-18' : isOpen.value && drawerWidth.value === DrawerWidth.md,
  'w-64' : isOpen.value && drawerWidth.value === DrawerWidth.lg,
}))

</script>
<template>
  <main>
    <div class="flex flex-row">
      <div class="flex-none h-screen overflow-hidden transition-width ease-in-out duration-150 max-w-64"
           :class="containerClass">
        <DockedDrawer
            class="text-white bg-blue-100 bg-opacity-20 shadow-2xl overscroll-contain"
            :items="DrawerItems"
            :is-open="isOpen"
            :width="drawerWidth"
            show-dividers
            show-groups
            show-icons
            @navigated="onDrawerNavigation"
            @action="onDrawerAction"
            @width-changed="changeWidth"
        >
          <template #header>
            <!--            <UserProfileForDrawer :is-docked="isDocked" :width="drawerWidth" />-->
          </template>
          <template #footer>
            <!--            <ExampleDrawerFooter :width="drawerWidth" />-->
          </template>
        </DockedDrawer>
      </div>
      <div class="flex flex-col w-full h-screen overscroll-contain">
<!--        Header-->
        <LayoutHeader
            ref="layoutHeader"
            class="flex-none text-slate-100 text-sm"
            :user-button-actions="UserButtonActions"
            @menu-clicked="isOpen = !isOpen"
            @user-action="onUserButtonAction"
        />
        <div class="grow bg-transparent p-4 overflow-y-auto overscroll-contain" >
          <RouterView
              v-slot="{ Component }"
              class="overflow-y-auto overscroll-contain"
          >
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </RouterView>
        </div>
<!--        Footer-->
<!--        <div class="flex-none" ref="layoutFooter">-->
<!--          <LayoutFooter />-->
<!--        </div>-->



      </div>
    </div>
  </main>


</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>
