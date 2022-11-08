<script setup>
const props = defineProps({
  isDocked: { type: Boolean, default: false }
    })
</script>

<template>
  <section>
    <div class="h-12 bg-secondary-200 text-blue-800 grid place-content-center">
      {{ props.isDocked ? 'F' :'Drawer Footer' }}
    </div>
  </section>
</template>


<style scoped>

</style>
