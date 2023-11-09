<script setup>
// Core
import {useI18n} from "vue-i18n";
// Composable
const { t } = useI18n()
const props = defineProps({
  type: {
    type: String,
    default: "",
    required: true
  }
})
</script>

<template>
  <span class="text-sm font-medium text-greyscale-500">{{ t(props.type) }}</span>
</template>

<style scoped>

</style>
