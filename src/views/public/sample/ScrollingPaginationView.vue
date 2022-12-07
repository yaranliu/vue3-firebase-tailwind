<script setup lang="ts">

// Imports
import concat from "lodash/concat"
import reverse from "lodash/reverse"
import take from "lodash/take"
import takeRight from "lodash/takeRight"
import {computed, defineAsyncComponent, nextTick, ref, onMounted, watch, reactive} from "vue";
import {useI18n} from "vue-i18n";
import InputField from "@/components/common/InputField.vue";
import {DefaultIcons} from "@/configuration/AppConfiguration";
import {SampleApi, ScrollingRequestPagination} from "@/api/SampleApi";
import {Scrolling} from "@/lib/api/Scrolling";
import {ApiResponse} from "@/lib/api/ApiResponse";
import type {Person} from "@/models/PersonModel"
import {useInfiniteScroll} from "@vueuse/core";
import {debounce, FirstItemIdentifier, LastItemIdentifier} from "@/lib/misc";
import {ApiCallStatus} from "@/lib/api/ApiCallStatus";
import {SampleQueryParameters} from "@/api/SampleQueryParameters";

const DataTable = defineAsyncComponent(() => import( "@/components/common/DataTable.vue"))

// Locale
const { t } = useI18n()

// Constants
const dataRowIdPrefix = 'data-row'
const maxRows = 40
const fetchRowCount = 10
const scrollTimeOut = 500

// Views
const filterPanel = ref(true)
const leftPanel = ref(true)
const dataTable = ref<InstanceType<typeof DataTable> | null>(null)
const moreAvailableBefore = ref(true)
const moreAvailableAfter = ref(true)

// Request params
const lastId = ref('')

// Api
const resourceName = ref('infinite')
const data = ref<Array<Person>>([])
const error = ref(new ApiResponse())
const requestPagination = ref<ScrollingRequestPagination>(new ScrollingRequestPagination(fetchRowCount, lastId.value, true))
const serverPagination = ref(new Scrolling('id', true))
const abortController = ref<AbortController>(new AbortController())
const queryParams = reactive<SampleQueryParameters>(new SampleQueryParameters())
const searchScheduled = ref(false)

const initial = ref(true)
const showCancelButton = ref(false)
const isCanceled = ref(false)

const apiCallStatus = ref<ApiCallStatus | undefined >(undefined)
const apiResponse = ref<ApiResponse | undefined>(undefined)


const loading = computed(() => { return apiCallStatus.value === ApiCallStatus.Loading })
const loaded = computed(() => { return apiCallStatus.value === ApiCallStatus.DataLoaded })
const failed = computed(() => { return apiResponse.value?.Failed() })
const canceled = computed(() => { return apiResponse?.value?.TimedOut() })
const timedOut = computed(() => { return apiResponse?.value?.Canceled() })

// Scrolling
const firstItemIdentifier = ref('')
const lastItemIdentifier = ref('0020')

const setFirstAndLastItem = () => {
  firstItemIdentifier.value = FirstItemIdentifier<Person>(data.value, serverPagination.value.IdentifierField)
  lastItemIdentifier.value = LastItemIdentifier<Person>(data.value, serverPagination.value.IdentifierField)
}

const scrollAreaTop = ref<HTMLElement | null>(null)
const scrollAreaBottom = ref<HTMLElement | null>(null)

const lastItem = computed(() => {
  return document.getElementById( `${dataRowIdPrefix}-${lastItemIdentifier.value}`)
})

const scrollToBottom = () => {
  setTimeout(() => {
    if (dataTable.value?.hasSlot('footer')) {
      scrollAreaBottom.value?.scrollIntoView( { behavior: 'smooth', block:'end', inline:'start' })
    } else {
      lastItem.value?.scrollIntoView( { behavior: 'smooth', block:'end', inline:'start' })
    }
  }, scrollTimeOut)
}

const scrollToTop = () => {
  setTimeout(() => {
    scrollAreaTop.value?.scrollIntoView( { behavior: 'smooth', block:'start', inline:'start' })
  }, scrollTimeOut)
}

// @ts-ignore
useInfiniteScroll(dataTable, async () => { if (data.value?.length > 0) await getMoreOrAbortAsync({ after: true, force: false } ) }, { distance: 10, direction:  "bottom" })
// @ts-ignore
useInfiniteScroll(dataTable, async () => { if (data.value?.length > 0) await getMoreOrAbortAsync({ after: false, force: false }) }, { distance: 10, direction:  "top" })


// Api Methods & Events
const cancelRequest = () => {
  isCanceled.value = true
  showCancelButton.value = false
  abortController.value.abort()
}

const onDataLoadedAsync = async (d: Array<Person>) => {
  console.log('data loaded')
  if (d) {
    if (initial.value) {
      data.value = d
      initial.value = false
      moreAvailableAfter.value = d.length >= fetchRowCount
      setFirstAndLastItem()
      await nextTick(() => { scrollToBottom() })
    }
    else {
      if (serverPagination.value) {
        if (serverPagination.value?.After) {
          moreAvailableAfter.value = d.length >= fetchRowCount
          data.value = takeRight(concat(data.value, d), maxRows)
          setFirstAndLastItem()
          moreAvailableBefore.value = true
          await nextTick(() => { scrollToBottom() })
        }
        else {
          moreAvailableBefore.value = d.length >= fetchRowCount
          data.value = take(concat(reverse(d), data.value), maxRows)
          setFirstAndLastItem()
          moreAvailableAfter.value = true
          await nextTick(() => { scrollToTop() })
        }
      }
    }
  }
  isCanceled.value = false
  showCancelButton.value = false
}

let cancelButtonTimeout: any

const getMoreOrAbortAsync = async (args: any) => {
  if (loading.value) cancelRequest()
  if ((!loading.value || args.ignoreLoading) && (args.force || (args.after && moreAvailableAfter.value) || (!args.after && moreAvailableBefore.value)))  {
    requestPagination.value = new ScrollingRequestPagination(fetchRowCount, args.after ? lastItemIdentifier.value : firstItemIdentifier.value, args.after)
    abortController.value = new AbortController()
    showCancelButton.value = false
    clearTimeout(cancelButtonTimeout)
    cancelButtonTimeout = setTimeout(() => showCancelButton.value = true, 2000)
    searchScheduled.value = false
    await nextTick(async () => { await dataTable.value?.fetchAsync(abortController.value) })
  }
  else {
    if (args.after) scrollToBottom()
    else scrollToTop()
  }
}

watch( () => queryParams.search, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    onSearch()
  }
})

const onSearch = debounce(async () => {
  data.value = []
  moreAvailableBefore.value = true
  moreAvailableAfter.value = true
  firstItemIdentifier.value = ''
  lastItemIdentifier.value = ''
  isCanceled.value = false
  searchScheduled.value = true
  await getMoreOrAbortAsync({ after: true, force: true, noLastItem: true, ignoreLoading: true })
}, 500)

onMounted(() => {
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
                v-model.trim="queryParams.search"
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
          <div class="bg-white bg-opacity-5 text-white rounded-md transition-all ease-in-out duration-300 p-4" :class="{'h-24 mb-2': filterPanel, 'h-0': !filterPanel}">
          </div>
          <!--         Infinite Scrolling View-->
          <div class="overflow-y-auto w-full h-full">
            <DataTable
                ref="dataTable"
                show-as-table
                class="rounded-md border border-slate-700 w-full"
                :api="SampleApi"
                :resource-name="resourceName"
                :query-params="queryParams"
                :timeout="0"
                :request-pagination="requestPagination"
                v-model:server-pagination = "serverPagination"
                v-model:status="apiCallStatus"
                v-model:response="apiResponse"
                @loaded="onDataLoadedAsync"
                @mounted="getMoreOrAbortAsync({ after: true, force: true })"
            >

              <template #loading>
                <div v-if="data?.length === 0 && loading" class="w-full h-full text-slate-400 text-xl grid place-content-center text-center">
                  <div>
                    <span class="mr-4">
                      <i class="las la-circle-notch animate-spin"></i>
                    </span>
                    {{ t('loading')}}
                  </div>
                  <div class="text-center mt-4 text-sm text-slate-200" :class="{ 'opacity-100' : showCancelButton, 'opacity-0' : !showCancelButton }">
                    {{ t('takingTooLong')}}
                  </div>
                  <div class="text-center mt-4 text-sm" :class="{ 'opacity-100' : showCancelButton, 'opacity-0' : !showCancelButton }">
                    <button class="bg-white bg-opacity-5 text-yellow-400 rounded-md px-6 py-2 hover:bg-opacity-10" @click="cancelRequest">{{ t('abort')}}</button>
                  </div>
                </div>
              </template>
              <!--              Table Header-->
              <template #header>
                <tr v-if="data?.length > 0 && !failed" class="opaque-bg text-yellow-500 bg-opacity-100 sticky top-0 z-10 h-14">
                  <th class="text-center p-2 font-normal">#</th>
                  <th class="text-left p-2 font-normal">First Name</th>
                  <th class="text-left p-2 font-normal">Last Name</th>
                  <th class="text-left p-2 font-normal">Posts</th>
                </tr>
              </template>
              <!--              Table Rows-->
              <template #data>
                <!--                Top Loading Indicator-->
                <tr v-if="data?.length > 0 && !failed" ref="scrollAreaTop" id="scrollAreaTop" class="h-14 odd:bg-white odd:bg-opacity-5 ">
                  <td colspan="4" class="text-center">
                    <div class="flex items-center justify-center">
                      <div class="text-center p-2 transition-all ease-out duration-300">
                        <div class="h-8 w-80 flex justify-between pr-1 pl-3 items-center rounded-full space-x-2 bg-white bg-opacity-10 text-slate-300 text-sm">
                          <div class="inline-block text-xs">
                            <span v-if="loading" class="animate-pulse">{{ t('loading')}}</span>
                            <div v-if="!loading" class="inline" >
                              <span v-if="!moreAvailableBefore">{{ t('noMore')}}</span>
                              <span v-else>{{ t('getMoreTop')}}</span>
                            </div>
                          </div>
                          <div @click="getMoreOrAbortAsync({ after: false, force: true })" class="hover:cursor-pointer group flex flex-row items-center">
                            <div class="text-xs group-hover:text-yellow-300" v-if="!moreAvailableBefore">{{ t('fetchAnyway')}}</div>
                            <div class="inline-block ml-2 rounded-full bg-white bg-opacity-10 group-hover:text-yellow-300 group-hover:bg-white group-hover:bg-opacity-10" >
                              <i class="las la-sync object-center rounded-full p-1" :class="{'animate-spin' : loading}"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <!--                Data Rows-->
                <tr v-if="data?.length > 0 && !failed" v-for="v in data" :key="v.id" :id="`${dataRowIdPrefix}-${v.id}`"
                    class="h-24 table-row text-slate-400 text-sm odd:bg-white odd:bg-opacity-5 hover:text-slate-100 transition-all ease-in-out duration-100 animate-flash"
                >
                  <td class="table-cell text-center p-2">{{ v.id }}</td>
                  <td class="table-cell p-2">{{ v.firstName }}</td>
                  <td class="table-cell p-2">{{ v.lastName }}</td>
                  <td class="table-cell p-2">{{ v.posts }}</td>
                </tr>
                <!--                Bottom Loading Indicator-->
                <tr v-if="data?.length > 0 && !failed" ref="scrollAreaBottom" id="scrollAreaBottom" class="h-14 odd:bg-white odd:bg-opacity-5 ">
                  <td colspan="4" class="text-center">
                    <div class="flex items-center justify-center">
                      <div class="text-center p-2 transition-all ease-out duration-300">
                        <div class="h-8 w-80 flex justify-between pr-1 pl-3 items-center rounded-full space-x-2 bg-white bg-opacity-10 text-slate-300 text-sm">
                          <div class="inline-block text-xs">
                            <span v-if="loading" class="animate-pulse">{{ t('loading')}}</span>
                            <div v-if="!loading" class="inline" >
                              <span v-if="!moreAvailableAfter">{{ t('noMore')}}</span>
                              <span v-else>{{ t('getMoreTop')}}</span>
                            </div>
                          </div>
                          <div @click="getMoreOrAbortAsync({ after: true, force: true })" class="hover:cursor-pointer group flex flex-row items-center">
                            <div class="text-xs group-hover:text-yellow-300" v-if="!moreAvailableAfter">{{ t('fetchAnyway')}}</div>
                            <div class="inline-block ml-2 rounded-full bg-white bg-opacity-10 group-hover:text-yellow-300 group-hover:bg-white group-hover:bg-opacity-10" >
                              <i class="las la-sync object-center rounded-full p-1" :class="{'animate-spin' : loading}"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </template>
              <!--              Error Panel-->
              <template #error>
                <div v-if="!loading && failed && data?.length === 0" class="w-full h-full text-white grid place-content-center">
                  <span class="text-alert-300 text-2xl"> {{ t(`error.xhr.${apiResponse?.Status}`) }}</span>
                  <button
                      v-if="timedOut || canceled"
                      class="border rounded-md px-12 py-1.5  mt-12 hover:bg-white hover:bg-opacity-10 text-base"
                      @click="getMoreOrAbortAsync({ after: true, force: true })">
                    {{ t(`retry`) }}
                  </button>
                </div>
              </template>
              <!--              No Data Panel-->
              <template #empty>
                <div v-if="data?.length === 0 && !failed && !loading && !canceled && !timedOut" class="w-full h-full text-white grid place-content-center text-center">
                  <div class="text-sm text-slate-200 rounded-md px-12 py-4">
                    <img alt="no-data" src="@/assets/no-data.svg" width="300" height="300" class="mb-8" />
                    {{ t ('noData') }}
                  </div>
                </div>
              </template>
            </DataTable>
          </div>

          <div class="bg-white bg-opacity-5 text-white rounded-md p-4 mt-2">
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
    "retry" : "Yeniden dene",
    "loading": "Yükleniyor...",
    "fetchAnyway": "Kontrol et",
    "noMore": "Başka kayıt yok",
    "getMoreTop": "Daha fazlası için aşağı çekin",
    "noData": "Kayıt bulunamadı",
    "takingTooLong": "İşlem çok uzun sürüyor, iptal etmek ister misiniz?"
  },

  "en": {
    "abort" : "Abort",
    "retry" : "Retry",
    "loading": "Loading",
    "fetchAnyway": "Fetch anyway",
    "noMore": "No more rows",
    "getMoreTop": "Swipe to get more",
    "noData": "No matching records found",
    "takingTooLong": "Taking too long, want to abort request?"
  }
}
</i18n>
<style scoped>
.auto-hide-footer {
  transform: translateY(30px);
}
</style>
