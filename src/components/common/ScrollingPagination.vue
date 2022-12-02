<script setup lang="ts">
import {useI18n} from "vue-i18n"
import {Scrolling} from "@/lib/api/Scrolling";

import { DefaultIcons } from "@/configuration/AppConfiguration";

const {t} = useI18n()

// Props
const props = defineProps({
  modelValue: { type: Scrolling },
  isLoading: { type: Boolean },
  isLoaded: { type: Boolean },
  isFailed: { type: Boolean },
})

// Emits
const emit = defineEmits(['getMore'])

// Refs

// Computed

// Methods
const getMoreClicked = (after: boolean) => {
  emit('getMore', { after: after, auto: false } )
}

</script>

<template>
  <div class="pagination">
    <div class="flex-row items-center space-x-0.5">
      <button class="pagination-button" :disabled="isLoading || isFailed" @click="getMoreClicked(false)"><i :class="DefaultIcons.caret.up" /></button>
      <button class="pagination-button" :disabled="isLoading || isFailed" @click="getMoreClicked(true)"><i :class="DefaultIcons.caret.down" /></button>
    </div>
  </div>

</template>


<style scoped>

.pagination {
  @apply flex flex-row items-center justify-between space-x-2 md:space-x-6 py-0.5
}

.pagination-button {
  @apply w-7 h-7 rounded-full disabled:text-slate-400 hover:bg-white hover:bg-opacity-10
}
.pagination-button i {
  @apply text-base
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}


</style>
<i18n>
{
  "tr": {
    "page" : "Sayfa",
    "of" : "/",
    "showing": "Her sayfada",
    "records": "kayıt gösteriliyor",
    "total": "Toplam",
    "pages": "sayfa"
  },
  "en": {
    "page" : "Page",
    "of" : "of",
    "showing": "Showing",
    "records": "records on each page",
    "total": "Total",
    "pages": "pages"
  }
}
</i18n>
