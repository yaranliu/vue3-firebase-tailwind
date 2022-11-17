<script setup>

import {onMounted, ref} from "vue";
import axios from "axios";

const props = defineProps(['endPoint'])
const emit = defineEmits(['loaded', 'error'])

const result = ref(null)
const loaded = ref(false)
const loading = ref(false)
const error = ref(false)

const fetch = () => new Promise((resolve, reject) => {
  loaded.value = false
  error.value = false
  loading.value = true
  axios.get(props.endPoint).then(result => {
    loaded.value = true
    resolve(result)
  }).catch(error => {
    error.value = true
    reject(error)
  }).finally(() => {
    loading.value = false
  })
})

onMounted(() => {
  setTimeout(() => fetch().then(r => emit('loaded', r.data)).catch(e => emit('error', e)), 1000)
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
