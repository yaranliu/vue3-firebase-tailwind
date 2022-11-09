<script setup>
import {DrawerWidth} from "@/layout/drawer/DrawerWidth.ts";

const props = defineProps({
  isDocked: { type: Boolean, default: false },
  width: { type: String, default: DrawerWidth.md }
})
</script>

<template>
  <section>
    <div class="h-12 bg-secondary-200 text-blue-800 grid place-content-center">
      {{ props.width === DrawerWidth.lg ? 'Drawer Footer' : 'F'}}
    </div>
  </section>
</template>


<style scoped>

</style>
