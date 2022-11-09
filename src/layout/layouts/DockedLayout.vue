<script setup>
import { ref, onMounted, computed } from 'vue'

import { useRouter } from 'vue-router'
const router = useRouter()

import { useAuthStore} from "@/stores/auth";
const auth = useAuthStore();

import { DrawerItems, UserButtonActions } from '../configuration/LayoutConfiguration'
import LayoutHeader from "@/layout/header/LayoutHeader.vue";
import UserProfileForDrawer from "@/components/app/UserProfileForDrawer.vue";
import ExampleDrawerFooter from "@/components/app/ExampleDrawerFooter.vue";
import LayoutFooter from "@/layout/footer/LayoutFooter.vue";
import DockedDrawer from "@/layout/drawer/DockedDrawer.vue";
import {DrawerWidth} from "@/layout/drawer/DrawerWidth.ts";

const emit = defineEmits([ 'drawerAction', 'userButtonAction'])

const isOpen = ref(true)
const isDocked = ref(true)
const drawerWidth = ref(DrawerWidth.sm) // sm, md,

const onDrawerAction = (action) => {
  emit('drawerAction', action)
}

const onDrawerNavigation = (route) => {
}

const onUserButtonAction = (action) => {
  emit('userButtonAction', action)
}

const onToggleDock = () => {
  isDocked.value = !isDocked.value
  // isOpen.value = !isOpen.value
  if (drawerWidth.value === DrawerWidth.sm) drawerWidth.value = DrawerWidth.md
  else if (drawerWidth.value === DrawerWidth.md) drawerWidth.value = DrawerWidth.lg
  else if (drawerWidth.value === DrawerWidth.lg) drawerWidth.value = DrawerWidth.sm
  // setTimeout(() => { isOpen.value = !isOpen.value }, 150)

}

const containerClass = computed(() => ({
  'w-0' : !isOpen.value,
  'w-12' : isOpen.value && drawerWidth.value === DrawerWidth.sm,
  'w-18' : isOpen.value && drawerWidth.value === DrawerWidth.md,
  'w-64' : isOpen.value && drawerWidth.value === DrawerWidth.lg,
}))


onMounted(() => {
  console.log(containerClass.value)
})

</script>
<template>
  <main>
    <div class="flex flex-row">
      <div class="flex-none h-screen overflow-hidden transition-width ease-in-out duration-150 max-w-64"
           :class="containerClass">
        <DockedDrawer
            class="bg-primary-700 text-white"
            :items="DrawerItems"
            :is-open="isOpen"
            :width="drawerWidth"
            show-dividers
            show-groups
            show-icons
            @navigated="onDrawerNavigation"
            @action="onDrawerAction"
            @toggle-dock="onToggleDock"
        >
<!--          <template #header>-->
<!--            <UserProfileForDrawer :is-docked="isDocked" />-->
<!--          </template>-->
          <template #footer>
            <ExampleDrawerFooter :width="drawerWidth" />
          </template>
        </DockedDrawer>
      </div>
      <div class="flex flex-col w-full h-screen overflow-hidden bg-slate-50">
        <div class="flex-none">
          <LayoutHeader
              class="bg-primary-900 text-slate-100 text-sm"
              :user-button-actions="UserButtonActions"
              @menu-clicked="isOpen = !isOpen"
              @user-action="onUserButtonAction"
          />
        </div>
        <div class="grow overflow-y-auto">
          <div class="h-full flex flex-row">
            <!-- TODO Correct max-h of RouterView taking Header and Footer heights into consideration -->
            <div class="grow max-h-screen overflow-y-auto">
              <RouterView v-slot="{ Component }">
                <transition name="fade" mode="out-in">
                  <component :is="Component" />
                </transition>
              </RouterView>
            </div>
          </div>
        </div>
        <div class="flex-none">
          <LayoutFooter @click="onToggleDock"/>
        </div>
      </div>
    </div>
  </main>


</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>
