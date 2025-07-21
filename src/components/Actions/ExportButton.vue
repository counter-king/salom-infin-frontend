<script setup>
// Components
import { FileDownloadIcon } from '@/components/Icons'
// Macros
const props = defineProps({
  rootClass: {
    type: String
  },
  onExportClick: {
    type: Function,
  },
  exportButtonLoading: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <base-button
    color="bg-primary-0 hover:bg-greyscale-100 text-primary-dark"
    border-color="border-transparent"
    label="export"
    icon-color="#767994"
    :icon-left="FileDownloadIcon"
    rounded
    shadow
    type="button"
    :class="props.rootClass"
    :loading="exportButtonLoading"
    @click="onExportClick"
  />
</template>

<style scoped>

</style>
