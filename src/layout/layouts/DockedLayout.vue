<script setup>
import { ref, onMounted } from 'vue'

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

const emit = defineEmits([ 'drawerAction', 'userButtonAction'])

const isOpen = ref(true)
const isDocked = ref(true)

const onDrawerAction = (action) => {
  emit('drawerAction', action)
}

const onDrawerNavigation = (route) => {
}

const onUserButtonAction = (action) => {
  emit('userButtonAction', action)
}

const onToggleDock = () => {
  console.log('toggle')
  isDocked.value = !isDocked.value
}

onMounted(() => {
})

</script>
<template>
  <main>
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
          <div
              class="flex-none transition-all ease-in-out duration-300"
              :class="{ '-translate-x-64 w-0' : !isOpen, 'w-64' : isOpen && !isDocked, 'w-12' : isOpen && isDocked }">
            <DockedDrawer
                class="bg-primary-700 text-white"
                :items="DrawerItems"
                :is-open="isOpen"
                :is-docked="isDocked"
                show-dividers
                show-groups
                show-icons
                @navigated="onDrawerNavigation"
                @action="onDrawerAction"
                @toggle-dock="onToggleDock"
            >
              <template #header>
                <UserProfileForDrawer :is-docked="isDocked" />
              </template>
              <template #footer>
                <ExampleDrawerFooter :is-docked="isDocked" />
              </template>
            </DockedDrawer>
          </div>

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
