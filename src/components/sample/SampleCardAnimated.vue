<script setup lang="ts">
// Imports
import { ref, computed } from "vue"
import {useI18n} from "vue-i18n"
import { useMouseInElement } from "@vueuse/core";

const {t} = useI18n()
const target = ref(null)

const { elementX, elementY, isOutside, elementHeight, elementWidth } = useMouseInElement(target)

// Props
const props = defineProps({ content: String })

// Emits

// State

// Computed
const cardTransform = computed(() => {
  const MAX_ROTATION = 20
  const rX = (MAX_ROTATION / 2 - (elementY.value / elementHeight.value) * MAX_ROTATION).toFixed(2)
  const rY = (MAX_ROTATION / 2 - (elementX.value / elementWidth.value) * MAX_ROTATION - MAX_ROTATION / 2).toFixed(2)
  return isOutside.value ? '' : `perspective(${elementWidth.value}px) rotateX(${rX}deg) rotateX(${rY}deg)`
})

// Watchers

// Methods

// Hooks

// Misc


</script>

<template>
<div
    ref="target"
    class="border rounded-md p-24 text-white text-center"
    :style="{
      transform: cardTransform,
      transition: 'transform 0.1s ease-out'
    }"
>
  {{ props.content }}
</div>
</template>


<style scoped>

</style>
<i18n>
{
  "tr": {},
  "en": {}
}
</i18n>
