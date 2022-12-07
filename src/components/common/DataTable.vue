<script setup lang="ts">
import type {ApiResponse} from "@/lib/api/ApiResponse";
import type {Api} from "@/lib/api/Api";
import type {PropType} from "vue";
import {onMounted, ref, useSlots} from "vue";
import type {AbstractRegularRequestPagination, AbstractScrollingRequestPagination} from "@/lib/api/Pagination";
import {ApiResultCode} from "@/lib/api/ApiResultCode";
import {ApiCallStatus} from "@/lib/api/ApiCallStatus";

const slots = useSlots()
const hasSlot = (name:string) => {
  return !!slots[name];
}
const props = defineProps(
    {
      api: { required:true },
      resourceName: { type: String, required: true },
      routeParams: { type: Map<string, string> },
      queryParams: { type: Object },
      timeout: { type: Number, default: 0 },
      serverPagination: { type: Object },
      requestPagination : {
        type: Object as  PropType<AbstractRegularRequestPagination> | PropType<AbstractScrollingRequestPagination>,
        default: undefined
      },
      status: { type: String as PropType<ApiCallStatus>, default: undefined },
      response: { type: Object as PropType<ApiResponse>, default: undefined }
    })

const emit = defineEmits(['mounted', 'loaded', 'update:serverPagination', 'update:status', 'update:response'])

const loaded = ref(false)
const loading = ref(false)
const failed = ref(false)

const dataSlot = ref(null)


const fetch = (controller: AbortController) => new Promise<ApiResponse>((resolve, reject) => {
  let api = props.api ?  props.api as Api : null
  if (api && props.resourceName) {
    loaded.value = false
    failed.value = false
    loading.value = true
    let config = api.GetConfig(props.resourceName, props.timeout, controller)

    if (config) {
      config = config
          .SetRouteParams(props.routeParams)
          .SetQueryParams(props.queryParams)
      if (props.requestPagination) config.SetPagination(props.requestPagination.ToServerDefinition())
      config.Execute(api.GetResource(props.resourceName), api.TransformResponse)?.then(r => {
        loaded.value = true
        loading.value = false
        emit('update:serverPagination', r.Pagination)
        resolve(r.Data)
      }).catch(
          e => {
            failed.value = true
            loading.value = false
            reject(e)
          }
      )
    }
  } else {
    console.log ('DataTable configuration error. Api or Resource is not defined')
  }
})

const fetchData = (controller: AbortController) => {
  fetch(controller).then(r => emit('loaded', r)).catch(e => { })
}

const fetchAsync = async (controller: AbortController) => {
  let api = props.api ?  props.api as Api : null
  if (api && props.resourceName) {
    loaded.value = false
    failed.value = false
    loading.value = true
    emit('update:status', ApiCallStatus.Loading)
    let config = api.GetConfig(props.resourceName, props.timeout, controller)
    if (config) {
      config = config
          .SetRouteParams(props.routeParams)
          .SetQueryParams(props.queryParams)
      if (props.requestPagination) {
        let pagination = props.requestPagination.ToServerDefinition()
        config.SetPagination(pagination)
      }
      try {
        let r = await config.ExecuteAsync(api.GetResource(props.resourceName), api.TransformResponse)
        if (r) {
          loaded.value = true
          loading.value = false
          emit('update:serverPagination', r.Pagination)
          //
          emit('update:response', r)
          if (r.Succeeded()) {
            emit('update:status', ApiCallStatus.DataLoaded)
          } else if (r.Canceled()) {
            emit('update:status', ApiCallStatus.Canceled)
          } else if (r.Failed()) {
            emit('update:status', ApiCallStatus.Failed)
          } else if (r.TimedOut()) {
            emit('update:status', ApiCallStatus.TimedOut)
          }
          //
          if (r.Status === ApiResultCode.Success) {
            emit('loaded', r.Data)
          }
          else {
          }
        }

      } catch (e) {
        console.log('Error:', e)
        failed.value = true
        loading.value = false
        return e
      }
    }
  } else {
    console.log ('DataTable configuration error. Api or Resource is not defined')
  }
}

onMounted(() => {
  emit('mounted')
})

defineExpose({ fetchData, fetchAsync, dataSlot, hasSlot })

</script>

<template>
  <div class="h-full overflow-y-auto w-full rounded-md border border-slate-700 flex flex-col justify-between">
    <!--            Table-->
    <table class="table">
      <!--              Table Header Row-->
      <slot class="table-header-group" name="header"></slot>
      <!--              Table Data Rows-->
      <slot ref="dataSlot" class="relative table-row-group h-full overflow-y-scroll" name="data"></slot>
    </table>
      <!--              Loading-->
    <slot class="grow" name="loading"></slot>
    <!--             Error-->
    <slot class="grow" name="error"></slot>
    <!--            Table Footer-->
    <slot class="w-full" name="footer"></slot>
    <slot class="w-full" name="empty"></slot>
  </div>


</template>


<style scoped>

</style>
