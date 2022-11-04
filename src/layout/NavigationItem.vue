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
      alwaysShow: {
        type: Boolean,
        default: false
      }
    }
)

defineEmits(['navigated'])

const isActive = computed(() => { return router.currentRoute.value.name === props.routeName })
const showItem = computed(() => { return props.alwaysShow || auth.isAuthenticated || !router.resolve({ name: props.routeName }).meta.requiresAuth })

</script>

<template>
  <RouterLink v-if="showItem" :to="{ name: routeName }" class="" :class="{'text-secondary-300': isActive}" @click="$emit('navigated')">
    {{ $t(`navigation.${routeName}`) }}
  </RouterLink>
</template>


<style scoped>

</style>
