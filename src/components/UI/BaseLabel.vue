<script setup>
// Core
import { useI18n } from 'vue-i18n'
// Composable
const { t } = useI18n()
// Macros
const props = defineProps({
  label: {
    type: String,
    default: null
  }
})
</script>


<template>
  <p v-if="props.label" class="text-sm text-greyscale-500 font-medium mb-1">
    {{ t(props.label) }}
  </p>
</template>
