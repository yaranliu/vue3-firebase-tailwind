<script setup lang="ts">
import type {ApiResponse} from "@/lib/api/ApiResponse";
import type { Api } from "@/lib/api/Api";
import {onMounted, ref, useSlots} from "vue";
import type { PropType} from "vue";
import type {AbstractRegularRequestPagination, AbstractScrollingRequestPagination} from "@/lib/api/Pagination";
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
      }
    })

const emit = defineEmits(['mounted', 'loaded', 'failed', 'loading', 'update:serverPagination'])

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
    emit('loading', true)
    let config = api.GetConfig(props.resourceName, props.timeout, controller)

    if (config) {
      config = config
          .SetRouteParams(props.routeParams)
          .SetQueryParams(props.queryParams)
      if (props.requestPagination) config.SetPagination(props.requestPagination.ToServerDefinition())
      config.Execute(api.GetResource(props.resourceName), api.TransformResponse)?.then(r => {
        loaded.value = true
        loading.value = false
        emit('loading', false)
        emit('update:serverPagination', r.Pagination)
        resolve(r.Data)
      }).catch(
          e => {
            failed.value = true
            loading.value = false
            emit('loading', false)
            reject(e)
          }
      )
    }
  } else {
    console.log ('DataTable configuration error. Api or Resource is not defined')
  }
})

const fetchData = (controller: AbortController) => {
  fetch(controller).then(r => emit('loaded', r)).catch(e => { emit('failed', e) })
}

const fetchAsync = async (controller: AbortController) => {
  let api = props.api ?  props.api as Api : null
  if (api && props.resourceName) {
    loaded.value = false
    failed.value = false
    loading.value = true
    emit('loading', true)
    let config = api.GetConfig(props.resourceName, props.timeout, controller)

    if (config) {
      config = config
          .SetRouteParams(props.routeParams)
          .SetQueryParams(props.queryParams)
      if (props.requestPagination) config.SetPagination(props.requestPagination.ToServerDefinition())
      try {
        let r = await config.ExecuteAsync(api.GetResource(props.resourceName), api.TransformResponse)
        loaded.value = true
        loading.value = false
        emit('loading', false)
        emit('update:serverPagination', r?.Pagination)
        return r?.Data
      } catch (e) {
        failed.value = true
        loading.value = false
        emit('loading', false)
        return e
      }
    }
  } else {
    console.log ('DataTable configuration error. Api or Resource is not defined')
  }
}

const fetchDataAsync = async (controller: AbortController) => {
  try {
    let r = await fetchAsync(controller)
    emit('loaded', r)
  } catch (e) {
    emit('failed', e)
  }
}

onMounted(() => {
  emit('mounted')
})

defineExpose({ fetchData, fetchDataAsync, dataSlot, hasSlot })

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
    <!--             Error-->
    <slot class="grow" name="error"></slot>
    <!--            Table Footer-->
    <slot class="w-full" name="footer"></slot>
    <slot class="w-full" name="empty"></slot>
  </div>


</template>


<style scoped>

</style>
