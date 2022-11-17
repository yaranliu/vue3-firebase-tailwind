<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import InputField from "@/components/common/InputField.vue";
import { DefaultIcons } from "@/components/config/DefaultIcons";
import DataTable from "@/components/common/DataTable.vue";
import { SongModel } from "@/models/sample/SongModel.ts";

const search = ref('')

const filterPanel = ref(false)
const leftPanel = ref(false)

const columns = ref({
  song: { field: 'song', label: 'Song'},
  artist: { field: 'artist', label: 'Artist'},
  year: { field: 'year', label: 'Year'},
})


const data = ref<SongModel[]>([])

onMounted(() => {
  for (let i = 0; i <100; i++) {
    data.value.push(new SongModel().deserialize({ name: 'Song ' + i + 1, artist: 'Artis ' + i + 1, year: 1960 + i + 1 }))
  }
})

const fetched = (data) => {
  console.log(data)
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
              end-point = "https://dog.ceo/api/breeds/list/all"
              @loaded="fetched"
          >
            <template #header>
              <div class="table-row bg-violet-900 text-white sticky top-0">
                <div class="table-cell text-center p-2">#</div>
                <div class="table-cell text-left p-2">Song</div>
                <div class="table-cell text-left p-2">Song</div>
                <div class="table-cell text-left p-2">Artist</div>
                <div class="table-cell text-center p-2">Year</div>
                <div class="table-cell text-center p-2">Year</div>
                <div class="table-cell text-center p-2">Year</div>
                <div class="table-cell text-center p-2">Year</div>
                <div class="table-cell text-center p-2">Year</div>
                <div class="table-cell text-center p-2">Year</div>
              </div>
            </template>
            <template #data>
              <div v-for="index in 100" class="table-row text-slate-400 text-sm odd:bg-white odd:bg-opacity-5 hover:text-slate-100 transition-all ease-in-out duration-100">
                <div class="table-cell text-center p-2">{{ index }}</div>
                <div class="table-cell p-2">The Sliding Mr. Bones (Next Stop, Pottersville)</div>
                <div class="table-cell p-2">The Sliding Mr. Bones (Next Stop, Pottersville)</div>
                <div class="table-cell p-2">Malcolm Lockyer</div>
                <div class="table-cell text-center p-2">1961</div>
                <div class="table-cell text-center p-2">1961</div>
                <div class="table-cell text-center p-2">1961</div>
                <div class="table-cell text-center p-2">1961</div>
                <div class="table-cell text-center p-2">1961</div>
                <div class="table-cell text-center p-2">1961</div>
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
