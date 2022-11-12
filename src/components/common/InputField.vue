<script setup>
const props = defineProps({
  modelValue: {type: String, default: ''},
  placeholder: {type: String, default: ''},
  type: {type: String, default: 'text'}
})
</script>

<template>
  <div class="relative">
    <input
        class="w-full py-2 px-7 rounded text-white bg-white bg-opacity-5 focus:outline-none focus:bg-opacity-10 placeholder-slate-400"
        :placeholder="props.placeholder"
        :type="props.type"
    >
    <button class="absolute right-0 top-0 h-full mx-2">
      <i class="las la-times"/>
    </button>
    <button class="absolute left-0 top-0 h-full mx-2">
      <i class="las la-times"/>
    </button>
  </div>
</template>


<style scoped>

</style>
