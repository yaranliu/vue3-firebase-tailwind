<script setup>
import { useI18n } from "vue-i18n"
const { t } = useI18n()
</script>

<template>
  <main class="h-full p-4">
    <div class="overflow-y-auto h-full grid place-content-center">
      <div class="text-white text-center leading-relaxed">
        <span class="text-8xl text-warning-500">404</span><br><span class="text-4xl text-alert-500 animate-pulse">
        {{ t('message')}}
      </span>
      </div>
    </div>
  </main>
</template>


<style scoped>

</style>

<i18n>
{
  "tr" : {
    "title" : "Not Found Başlık",
    "message" : "Sayfa bulunmadı"
  },
  "en" : {
    "title" : "Not Found Title",
    "message" : "Page not found"
  }
}
</i18n>
