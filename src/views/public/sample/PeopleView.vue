<script setup>
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n()

import InputField from "@/components/common/InputField.vue";
import {DefaultIcons} from "@/configuration/AppConfiguration";
import DataTable from "@/components/common/DataTable.vue";
import {RegularRequestPagination, SampleApi, ScrollingRequestPagination} from "@/api/SampleApi";
import {Paged} from "@/lib/api/Paged";
import {Scrolling} from "@/lib/api/Scrolling";
import RegularPagination from "@/components/common/RegularPagination.vue";
import {ApiResponse} from "@/lib/api/ApiResponse";
import { ApiResultCode } from "@/lib/api/ApiResultCode";

const search = ref('')

const filterPanel = ref(false)
const leftPanel = ref(false)


const dataTable = ref(null)
const error= ref(new ApiResponse())

// data
const data = ref([])
const resourceName = ref('paged')
const requestPagination = ref(new RegularRequestPagination(1, 10))
// const requestPagination = ref(new ScrollingRequestPagination (50, '0029', true))
const serverPagination = ref( new Paged(1, 1, 1, 1))
// const serverPagination = ref(new Scrolling())

const abortController = ref(null)
const routeParams = ref(new Map([['id', '001'], ['item', '002340432']]))
const queryParams = ref({color: 'red', size: ['medium', 'small'] })

const isLoaded = ref(false)
const isFailed = ref(false)
const isLoading = ref(false)

const onDataLoaded = (d) => {
  data.value = d
  isLoaded.value = true
}

const onFailed = (e) => {
  error.value = e
  isFailed.value = true
}

const onLoading  = (l) => {
  isLoading.value = l
}

const fetch = () => {
  isLoaded.value = false
  isFailed.value = false
  abortController.value = new AbortController()
  dataTable.value.fetchData(abortController.value)
}

const showPage = (page) => {
  if (page !== requestPagination.value.Page) {
    requestPagination.value.Page = page
    fetch()
  }
}

const updatePerPage = (perPage) => {
  requestPagination.value.Page = 1
  requestPagination.value.PerPage = perPage
  fetch()
}

const perPageOptions = ref([10, 50, 100])


const cancelRequest = () => {
  abortController.value.abort()
}

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
        <div class="grow flex flex-col h-full">
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
          <DataTable
              ref="dataTable"
              class="rounded-md overflow-y-auto border border-slate-700 h-full"
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
          >
            <template #header>
              <div class="table-row opaque-bg text-yellow-500 sticky top-0 bg-opacity-100 z-10">
                <div class="table-cell text-center p-2">#</div>
                <div class="table-cell text-left p-2">First Name</div>
                <div class="table-cell text-left p-2">Last Name</div>
                <div class="table-cell text-left p-2">Posts</div>
              </div>
            </template>
            <template #data>
              <div v-if="isLoading" v-for="index in 100" class="table-row text-slate-400 text-sm animate-pulse" :key="`fake-row-${index}`">
                  <div class="table-cell p-2"><div class="h-2 bg-slate-700 rounded"></div></div>
                  <div class="table-cell p-2"><div class="h-2 bg-slate-700 rounded"></div></div>
                  <div class="table-cell p-2"><div class="h-2 bg-slate-700 rounded"></div></div>
                  <div class="table-cell p-2"><div class="h-2 bg-slate-700 rounded"></div></div>
              </div>
              <div v-if="!isLoading && isLoaded" v-for="(v, i) in data" class="table-row text-slate-400 text-sm odd:bg-white odd:bg-opacity-5 hover:text-slate-100 transition-all ease-in-out duration-100">
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
                <RegularPagination
                    v-if = "isLoaded || isLoading"
                    v-model="serverPagination"
                    :is-loading="isLoading"
                    :is-loaded="isLoaded"
                    :is-failed="isFailed"
                    :per-page-options="perPageOptions"
                    @to="showPage"
                    @per-page="updatePerPage"
                />
                <button v-if="isLoading" @click="cancelRequest" class="text-yellow-400"><i class="las la-circle-notch animate-spin" /><span class="hidden md:inline-block ml-2">{{  t('abort') }}</span></button>
              </div>
            </template>
          </DataTable>
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
.opaque-bg {
  background-color: #22243FFF;
  opacity: 100%;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.05s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
