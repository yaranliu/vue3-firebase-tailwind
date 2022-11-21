<script setup lang="ts">

import {onMounted, ref} from "vue";
import { ApiResource } from "@/lib/api/ApiResource";
import { ApiResponse } from "@/lib/api/ApiResponse";

const props = defineProps(
    {
      resource: { type: ApiResource },
    })
const emit = defineEmits(['loaded', 'error'])

const loaded = ref(false)
const loading = ref(false)
const error = ref(false)

const fetch = () => new Promise<ApiResponse>((resolve, reject) => {
  loaded.value = false
  error.value = false
  loading.value = true
  if (props.resource) {
    props.resource.Execute(undefined, {test: 'testing'}, undefined, { Page: 2, PerPage:20 }).then(r => {
      loaded.value = true
      loading.value = false
      resolve(r.Data)
    }).catch(e => {
      error.value = true
      loading.value = false
      reject(e)
    })
  }
})

onMounted(() => {
  fetch().then(r => emit('loaded', r)).catch(e =>
  {
    emit('error', e)
  })
})

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
