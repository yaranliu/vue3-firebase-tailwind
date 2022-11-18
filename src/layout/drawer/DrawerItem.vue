<script setup>
import { computed } from "vue";

import { useRouter } from 'vue-router'
const router = useRouter()

import { useI18n } from "vue-i18n"
const { t } = useI18n()

import { useAuthStore} from "@/stores/auth";
const auth = useAuthStore();

const props = defineProps(
    {
      itemName: {
        type: String,
        default: ''
      },
      icon: {
        type: String,
        default: undefined
      },
      alwaysShow: {
        type: Boolean,
        default: false
      },
      isAction: {
        type: Boolean,
        default: false
      },
      showIcon: {
        type: Boolean,
        default: true
      }
    }
)

const emit = defineEmits(['navigated', 'action'])
const showNavItem = computed(() => { return props.alwaysShow || auth.isAuthenticated || !router.resolve({ name: props.itemName }).meta.requiresAuth })

const onClick = () => {
  if (props.isAction) emit('action')
  else {
    router.push( { name: props.itemName })
    emit('navigated')
  }
}

</script>

<template>
  <div class="flex flex-row items-center h-12 pl-4 whitespace-nowrap" @click="onClick">
    <div v-if="showIcon" class="p-2 text-xl mx-1.5 w-8" >
      <i v-if="icon" :class="icon" />
    </div>
    <div v-if="isAction">
      {{ t(`${itemName}.lg`) }}
    </div>
    <div v-if="router.hasRoute(itemName)"><span v-if="showNavItem">{{ t(`${itemName}.lg`) }}</span>
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
    "dogs": { "md": "Dogs", "lg": "Dog Breeds", "hint": ""},
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
    "dogs": { "md": "Köpekler", "lg": "Köpek Türleri", "hint": ""},
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
