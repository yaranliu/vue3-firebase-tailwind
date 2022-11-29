<script setup lang="ts">
import concat from "lodash/concat"
import reverse from "lodash/reverse"

import {ref, onMounted, computed} from "vue";
import { useI18n } from "vue-i18n";

import InputField from "@/components/common/InputField.vue";
import {DefaultIcons} from "@/configuration/AppConfiguration";
import {SampleApi, ScrollingRequestPagination} from "@/api/SampleApi";
import {Scrolling} from "@/lib/api/Scrolling";
import {ApiResponse} from "@/lib/api/ApiResponse";
import { ApiResultCode } from "@/lib/api/ApiResultCode";
import ScrollingPagination from "@/components/common/ScrollingPagination.vue";
import DataTable from "@/components/common/DataTable.vue";
import type { Person } from "@/models/PersonModel"

const { t } = useI18n()

const search = ref('')

const filterPanel = ref(false)
const leftPanel = ref(true)


const dataTable = ref<InstanceType<typeof DataTable> | null>(null)
const error= ref(new ApiResponse())

// data
const data = ref<Array<Person>>([])
const resourceName = ref('infinite')
const requestPagination = ref(new ScrollingRequestPagination (10, '0029', true))
const serverPagination = ref(new Scrolling('', true, true))

const abortController = ref<AbortController>(new AbortController())
const routeParams = ref(new Map([['id', '001'], ['item', '002340432']]))
const queryParams = ref({color: 'red', size: ['medium', 'small'] })

const isLoaded = ref(false)
const isFailed = ref(false)
const isLoading = ref(false)

const initial = ref(true)
const tableHeader = ref<HTMLElement | null>(null)
const tableRows = ref(null)

const firstItem = computed(() => {
  let v = data.value as Array<Person>
  let c = v.length
  if (v && c > 0) {return v[0].id }
  else { return undefined }
})

const lastItem = computed(() => {
  let v = data.value as Array<Person>
  let c = v.length
  if (v && c > 0) {return v[c - 1].id }
  else { return undefined }
})

const triggerTop = ref(false)

const onDataLoaded = (d: Array<Person>) => {
  if (initial.value) {
    data.value = d
    initial.value = false
    setTimeout(() => { bottomRow.value?.scrollIntoView( { behavior: 'smooth' })}, 50)
  }
  else {
    if (serverPagination.value.After) {
      setTimeout(() => { data.value = concat(data.value, d)}, 50)
      setTimeout(() => { bottomRow.value?.scrollIntoView( { behavior: 'smooth' })}, 100)
    }
    else {
      triggerTop.value = true
      setTimeout(() => { topRow.value?.scrollIntoView( { behavior: 'smooth' })}, 50)
      setTimeout(() => { data.value = concat(reverse(d), data.value)}, 200)
    }
  }
  isLoaded.value = true
}

const onFailed = (e: ApiResponse) => {
  error.value = e
  isFailed.value = true
}

const onLoading  = (l: boolean) => {
  isLoading.value = l
}

const fetch = () => {
  isLoaded.value = false
  isFailed.value = false
  abortController.value = new AbortController()
  dataTable.value?.fetchData(abortController.value)
}

const cancelRequest = () => {
  abortController.value.abort()
}

const onGetMore = (after: boolean) => {
  let lastId = lastItem.value === undefined ? '' : lastItem.value
  let firstId = firstItem.value === undefined ? '' : firstItem.value
  requestPagination.value = new ScrollingRequestPagination(10, after ? lastId : firstId, after)
  setTimeout(() => { fetch() }, 50)
}

const onScroll = (event: Event) => {
  let top = tableHeader.value ? tableHeader.value.clientHeight : 0
  if (tableHeader) {
    if (triggerTop.value && (event.target as HTMLElement).scrollTop <= top) {
      (event.target as HTMLElement).scrollTop = 0
      triggerTop.value = false
    }
  }
}

const dataRowIdPrefix = 'data-row'

const topRow = computed<HTMLElement | null>(() => {
  return document.getElementById(`${dataRowIdPrefix}-${data.value[0].id}`)
})

const bottomRow = computed<HTMLElement | null>(() => {
  return document.getElementById(`${dataRowIdPrefix}-${data.value[data.value.length - 1].id}`)
})

onMounted(() => {
  fetch()
})


</script>

<template>
  <main class="h-full p-2">
    <div class="h-full flex flex-col">
      <!--      View Toolbar-->
      <div class="bg-white bg-opacity-5 text-white p-2 rounded-md w-full">
        <button class="text-white hover:bg-white hover:bg-opacity-5 px-2 py-1 rounded-md" @click="leftPanel = !leftPanel">
          <i :class="leftPanel ? DefaultIcons.arrow.left : DefaultIcons.arrow.right" />&nbsp;Left Panel
        </button>
      </div>
      <!--      View Content-->
      <div class="flex flex-row h-full mt-2 overflow-y-auto">
        <!--        Left Panel-->
        <div class="h-full bg-green-50 transition-width ease-in-out duration-300 bg-blue-100 bg-opacity-5 rounded-md space-y-1"
             :class="
             {
               'w-1/6 mr-2 p-2' : leftPanel,
               'w-0' : !leftPanel
             }" ></div>
        <!--        Right Panel-->
        <div class="grow flex flex-col h-full overflow-y-auto">
          <!--          Search Input-->
          <div class="w-full text-white mb-2">
            <InputField
                v-model.trim="search"
                class="w-full bg-white bg-opacity-5 text-white rounded-md"
                type="text"
                placeholder="Search"
                clearable
                input-class="text-white"
            >
              <template #prepend>
                <i class="mr-1 text-slate-300 opacity-75 hover:opacity-100 transition-all ease-in-out duration-300" :class="DefaultIcons.search" />
              </template>
              <template #append>
                <button class="rounded-full group focus:outline-none w-6 h-6" @click="filterPanel = !filterPanel">
                  <i :class="filterPanel ? DefaultIcons.caret.up : DefaultIcons.caret.down" class="text-slate-300 opacity-75 group-hover:opacity-100 transition-all ease-in-out duration-300 group-focus:text-slate-100 " />
                </button>
              </template>
            </InputField>
          </div>
          <!--          Filter Panel-->
          <div class="bg-white bg-opacity-5 text-white rounded-md transition-all ease-in-out duration-300" :class="{'h-24 mb-2': filterPanel, 'h-0': !filterPanel}"></div>
          <!--          Table View-->
          <div class="overflow-y-auto w-full h-full">
            <DataTable
                ref="dataTable"
                class="rounded-md border border-slate-700 w-full"
                :api="SampleApi"
                :resource-name="resourceName"
                :route-params="routeParams"
                :query-params="queryParams"
                @loaded="onDataLoaded"
                @failed="onFailed"
                @loading="onLoading"
                :timeout="0"
                :request-pagination="requestPagination"
                v-model:server-pagination = "serverPagination"
                @scroll="onScroll"
            >
              <template #header>
                <div ref="tableHeader" class="table-row opaque-bg text-yellow-500 bg-opacity-100 sticky top-0 z-10">
                  <div class="table-cell text-center p-2">#</div>
                  <div class="table-cell text-left p-2">First Name</div>
                  <div class="table-cell text-left p-2">Last Name</div>
                  <div class="table-cell text-left p-2">Posts</div>
                </div>
              </template>
              <template #data ref="tableRows">
                <div v-for="v in data" :key="v.id" :id="`${dataRowIdPrefix}-${v.id}`"
                     class="table-row text-slate-400 text-sm odd:bg-white odd:bg-opacity-5 hover:text-slate-100 transition-all ease-in-out duration-100 animate-flash"
                >
                  <div class="table-cell text-center p-2">{{ v.id }}</div>
                  <div class="table-cell p-2">{{ v.firstName }}</div>
                  <div class="table-cell p-2">{{ v.lastName }}</div>
                  <div class="table-cell p-2">{{ v.posts }}</div>
                </div>
              </template>
              <template #error>
                <div v-if="!isLoading && isFailed" class="w-full h-full text-white grid place-content-center">
                  <span class="text-alert-300 text-2xl">{{ t(`error.xhr.${error.Status}`) }}</span>
                  <button
                      v-if="error.Status === ApiResultCode.Timeout || error.Status === ApiResultCode.Cancelled"
                      class="border rounded-md px-12 py-1.5  mt-12 hover:bg-white hover:bg-opacity-10 text-base"
                      @click="fetch()">
                    {{ t(`retry`) }}
                  </button>
                </div>
              </template>
              <template #footer>
                <div class="h-10 flex flex-row justify-between items-center w-full px-2 py-1 text-white sticky bottom-0 px-4 opaque-bg border-t border-slate-700">
                  <ScrollingPagination
                      v-if = "isLoaded || isLoading"
                      v-model="serverPagination"
                      :is-loading="isLoading"
                      :is-loaded="isLoaded"
                      :is-failed="isFailed"
                      @get-more="onGetMore"
                  />
                  <button v-if="isLoading" @click="cancelRequest" class="text-yellow-400"><i class="las la-circle-notch animate-spin" /><span class="hidden md:inline-block ml-2">{{  t('abort') }}</span></button>
                </div>
              </template>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<i18n src="@/locales/error-messages.json" />
<i18n>
{
  "tr": {
    "abort" : "İptal et",
    "retry" : "Yeniden dene"
  },

  "en": {
    "abort" : "Abort",
    "retry" : "Retry"
  }
}
</i18n>
<style scoped>

</style>
