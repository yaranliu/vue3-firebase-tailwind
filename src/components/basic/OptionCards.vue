<template>
  <div class="flex-col space-y-1">
    <div
        v-for="option in options"
        :key="option.value"
        class="option-card"
        :class="{ 'option-card-selected' : isSelected(option) }"
        @click="onClickDiv(option)"
    >
      <div class="item-icon-container" :class="{ 'item-icon-container-selected' : isSelected(option) }">
        <i v-if="option.icon" :class="option.icon" ></i>
      </div>
      <div class="flex-1 flex-col ml-3">
        <div class="font-medium">{{ option.value }}</div>
        <div class="font-mono font-light text-xs">{{ option.desc }}</div>
      </div>
      <div class="flex-col ml-2 mr-1">
        <CheckCircleIcon v-if="isSelected(option)" class="h-6 w-6 text-white" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { CheckCircleIcon } from '@heroicons/vue/24/outline'

const options = ref(
    [
      {
        value: 'op1',
        label: 'Good food',
        icon: 'las la-bell',
        desc: 'Description 1'
      },
      {
        value: 'op2',
        label: 'Good service',
        icon: 'las la-horse-head',
        color: 'teal',
        desc: 'Description 2'
      },
      {
        value: 'op3',
        label: 'Pleasant surroundings',
        icon: 'las la-hippo',
        color: 'teal',
        desc: 'Description 3'
      }
    ])

const selectedOption = ref()

const isSelected = selected => selected.value === selectedOption.value

const onClickDiv = option => {
  selectedOption.value = option.value
}

</script>

<style scoped>
.option-card {
  @apply flex items-center bg-white text-gray-700 border-2 border-indigo-200 py-2 px-3 rounded-xl hover:bg-indigo-50 ease-in-out duration-500
}
.option-card-selected{
  @apply bg-blue-800 text-white hover:bg-blue-900 border-blue-200 bg-gradient-to-br from-indigo-800 to-indigo-600 ease-in-out duration-500
}

.item-icon-container {
  @apply flex-col text-3xl text-indigo-500 rounded p-2 m-1 ease-in-out duration-100
}

.item-icon-container-selected {
  @apply text-white
}

</style>
