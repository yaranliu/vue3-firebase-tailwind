<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const toggle = () => {
  emit('update:modelValue', !props.modelValue)
}

</script>

<template>
  <div class="flex-0 flex flex-col" :class="{'w-6' : modelValue}">
    <button @click="toggle" class="text-right mt-0.5 mr-1 mb-1">
      <i class="text-xl" :class="{'las la-times': !modelValue, 'las la-angle-right':modelValue}" />
    </button>
    <slot></slot>
  </div>
</template>


<style scoped>

</style>
