<script setup>
import { ref, watch, onMounted, computed, reactive } from 'vue'

const emit = defineEmits([ 'drawerAction', 'userButtonAction'])

import { useRouter } from 'vue-router'
const router = useRouter()

import { useAuthStore} from "@/stores/auth";
const auth = useAuthStore();

import NavigationItem from "@/layout/Navigation/NavigationItem.vue";
import UserDropDown from "@/layout/user-drop-down/UserDropDown.vue";
import Drawer from "@/layout/drawer/Drawer.vue";

const isOpen = ref(true)

import { DrawerItems, UserButtonActions } from '@/configuration/LayoutConfiguration'
import LayoutHeader from "@/layout/header/LayoutHeader.vue";
import UserProfileForDrawer from "@/components/app/UserProfileForDrawer.vue";
import ExampleDrawerFooter from "@/components/app/ExampleDrawerFooter.vue";
import LayoutFooter from "@/layout/footer/LayoutFooter.vue";

const isActiveRoute = (rName) => {
  return router.currentRoute.value.name === rName
}

const onDrawerAction = (action) => {
  emit('drawerAction', action)
}

const onDrawerNavigation = (route) => {
}

const onUserButtonAction = (action) => {
  emit('userButtonAction', action)
}

onMounted(() => {
})

</script>
<template>
  <main>
    <div class="flex flex-col w-full h-screen overflow-hidden">
      <div class="flex-none">
        <LayoutHeader
            class="text-slate-100 text-sm"
            :user-button-actions="UserButtonActions"
            @menu-clicked="isOpen = !isOpen"
            @user-action="onUserButtonAction"
        />
      </div>
      <div class="grow overflow-y-auto">
        <div class="h-full flex flex-row">
          <div class="flex-none w-64 transition-all ease-in-out duration-300" :class="{'-translate-x-64 w-0' : !isOpen }">
            <Drawer
                class="bg-primary-700 text-white"
                :items="DrawerItems"
                :is-open="isOpen"
                show-dividers
                show-groups
                show-icons
                @navigated="onDrawerNavigation"
                @action="onDrawerAction" >
              <template #header>
                <UserProfileForDrawer />
              </template>
              <template #footer>
                <ExampleDrawerFooter />
              </template>
            </Drawer>
          </div>

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
        <LayoutFooter />
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
