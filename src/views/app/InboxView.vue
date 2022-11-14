<script setup>
import { ref} from "vue";
import CollapseContainer from "@/components/common/CollapseContainer.vue";
import InputField from "@/components/common/InputField.vue";

const collapsed = ref(false)

const password = ref('')

</script>

<template>
  <main class="h-full py-4 pr-1">
    <div class="h-full">
      <div class="flex flex-row space-x-4 h-full">
        <CollapseContainer
            v-model="collapsed"
            class="text-white transition-width ease-in-out duration-300"
            :class="{ 'w-6' : collapsed, 'w-1/6' : !collapsed }"
        >
          <div
              class="w-full h-full overflow-y-auto p-2 bg-blue-100 bg-opacity-10 rounded-md space-y-1"
              :class="{ 'hidden' : collapsed }"
          >
            <InputField class="w-1/2"/>
            <InputField class="w-full text-sm" />
            <InputField class="w-full text-sm text-blue-300" type="password" placeholder="Password" />
            <InputField class="w-full text-2xl text-yellow-400" type="password" placeholder="Password" clearable />
            <InputField  v-model.trim="password" class="w-full text-2xl" type="password" placeholder="Password" error clearable/>
            <InputField
                v-model.trim="password"
                class="w-full bg-orange-700 bg-opacity-100 py-12"
                type="password"
                placeholder="Password"
                clearable
            >
              <template #prepend>
                <i class="las la-phone-volume" />
              </template>
              <template #append>
                <i class="las la-bell" />
              </template>
            </InputField>
            <InputField
                v-model.trim="password"
                class="w-full text-2xl bg-white bg-opacity-70 text-black"
                type="password"
                placeholder="Password"
                clearable
            >
              <template #prepend>
                <i class="las la-phone-volume text-slate-700" />
              </template>
              <template #append>
                <i class="las la-bell text-slate-700" />
              </template>
            </InputField>
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
