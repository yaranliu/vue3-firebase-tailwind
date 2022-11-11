<script setup>
import { ref} from "vue";
import CollapseContainer from "@/components/common/CollapseContainer.vue";

const collapsed = ref(false)

</script>

<template>
  <main class="h-full py-4 pr-1">
    <div class="h-full">
      <div class="flex flex-row space-x-4 h-full">
        <CollapseContainer
            v-model="collapsed"
            class="text-white transition-width ease-in-out duration-500"
            :class="{ 'w-6' : collapsed, 'w-1/6' : !collapsed }"
        >
          <div
              class="w-full h-full overflow-y-auto transition-all ease-in-out duration-500 p-2"
              :class="{ 'bg-blue-100 bg-opacity-10 rounded-md' : !collapsed }"
          >
            <input class="w-full bg-white bg-opacity-5 text-white px-1 py-2 rounded focus:outline-none focus:bg-opacity-10" >
          </div>
        </CollapseContainer>
        <div class="grow bg-blue-100 bg-opacity-20 shadow-2xl rounded-md border border-slate-500 h-full overflow-y-auto">
          <div class="w-full bg-blue-100 sticky top-0">a</div>
          <div class="">
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>
            <div class="w-full bg-red-100">b</div>

          </div>
        </div>
        </div>
        <div></div>
      </div>
<!--    </div>-->
  </main>
</template>


<style scoped>

</style>
