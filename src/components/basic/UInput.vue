<template>
  <div class="flex row items-center py-1 border-2 rounded-xl focus-within:border-blue-400 focus-within:bg-amber-50">
<!--    <div class="flex row items-center space-x-4 px-2 my-1.5">-->
<!--&lt;!&ndash;      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.0" stroke="currentColor" class="h-8 w-8">&ndash;&gt;-->
<!--&lt;!&ndash;        <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />&ndash;&gt;-->
<!--&lt;!&ndash;      </svg>&ndash;&gt;-->
<!--      <div class="flex-1 text-right font-medium text-lg">Label</div>-->
<!--    </div>-->
    <div class="flex-1 columns-1 px-2 py-1">
      <div class="text-xs tracking-wide text-gray-500 ">Title</div>
      <input class="w-full focus:bg-amber-50" style="outline: none" type="text" />
      <div class="text-xs tracking-wide text-red-400 ">Errors</div>
    </div>
    <div class="px-2">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.0" stroke="currentColor" class="h-8 w-8">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

</script>

<style scoped>
</style>
