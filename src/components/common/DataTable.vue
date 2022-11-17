<script setup lang="ts">

import {onMounted, ref} from "vue";
import axios from "axios";
import { ApiResource } from "@/lib/api/ApiResource";

const props = defineProps(
    {
      resource: { type: ApiResource },
    })
const emit = defineEmits(['loaded', 'error'])

const result = ref(null)
const loaded = ref(false)
const loading = ref(false)
const error = ref(false)

const fetch = () => new Promise<object>((resolve, reject) => {
  loaded.value = false
  error.value = false
  loading.value = true
  props.resource.Execute().then(r => {
    loaded.value = true
    resolve(r)
  }).catch(e => {
    error.value = true
    reject(e)
  }).finally(() => {
    loading.value = false
  })

})

onMounted(() => {
  fetch().then(r => emit('loaded', r.data)).catch(e => emit('error', e))
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
