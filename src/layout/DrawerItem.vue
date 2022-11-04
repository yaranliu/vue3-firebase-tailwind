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
const showItem = computed(() => { return props.alwaysShow || auth.isAuthenticated || !router.resolve({ name: props.routeName }).meta.requiresAuth })

</script>

<template>
  <div v-if="showItem" class="flex flex-row items-center h-11">
    <div class="p-2 text-xl">
      <i v-if="icon" :class="icon" />
    </div>
    <RouterLink :to="{ name: routeName }" @click="$emit('navigated')" :class="{ 'ml-4' : !icon }">
      {{ $t(`navigation.${routeName}`) }}
    </RouterLink>
  </div>

</template>


<style scoped>

</style>
