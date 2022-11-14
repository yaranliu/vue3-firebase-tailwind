<script setup>

import { DefaultIcons } from "@/components/config/DefaultIcons.js";

import { ref, computed, useSlots } from "vue";

const slots = useSlots()

const props = defineProps({
  modelValue: {type: String, default: ''},
  clearable: {type: Boolean, default: false},
  error: { type: Boolean, default: false},
  leftIcon: { type: String},
  rightIcon: { type: String},
  placeholder: {type: String, default: ''},
  type: {type: String, default: 'text'},
  inputClass: {type: String},
  autoComplete: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue', 'leftClick', 'rightClick'])

const container = ref(null)

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

</script>

<template>
  <div
      ref="container"
      class="flex flex-row items-center text-white py-2 px-2 rounded focus:outline-none focus:bg-opacity-10 placeholder-slate-500 space-x-2"
      :class="
      {
          'bg-white bg-opacity-5' : !error,
          'bg-alert-900 bg-opacity-25' : error
      }"
  >

    <div v-if="slots.prepend" class="flex-none h-full grid place-content-center">
      <slot name="prepend"></slot>
    </div>

    <div class="grow h-full">
      <input
          v-model="value"
          class="w-full focus:outline-none bg-transparent"
          :class="
          {
            inputClass : true,
            'text-alert-600' : error
          }"
          :placeholder="props.placeholder"
          :type="props.type"
          :autocomplete="props.autoComplete"
      >
    </div>

    <div v-if="clearable && modelValue" class="flex-none h-full" >
      <button @click="value = ''">
        <i class="text-slate-500" :class="DefaultIcons.clear" />
      </button>
    </div>

    <div v-if="slots.append" class="flex-none h-full grid place-content-center">
      <slot name="append"></slot>
    </div>
  </div>

</template>


<style scoped>


</style>
