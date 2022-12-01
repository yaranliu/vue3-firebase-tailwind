<script setup lang="ts">
// Imports
import {useI18n} from "vue-i18n"

const {t} = useI18n()

// Props
const props = defineProps({ content: String })
// Emits

// State

// Computed

// Watchers

// Methods

// Hooks

// Misc


</script>

<template>
<div class="border rounded-md p-24 text-white text-center">
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
