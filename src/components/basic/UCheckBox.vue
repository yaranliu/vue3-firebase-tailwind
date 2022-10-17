<script setup>

</script>

<template>
  <div class="flex items-center mr-4 mb-2">
    <input type="checkbox" id="check-box" class="opacity-0 absolute h-8 w-8" />
    <div class="bg-white border rounded border-indigo-400 w-3.5 h-3.5 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-indigo-500">
      <svg class="fill-current hidden w-3 h-3 text-indigo-600 pointer-events-none" viewBox="0 0 17 12" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" fill-rule="evenodd">
          <g transform="translate(6 6)" fill="#1F73F1" fill-rule="nonzero">
            <path d="m 8.0016 -4.6091 c 0.4312 0.4207 0.4312 1.1007 0 1.5216 l -7.1687 6.9949 c -0.215 0.2099 -0.4974 0.3155 -0.7797 0.3155 c -0.2823 0 -0.5646 -0.1056 -0.7797 -0.3155 l -3.5843 -3.4974 c -0.4313 -0.4207 -0.4313 -1.1009 0 -1.5216 c 0.4312 -0.4209 1.1281 -0.4209 1.5594 0 l 2.8045 2.7366 l 6.389 -6.234 c 0.4312 -0.4209 1.1281 -0.4209 1.5594 0 z" />
          </g>
        </g>
      </svg>
    </div>
    <label for="check-box" class="select-none text-xs">Checkbox</label>
  </div>
</template>

<style scoped>
input:checked + div {
  @apply border-indigo-700;
}
input:checked + div svg {
  @apply block;
}
</style>
