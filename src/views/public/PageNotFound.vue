<script setup lang="ts">
import { useI18n } from "vue-i18n"
const { t } = useI18n()
</script>

<template>
  <main class="h-full p-4">
    <div class="overflow-y-auto h-full grid place-content-center">
      <div class="text-white text-center leading-relaxed">
        <span class="animate-color">404</span><br><span class="text-4xl">
        {{ t('message')}}
      </span>
      </div>
    </div>
  </main>
</template>


<style scoped>
.animate-color {
  --bg-size: 400%;
  --color-one: hsl(5 90% 55%);
  --color-two: hsl(50 95% 55%);
  font-size: clamp(3rem, 25vmin, 8rem);
  font-weight: bold;
  background: linear-gradient(
      90deg,
      var(--color-one),
      var(--color-two),
      var(--color-one)
  ) 0 0 / var(--bg-size) 100%;
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  animation: move-bg 8s infinite linear;
}
@keyframes move-bg {
  to {
    background-position: var(--bg-size) 0;
  }
}
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
