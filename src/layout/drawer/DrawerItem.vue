<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRouter } from 'vue-router'
import { useAuthStore} from "@/stores/auth";
import {DrawerWidth} from "@/layout/drawer/DrawerWidth";
import { useI18n } from "vue-i18n"

const router = useRouter()

const auth = useAuthStore();

const { t } = useI18n()

const props = defineProps(
    {
      itemName: { type: String, default: '' },
      icon: { type: String, default: undefined },
      alwaysShow: { type: Boolean, default: false },
      isAction: { type: Boolean, default: false },
      showIcon: { type: Boolean, default: true },
      defaultNavIcon: { type: String, default: 'las la-link' },
      defaultActionIcon: { type: String, default: 'las la-caret-right' },
      width: { type: String, default: DrawerWidth.md },
    }
)

const emit = defineEmits(['navigated', 'action'])
const showNavItem = computed(() => { return props.alwaysShow || auth.isAuthenticated || !router.resolve({ name: props.itemName }).meta.requiresAuth })
const displayIcon = computed(() => { return props.icon ? props.icon : ( props.isAction ? props.defaultActionIcon : props.defaultNavIcon ) })
const iconSize = computed(() => {
  switch (props.width) {
    case DrawerWidth.lg: return 'text-xl';
    case DrawerWidth.md: return 'text-2xl';
    case DrawerWidth.sm: return 'text-xl';
    default: return 'text-8xl'
  }
})

const iconVisible = computed(() => {
  if (props.width === DrawerWidth.lg) {
    return props.showIcon
  } else return true
})


const iconOnly = computed(() => {
  return props.width === DrawerWidth.sm
})

const onClick = () => {
  if (props.isAction) emit('action')
  else {
    router.push( { name: props.itemName })
    emit('navigated')
  }
}


</script>

<template>
    <div
        @click="onClick"
        class="flex px-1 py-1 max-w-xs group hover:opacity-100 hover:cursor-pointer"
        :class="{'mx-auto' : width !== DrawerWidth.lg} "
    >
      <div v-if="width === DrawerWidth.sm" class="group-hover:scale-110 ">
        <i class="text-center" :class="`${displayIcon} ${iconSize}`" />
      </div>
      <div
          v-else
          class="transition-all ease-in-out duration-300"
          :class="{
            'flex flex-row items-center w-full pl-3 pr-8 py-1 text-left space-x-2 group-hover:scale-102' : width === DrawerWidth.lg,
            'flex flex-col items-center w-full px-4 space-y-1 mb-3 text-center max-w-[3.5rem] text-xs group-hover:scale-105' : width === DrawerWidth.md,
      }"
      >
        <i :class="`${displayIcon} ${iconSize}`" />
        <div v-if="isAction" :class="{ 'max-h-[2rem] max-w-[3.2rem] text-ellipsis overflow-hidden' : width === DrawerWidth.md }">
          {{ t(`${itemName}.${width}`) }}
        </div>
        <div v-if="!isAction && router.hasRoute(itemName)" :class="{ 'max-h-[2rem] max-w-[3.2rem] text-ellipsis overflow-hidden' : width === DrawerWidth.md }"><span v-if="showNavItem">{{ t(`${itemName}.${width}`) }}</span></div>
      </div>
    </div>
</template>


<style scoped>

</style>

<i18n>
{
  "en": {
    "notFound": { "md": "404", "lg": "Page not found", "hint": ""},
    "home": { "md": "Home", "lg": "Home Page", "hint": "Application Home Page"},
    "about": { "md": "About Us", "lg": "About Us", "hint": "Who are we?"},
    "lorem": { "md": "Lorem", "lg": "Lorem Ipsum", "hint": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
    "scrollingPagination": { "md": "Scrolling", "lg": "Scrolling Pagination", "hint": ""},
    "regularPagination": { "md": "Regular", "lg": "Regular Pagination", "hint": ""},
    "user": { "md": "Home", "lg": "My Home Page", "hint": "" },
    "inbox": { "md": "Inbox", "lg": "Inbox", "hint": "" },
    "dashboard": { "md": "Dashboard", "lg": "Dashboard", "hint": "User Dashboard"},
    "changeTheme": { "md": "Theme", "lg": "Change theme", "hint": "Change background image and more"},
    "changeLanguage": { "md": "Language", "lg": "Change Language", "hint": ""},
    "action2": { "md": "", "lg": "Action 2", "hint": "Ana"},
    "action3": { "md": "", "lg": "Action 3", "hint": ""}
  },
  "tr": {
    "notFound": { "md": "404", "lg": "Sayfa bulunamadı", "hint": ""},
    "home": { "md": "Ana Sayfa", "lg": "Ana Sayfa", "hint": "Uygulama Ana Sayfası"},
    "about": { "md": "Biz", "lg": "Hakkımızda", "hint": "Biz kimiz"},
    "lorem": { "md": "Lorem", "lg": "Lorem Ipsum", "hint": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
    "scrollingPagination": { "md": "Sürekli", "lg": "Sürekli Sayfalandırma", "hint": ""},
    "regularPagination": { "md": "Standart", "lg": "Standart Sayfalandırma", "hint": ""},
    "user": { "md": "Sayfam", "lg": "Benim sayfam", "hint": "" },
    "inbox": { "md": "Mesajlar", "lg": "Mesajlarım", "hint": "" },
    "dashboard": { "md": "Panel", "lg": "Kullanıcı paneli", "hint": "Kullanıcı paneli"},
    "changeTheme": { "md": "Tema", "lg": "Temayı değiştir", "hint": "Uygulama arka plan görünümünü değiştir"},
    "changeLanguage": { "md": "Dil", "lg": "Dili değiştir", "hint": ""},
    "action2": { "md": "", "lg": "Komut 2", "hint": "Ana"},
    "action3": { "md": "", "lg": "Komut 3", "hint": ""}
  }
}
</i18n>
