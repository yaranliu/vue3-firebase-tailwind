<template>
  <Navigation />
  <RouterView />
</template>
<script setup>
import { onMounted} from "vue";
import { RouterView } from 'vue-router'

import { useAuthStore} from "@/stores/auth";
const auth = useAuthStore();

import { inject } from "vue";
import Navigation from "@/layout/Navigation.vue";
const $axios = inject("$axios");



onMounted(() => {
  $axios.defaults.headers.common["Content-Type"] = "application/json";
  $axios.defaults.headers.common["Accept"] = "application/json";
  auth.setup()

})



</script>



<style scoped>
</style>
