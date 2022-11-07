<template>
<!--  <WebLayout />-->
  <AppLayout />
</template>
<script setup>
import { onMounted} from "vue";

import { useAuthStore} from "@/stores/auth";
const auth = useAuthStore();

import { inject } from "vue";
import WebLayout from "@/layout/WebLayout.vue";
import AppLayout from "@/layout/AppLayout.vue";
const $axios = inject("$axios");



onMounted(() => {
  $axios.defaults.headers.common["Content-Type"] = "application/json";
  $axios.defaults.headers.common["Accept"] = "application/json";
  auth.setup()

})



</script>



<style scoped>
</style>

