<script setup>
import { ref} from "vue";
import InputField from "@/components/common/InputField.vue";
import {DefaultIcons} from "@/configuration/AppConfiguration";
import DataTable from "@/components/common/DataTable.vue";
import {DogsApi} from "@/api/DogsApi";

const search = ref('')

const filterPanel = ref(false)
const leftPanel = ref(false)

const data = ref([])

// const breeds = ref(DogsApi.GetResource('getAllBreeds'))
const breeds = ref(DogsApi.Resources.get('getAllBreeds'))

const isLoaded = ref(false)

const onDataLoaded = (d) => {
  for (const [key, value] of Object.entries(d)) {
    let breed = key
    let subBreeds = value.join(' ')
    let image = ''
    data.value.push({ breed: breed, subBreeds: subBreeds, image: image })
  }
  isLoaded.value = true
}

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
              class="rounded-md overflow-y-auto border border-slate-700"
              :resource = "breeds"
              @loaded="onDataLoaded"
          >
            <template #header>
              <div class="table-row bg-violet-900 text-white sticky top-0">
                <div class="table-cell text-center p-2">#</div>
                <div class="table-cell text-left p-2">Breed</div>
                <div class="table-cell text-left p-2">Sub breeds</div>
              </div>
            </template>
            <template #data>
              <div v-if="isLoaded" v-for="(v, i) in data" class="table-row text-slate-400 text-sm odd:bg-white odd:bg-opacity-5 hover:text-slate-100 transition-all ease-in-out duration-100">
                <div class="table-cell text-center p-2">{{ i }}</div>
                <div class="table-cell p-2">{{ v.breed }}</div>
                <div class="table-cell p-2">{{ v.subBreeds }}</div>
              </div>
              <div v-else v-for="index in 100" class="table-row animate-pulse text-slate-400 text-sm">
                <div class="table-cell p-2"><div class="h-2 bg-slate-700 rounded"></div></div>
                <div class="table-cell p-2"><div class="h-2 bg-slate-700 rounded"></div></div>
                <div class="table-cell p-2"><div class="h-2 bg-slate-700 rounded"></div></div>
              </div>
            </template>
            <template #footer>
              <div class="w-full p-2 bg-violet-900 text-white sticky bottom-0">
                <div class="text-left ">Footer</div>
              </div>
            </template>
          </DataTable>
        </div>
      </div>
    </div>
  </main>
</template>


<style scoped>

</style>
