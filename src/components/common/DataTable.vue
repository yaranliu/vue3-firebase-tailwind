<script setup lang="ts">

import { ref } from "vue";
import {ApiResponse} from "@/lib/api/ApiResponse";
import { Api } from "@/lib/api/Api";
import { Paged } from "@/lib/api/Paged";
import {Scrolling} from "@/lib/api/Scrolling";

const props = defineProps(
    {
      api: { required:true },
      resourceName: { type: String, required: true },
      routeParams: { type: Map<string, string> },
      queryParams: { type: Object },
      timeout: { type: Number, default: 0 },
      abortController: { type: AbortController },
      serverPagination: { type: Object },
      requestPagination : { default: undefined }
    })

const emit = defineEmits(['loaded', 'failed', 'loading', 'update:serverPagination'])

const loaded = ref(false)
const loading = ref(false)
const failed = ref(false)


const fetch = () => new Promise<ApiResponse>((resolve, reject) => {
  let api = props.api ?  props.api as Api : null
  if (api && props.resourceName) {
    loaded.value = false
    failed.value = false
    loading.value = true
    emit('loading', true)
    let config = api.GetConfig(props.resourceName, props.timeout, props.abortController?.signal)

    if (config) {
      config = config
          .SetRouteParams(props.routeParams)
          .SetQueryParams(props.queryParams)
          .SetPagination( props.requestPagination?.ToServerDefinition())
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
            console.log(e)
            emit('loading', false)
            reject(e)
          }
      )
    }
  } else {
    console.log ('DataTable configuration error. Api or Resource is not defined')
  }
})

const fetchData = () => {
  fetch().then(r => emit('loaded', r)).catch(e => { emit('failed', e) })
}

defineExpose({ fetchData })

</script>

<template>
  <div class="rounded-md overflow-y-auto border border-slate-700">
    <!--            Table-->
    <div class="table w-full">
      <!--              Table Header Row-->
      <div class="table-header-group">
        <slot name="header"></slot>
      </div>
      <!--              Table Data Rows-->
      <div class="table-row-group">
        <slot name="data"></slot>
      </div>
    </div>
    <!--            Table Footer-->
    <slot name="footer"></slot>
  </div>
</template>


<style scoped>

</style>
