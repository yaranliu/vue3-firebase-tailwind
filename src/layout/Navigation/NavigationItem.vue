<script setup>
import { computed } from "vue";

import { RouterLink, useRouter } from 'vue-router'
import { useI18n } from "vue-i18n"
import { useAuthStore} from "@/stores/auth";
const router = useRouter()


const { t } = useI18n()


const auth = useAuthStore();

const props = defineProps(
    {
      routeName: {
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
      }
    }
)

defineEmits(['navigated'])
const showItem = computed(() => { return router.hasRoute(props.routeName) && props.alwaysShow || auth.isAuthenticated || !router.resolve({ name: props.routeName }).meta.requiresAuth })

</script>

<template>
  <span v-if="router.hasRoute(props.routeName)">
    <RouterLink v-if="showItem" :to="{ name: routeName }" @click="$emit('navigated')">
      {{ t(`${routeName}.lg`) }}
    </RouterLink>
  </span>
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
