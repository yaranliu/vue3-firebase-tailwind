<script setup lang="ts">
const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    required: false,
    default: 'Loading...'
  },
  desc: {
    type: String,
    required: false,
    default: 'Please wait'
  },
})
</script>

<template>
      <div v-if="show" wire:loading class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-slate-900 opacity-75 flex flex-col items-center justify-center">
        <div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
        <h2 class="text-center text-white text-xl font-semibold mt-2">{{ title }}</h2>
        <p class="w-1/3 text-center text-white mt-4">{{ desc }}</p>
      </div>
</template>

<style scoped>
.loader {
  border-top-color: #312e81;
  -webkit-animation: spinner 1.5s linear infinite;
  animation: spinner 1.5s linear infinite;
}

@-webkit-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
