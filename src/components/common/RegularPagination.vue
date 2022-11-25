<script setup>
import * as _ from "lodash"
import { ref, computed, onMounted, customRef } from "vue";
import {useI18n} from "vue-i18n"
import {Paged} from "@/lib/api/Paged";
const {t} = useI18n()

import { DefaultIcons } from "@/configuration/AppConfiguration";

// Props
const props = defineProps({
  modelValue: { type: Paged },
  isLoading: { type: Boolean },
  isLoaded: { type: Boolean },
  isFailed: { type: Boolean },
  perPageOptions: { type: Array, default: [10, 25, 50, 100] }
})

// Emits
const emit = defineEmits(['to', 'perPage'])

// Refs
const perPage = ref(null)
const totalPages = ref(null)
const toPage = ref(null)

// Computed
const delay = 500
let timeout

const toPageCalc = computed({
  get() { return props.modelValue.Page },
  set(val) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      toPage.value = val
      gotoPage()
    }, delay)
  }
})

const computedPageNumberStyle = computed(() => {
  return 'width: ' + ((props.modelValue.TotalRecords / _.min(props.perPageOptions)).toString().length) * 12 + 'px;'
})

const computedPageInputStyle = computed(() => {
  return 'text-align:center; ' + 'width: ' + ((props.modelValue.TotalRecords / _.min(props.perPageOptions)).toString().length) * 14 + 'px;'
})

// Methods
const to = (page) => { emit('to', page)}

const gotoPage = () => {
  if (toPage.value < 1) toPage.value = 1
  if (toPage.value > props.modelValue.TotalPages) toPage.value = props.modelValue.TotalPages
  to(toPage.value)
}

const updatePerPage = (event) => {
  emit('perPage', event.target.value)
}

</script>

<template>
  <div class="pagination font-mono">
    <div class="mr-4">
      <span class="text-center pr-2 text-sm hidden sm:inline-block">{{ t('page') }} </span>
      <span class="text-right px-1 text-sm inline-block" :style="computedPageNumberStyle">{{ modelValue.Page }}</span>
      {{  t('of') }}
      <span ref="totalPages" class="text-left px-1 text-sm inline-block" :style="computedPageNumberStyle">{{ modelValue.TotalPages }}</span>
    </div>
    <button class="pagination-button" :disabled="modelValue.Page === 1 || isLoading || isFailed" @click="to(1)"><i :class="DefaultIcons.pagination.first" /></button>
    <button class="pagination-button" :disabled="modelValue.Page <= 1 || isLoading || isFailed" @click="to(modelValue.Page - 1)"><i :class="DefaultIcons.pagination.previous" /></button>
    <input
        v-model="toPageCalc"
        class="bg-white bg-opacity-5 text-white rounded-md text-xs text-center py-2 rounded focus:outline-none focus:bg-opacity-10 placeholder-slate-500 focus:outline-none"
        type="number"
        :style="computedPageInputStyle"
    />

    <button class="pagination-button" :disabled="modelValue.Page >= modelValue.TotalPages || isLoading || isFailed" @click="to(modelValue.Page + 1)" ><i :class="DefaultIcons.pagination.next" /></button>
    <button class="pagination-button" :disabled="modelValue.Page === modelValue.TotalPages || isLoading || isFailed" @click="to(modelValue.TotalPages)"><i :class="DefaultIcons.pagination.last" /></button>

    <label class="text-sm pl-4 hidden md:block">{{ t('showing') }}</label>
    <select class="rounded-md text-center ml-2 focus:outline-none bg-white bg-opacity-5 text-white h-8 px-2" @input="updatePerPage" :disabled="isLoading || isFailed">
      <option v-for="option in props.perPageOptions" :value="option">{{ option }}</option>
    </select>
    <label class="text-sm hidden md:block">{{ t('records') }}</label>
  </div>

</template>


<style scoped>

.pagination {
  @apply flex flex-row items-center space-x-2
}

.pagination-button {
  @apply rounded-full disabled:text-slate-400
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
