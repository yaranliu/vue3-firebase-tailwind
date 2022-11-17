<script setup>

import { DefaultIcons } from "@/configuration/AppConfiguration.js";

import { ref, computed, useSlots, onMounted } from "vue";
import { uniqueGen } from "@/lib/uuid-generator";

const slots = useSlots()

const props = defineProps({
  modelValue: {type: String, default: ''},
  clearable: {type: Boolean, default: false},
  clearButtonClass: { type: String, default: ''},
  error: { type: Boolean, default: false},
  leftIcon: { type: String},
  rightIcon: { type: String},
  placeholder: {type: String, default: ''},
  type: {type: String, default: 'text'},
  inputClass: {type: String},
  autoComplete: { type: Boolean, default: false },
  min: { type:String },
  max: { type:String },
  step: { type:Number, default: 1 },
  required: { type:Boolean, default: false },

})

const emit = defineEmits(['update:modelValue', 'leftClick', 'rightClick'])

const container = ref(null)
const inputField = ref(null)
const inputId = ref(null)
const inputName = ref(null)

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

onMounted(() => {
  let { id, name } = uniqueGen(container.value, 'input')
  inputId.value = (container.value.getAttribute('id') === null) ? id : `${container.value.getAttribute('id')}-input`
  inputName.value = (container.value.getAttribute('name') === null) ? id : `${container.value.getAttribute('name')}-input`
})

</script>

<template>
  <div
      ref="container"
      class="flex flex-row items-center text-white py-2 px-2 rounded focus:outline-none focus:bg-opacity-10 placeholder-slate-500 space-x-0.5"
      :class="
      {
          'bg-white bg-opacity-5' : !error,
          'bg-alert-900 bg-opacity-25' : error
      }"
  >

    <div v-if="slots.prepend" class="flex-none h-full grid place-content-center">
      <slot name="prepend"></slot>
    </div>

    <div class="flex-1 h-full">
      <input
          :id="inputId"
          :name="inputName"
          ref="inputField"
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
          :max="props.max"
          :min="props.min"
          :step="props.step"
          :required="props.required"
      >
    </div>

    <div v-if="clearable && modelValue" class="flex-none h-full grid place-content-center" >
      <button @click="value = ''" class="group rounded-full text-slate-500 focus:outline-none focus:bg-white focus:bg-opacity-30" :class="clearButtonClass" >
        <i class="group-focus:text-slate-200" :class="DefaultIcons.clear" />
      </button>
    </div>

    <div v-if="slots.append" class="flex-none h-full grid place-content-center">
      <slot name="append"></slot>
    </div>
  </div>

</template>


<style scoped>
input::-webkit-calendar-picker-indicator {
  filter: invert(0.7);
}

</style>
