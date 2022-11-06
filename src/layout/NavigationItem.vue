<script setup>
import { computed } from "vue";

import { RouterLink, useRouter } from 'vue-router'
const router = useRouter()

import { useAuthStore} from "@/stores/auth";
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
      {{ $t(`navigation.${routeName}`) }}
    </RouterLink>
  </span>
</template>


<style scoped>

</style>
