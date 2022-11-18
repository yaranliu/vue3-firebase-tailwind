<script setup>

import { useI18n } from "vue-i18n"
const { t } = useI18n()

</script>

<i18n src="@/locales/globals.json" />
<i18n>
{
  "tr" : {
    "about": "Hakkımızda"
  },
  "en" : {
    "about": "About us"
  }
}
</i18n>

<template>
  <main class="h-full p-4">
    <div class="overflow-y-auto h-full">

<!--      Page starts here-->
      <div class="h-full grid place-content-center text-white text-center space-y-4">
        <div class="text-6xl font-bold tracking-widest" >{{ t('about') }}</div>
        <div>{{ t('test')}}</div>
      </div>
<!--      Page ends here-->
    </div>
  </main>
</template>

<style>
</style>

