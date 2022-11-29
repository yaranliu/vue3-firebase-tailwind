<script setup lang="ts">
import min from "lodash/min"
import {ref, computed } from "vue";
import type { PropType } from "vue";
import {useI18n} from "vue-i18n"
import type {Paged} from "@/lib/api/Paged";
import { DefaultIcons } from "@/configuration/AppConfiguration";

const {t} = useI18n()

// Props
const props = defineProps({
  modelValue: { type: Object as PropType<Paged> },
  isLoading: { type: Boolean },
  isLoaded: { type: Boolean },
  isFailed: { type: Boolean },
  perPageOptions: { type: Array as PropType<Array<number>>, default: [10, 25, 50, 100] }
})

// Emits
const emit = defineEmits(['to', 'perPage'])

// Refs
const perPage = ref(null)
const totalPages = ref(null)
const toPage = ref<number>(1)

// Computed
const delay = 500
let timeout = setTimeout(() => {}, 0)

const toPageCalc = computed({
  get() { return props.modelValue?.Page },
  set(val) {
    clearTimeout(timeout)
    if (val) {
      timeout = setTimeout(() => {
        toPage.value = val
        gotoPage()
      }, delay)
    }
  }
})

const computedPageNumberStyle = computed(() => {
  let smallest = min(props.perPageOptions)
  if (props.modelValue && smallest) {
    return 'width: ' + ((props.modelValue.TotalRecords / smallest).toString().length) * 12 + 'px;'
  }
  else return 'width: 24px;'
})

const computedPageInputStyle = computed(() => {
  let smallest = min(props.perPageOptions)
  if (props.modelValue && smallest) {
    return 'text-align:center; ' + 'width: ' + ((props.modelValue.TotalRecords / smallest).toString().length) * 14 + 'px;'
  }
  else return 'text-align:center; ' + 'width: 24px;'
})

// Methods
const to = (page: number | undefined) => {
  if (page) emit('to', page)
  else console.log('Page is undefined')
}

const gotoPage = () => {
  if (props.modelValue) {
    if (toPage.value < 1) toPage.value = 1
    if (toPage.value > props.modelValue.TotalPages) toPage.value = props.modelValue.TotalPages
    to(toPage.value)
  }
}

const updatePerPage = (event: Event) => {
  emit('perPage', (event.target as HTMLInputElement).value)
}

</script>

<template>
  <div class="pagination">
    <div class="flex-row space-x-1 text-sm">
      <i :class="DefaultIcons.pagination.page"></i>
<!--      <span class="text-center hidden sm:inline-block ">{{ t('page') }} </span>-->
      <span class="text-right inline-block " :style="computedPageNumberStyle">{{ modelValue?.Page }}</span>
      <span class="inline-block  px-1.5">{{  t('of') }}</span>
      <span ref="totalPages" class="text-left inline-block " :style="computedPageNumberStyle">{{ modelValue?.TotalPages }}</span>
    </div>
    <div class="flex-row items-center space-x-0.5">
      <button class="pagination-button" :disabled="modelValue && (modelValue.Page === 1 || isLoading || isFailed)" @click="to(1)"><i :class="DefaultIcons.pagination.first" /></button>
      <button class="pagination-button" :disabled="modelValue && (modelValue?.Page <= 1 || isLoading || isFailed)" @click="to(modelValue ? modelValue.Page - 1 : undefined)"><i :class="DefaultIcons.pagination.previous" /></button>
      <div class="inline-block">
      <input
          v-model="toPageCalc"
          class="py-0.5 bg-white bg-opacity-5 text-white rounded-md text-xs text-center rounded focus:outline-none focus:bg-opacity-10 placeholder-slate-500 focus:outline-none"
          type="number"
          :style="computedPageInputStyle"
      />
      </div>
      <button class="pagination-button" :disabled="modelValue && (modelValue.Page >= modelValue.TotalPages || isLoading || isFailed)" @click="to(modelValue ? modelValue.Page + 1 : undefined)" ><i :class="DefaultIcons.pagination.next" /></button>
      <button class="pagination-button" :disabled="modelValue && (modelValue.Page === modelValue.TotalPages || isLoading || isFailed)" @click="to(modelValue ? modelValue.TotalPages : undefined)"><i :class="DefaultIcons.pagination.last" /></button>
    </div>
    <div class="flex-row items-center space-x-2 text-sm">
      <label class="hidden md:inline-block">{{ t('showing') }}</label>
      <i class="inline-block md:hidden" :class="DefaultIcons.pagination.pages"></i>
      <select class="rounded-md text-center focus:outline-none bg-white bg-opacity-5 text-white px-2 py-0.5" @input="updatePerPage" :disabled="isLoading || isFailed">
        <option v-for="option in props.perPageOptions" :value="option">{{ option }}</option>
      </select>
      <label class="hidden md:inline-block">{{ t('records') }}</label>
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
