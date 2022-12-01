<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useInfiniteScroll } from "@vueuse/core";
import SampleCardAnimated from "@/components/sample/SampleCardAnimated.vue";
import SampleCard from "@/components/sample/SampleCard.vue";

const infinite = ref(null)

const data = ref<Array<number>>([])

const getMore = (() => {
  let l = data.value.length
  for (let i = 0; i < 5; i++) data.value.push(i + l)
})

useInfiniteScroll(infinite, () => { getMore() }, { distance: 10 })

onMounted(() => {
  for (let i = 0; i < 20; i++) data.value.push(i)
})

</script>

<template>
  <main class="h-full p-4">
    <div  ref="infinite" class="overflow-y-auto h-full bg-blue-100 bg-opacity-20 rounded-md border border-slate-500">
      <ul  class="grid grid-cols-4 gap-12 p-8">
        <li v-for="i in data">
          <SampleCard :content="`Sample Card #${i}`" />
        </li>
      </ul>
    </div>

  </main>
</template>
<style scoped>
</style>


