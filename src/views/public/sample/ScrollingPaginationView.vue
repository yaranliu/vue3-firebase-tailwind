<script setup lang="ts">

// Imports
import concat from "lodash/concat"
import reverse from "lodash/reverse"
import {ref, onMounted, computed, nextTick, useSlots} from "vue";
import { useI18n } from "vue-i18n";
import InputField from "@/components/common/InputField.vue";
import {DefaultIcons} from "@/configuration/AppConfiguration";
import { SampleApi, ScrollingRequestPagination} from "@/api/SampleApi";
import {Scrolling} from "@/lib/api/Scrolling";
import {ApiResponse} from "@/lib/api/ApiResponse";
import { ApiResultCode } from "@/lib/api/ApiResultCode";
import DataTable from "@/components/common/DataTable.vue";
import type { Person } from "@/models/PersonModel"
import { useInfiniteScroll } from "@vueuse/core";
import { FirstItemIdentifier, LastItemIdentifier} from "@/lib/misc";
import ScrollingPagination from "@/components/common/ScrollingPagination.vue";

// Locale
const { t } = useI18n()

// Constants
const dataRowIdPrefix = 'data-row'
const initialRowCount = 10
const fetchRowCount = 10
const scrollTimeOut = 500


// Views
const filterPanel = ref(true)
const leftPanel = ref(true)
const dataTable = ref<InstanceType<typeof DataTable> | null>(null)
const moreAvailableBefore = ref(true)
const moreAvailableAfter = ref(true)

// Request params
const lastId = '0050'

// Api
const resourceName = ref('infinite')
const data = ref<Array<Person>>([])
const error = ref(new ApiResponse())
const requestPagination = ref<ScrollingRequestPagination>(new ScrollingRequestPagination(initialRowCount, lastId, true))
const serverPagination = ref(new Scrolling('id', true))
const abortController = ref<AbortController>(new AbortController())
const queryParams = ref({})
const isLoaded = ref(false)
const isFailed = ref(false)
const isLoading = ref(false)
const initial = ref(true)
const search = ref('')

// Api Methods
const getMoreOrAbort = (args: any) => {
  if (isLoading.value) {
    cancelRequest()
    if (args.after) { scrollToBottom() }
    else { scrollToTop() }
  }
  else onGetMore(args)
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

// Api Events
const onDataLoaded = async (d: Array<Person>) => {
  if (initial.value) {
    data.value = d
    initial.value = false
    moreAvailableAfter.value = d.length >= initialRowCount
    await nextTick(() => { scrollToBottom() })
  }
  else {
    if (serverPagination.value.After) {
      data.value = concat(data.value, d)
      moreAvailableAfter.value = d.length >= fetchRowCount
      await nextTick(() => { scrollToBottom() })
    }
    else {
      data.value = concat(reverse(d), data.value)
      moreAvailableBefore.value = d.length >= fetchRowCount
      await nextTick(() => { scrollToTop() })
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

const onGetMore = (args: any) => {
  if (!isLoading.value) {
    if (args.force || (args.after && moreAvailableAfter.value) || (!args.after && moreAvailableBefore.value)) {
      let lastId = lastItemIdentifier.value === undefined ? '' : lastItemIdentifier.value.toString()
      let firstId = firstItemIdentifier.value === undefined ? '' : firstItemIdentifier.value.toString()
      requestPagination.value = new ScrollingRequestPagination(fetchRowCount, args.after ? lastId : firstId, args.after)
      setTimeout(() => { fetch() }, 50)
    }
  } else {
    if (args.after) scrollAreaBottom.value?.scrollIntoView( { behavior: 'smooth', block:'end', inline:'start' })
    else scrollAreaTop.value?.scrollIntoView( { behavior: 'smooth', block:'end', inline:'start' })

  }
}

// Scrolling
const firstItemIdentifier = computed(() => { return FirstItemIdentifier<Person>(data.value, serverPagination.value.IdentifierField)})
const lastItemIdentifier = computed(() => { return LastItemIdentifier<Person>(data.value, serverPagination.value.IdentifierField)})

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

useInfiniteScroll(dataTable.value?.$el, () => { onGetMore({ after: true, auto: false } ) }, { distance: 10, direction:  "bottom" })
useInfiniteScroll(dataTable.value?.$el, () => { onGetMore({ after: false, auto: false }) }, { distance: 10, direction:  "top" })

// Hooks
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
                @loaded="onDataLoaded"
                @failed="onFailed"
                @loading="onLoading"
                :timeout="0"
                :request-pagination="requestPagination"
                v-model:server-pagination = "serverPagination"
            >
<!--              Table Header-->
              <template #header>
                <tr v-if="data?.length > 0 && !isFailed" class="opaque-bg text-yellow-500 bg-opacity-100 sticky top-0 z-10 h-14">
                  <th class="text-center p-2 font-normal">#</th>
                  <th class="text-left p-2 font-normal">First Name</th>
                  <th class="text-left p-2 font-normal">Last Name</th>
                  <th class="text-left p-2 font-normal">Posts</th>
                </tr>
              </template>
<!--              Table Rows-->
              <template #data>
<!--                Top Loading Indicator-->
                <tr v-if="!isFailed && data?.length > 0" ref="scrollAreaTop" id="scrollAreaTop" class="h-14 odd:bg-white odd:bg-opacity-5 ">
                  <td colspan="4" class="text-center">
                    <div class="flex items-center justify-center">
                      <div class="text-center p-2 transition-all ease-out duration-300">
                        <div class="h-8 w-80 flex justify-between pr-1 pl-3 items-center rounded-full space-x-2 bg-white bg-opacity-10 text-slate-300 text-sm">
                          <div class="inline-block text-xs">
                            <span v-if="isLoading" class="animate-pulse">{{ t('loading')}}</span>
                            <div v-if="!isLoading" class="inline" >
                              <span v-if="!moreAvailableBefore">{{ t('noMore')}}</span>
                              <span v-else>{{ t('getMoreTop')}}</span>
                            </div>
                          </div>
                          <div @click="getMoreOrAbort({ after: false, force: true })" class="hover:cursor-pointer group flex flex-row items-center">
                            <div class="text-xs group-hover:text-yellow-300" v-if="!moreAvailableBefore">{{ t('fetchAnyway')}}</div>
                            <div class="inline-block ml-2 rounded-full bg-white bg-opacity-10 group-hover:text-yellow-300 group-hover:bg-white group-hover:bg-opacity-10" >
                              <i class="las la-sync object-center rounded-full p-1" :class="{'animate-spin' : isLoading}"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
<!--                Data Rows-->
                <tr v-for="v in data" :key="v.id" :id="`${dataRowIdPrefix}-${v.id}`"
                    class="h-24 table-row text-slate-400 text-sm odd:bg-white odd:bg-opacity-5 hover:text-slate-100 transition-all ease-in-out duration-100 animate-flash"
                >
                  <td class="table-cell text-center p-2">{{ v.id }}</td>
                  <td class="table-cell p-2">{{ v.firstName }}</td>
                  <td class="table-cell p-2">{{ v.lastName }}</td>
                  <td class="table-cell p-2">{{ v.posts }}</td>
                </tr>
<!--                Bottom Loading Indicator-->
                <tr v-if="!isFailed && data?.length > 0" ref="scrollAreaBottom" id="scrollAreaBottom" class="h-14 odd:bg-white odd:bg-opacity-5 ">
                  <td colspan="4" class="text-center">
                    <div class="flex items-center justify-center">
                      <div class="text-center p-2 transition-all ease-out duration-300">
                        <div class="h-8 w-80 flex justify-between pr-1 pl-3 items-center rounded-full space-x-2 bg-white bg-opacity-10 text-slate-300 text-sm">
                          <div class="inline-block text-xs">
                            <span v-if="isLoading" class="animate-pulse">{{ t('loading')}}</span>
                            <div v-if="!isLoading" class="inline" >
                              <span v-if="!moreAvailableAfter">{{ t('noMore')}}</span>
                              <span v-else>{{ t('getMoreTop')}}</span>
                            </div>
                          </div>
                          <div @click="getMoreOrAbort({ after: true, force: true })" class="hover:cursor-pointer group flex flex-row items-center">
                            <div class="text-xs group-hover:text-yellow-300" v-if="!moreAvailableAfter">{{ t('fetchAnyway')}}</div>
                            <div class="inline-block ml-2 rounded-full bg-white bg-opacity-10 group-hover:text-yellow-300 group-hover:bg-white group-hover:bg-opacity-10" >
                              <i class="las la-sync object-center rounded-full p-1" :class="{'animate-spin' : isLoading}"></i>
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
<!--              No Data Panel-->
              <template #empty>
                <div v-if="data?.length === 0 && !isFailed" class="w-full h-full text-white grid place-content-center">
                  <div v-if="isLoading" class="text-3xl"><span class="mr-4"><i class="las la-circle-notch animate-spin"></i></span> Loading</div>
                  <div v-else>No Data</div>
                </div>
              </template>
            </DataTable>
          </div>

          <div class="bg-white bg-opacity-5 text-white rounded-md p-4 mt-2">Yet another pane here</div>
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
    "getMoreTop": "Daha fazlası için aşağı çekin"
  },

  "en": {
    "abort" : "Abort",
    "retry" : "Retry",
    "loading": "Loading",
    "fetchAnyway": "Fetch anyway",
    "noMore": "No more rows",
    "getMoreTop": "Swipe to get more"
  }
}
</i18n>
<style scoped>
.auto-hide-footer {
  transform: translateY(30px);
}
</style>
