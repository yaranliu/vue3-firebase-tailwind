<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore} from "@/stores/auth";
import { DrawerItems, UserButtonActions } from '../../configuration/LayoutConfiguration'
import LayoutHeader from "@/layout/header/LayoutHeader.vue";
import Drawer from "@/layout/drawer/Drawer.vue";
import { DrawerWidth } from "@/layout/drawer/DrawerWidth";

const auth = useAuthStore();
const router = useRouter()
const emit = defineEmits([ 'drawerAction', 'userButtonAction'])

const isOpen = ref(true)
const drawerWidth = ref<DrawerWidth>(DrawerWidth.sm) // sm, md,

const onDrawerAction = (action: string) => {
  emit('drawerAction', action)
}

const onDrawerNavigation = (route: string) => {
}

const onUserButtonAction = (action: string) => {
  emit('userButtonAction', action)
}

const changeWidth = (w: DrawerWidth) => {
  drawerWidth.value = w
}

const containerClass = computed(() => ({
  'w-0' : !isOpen.value,
  'w-12' : isOpen.value && drawerWidth.value === DrawerWidth.sm,
  'w-20' : isOpen.value && drawerWidth.value === DrawerWidth.md,
  'w-64' : isOpen.value && drawerWidth.value === DrawerWidth.lg,
}))

</script>
<template>
  <main>
    <div class="flex flex-row">
      <div class="flex-none h-screen overflow-hidden transition-width ease-in-out duration-150 max-w-64"
           :class="containerClass"
      >
        <Drawer
            class="text-white bg-blue-100 bg-opacity-20 shadow-2xl overscroll-contain"
            :items="DrawerItems"
            :is-open="isOpen"
            :width="drawerWidth"
            show-groups
            space-groups
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
        </Drawer>
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
        <div class="grow bg-transparent overflow-y-auto overscroll-contain" >
          <RouterView
              v-slot="{ Component }"
              class="overflow-y-auto"
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
