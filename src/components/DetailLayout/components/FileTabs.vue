<script setup>
// Core
import { computed } from 'vue'
// Components
import { FilePreview } from '@/components/Files'
// Macros
const props = defineProps({
  files: {
    type: Array,
    default: () => []
  }
})
// Computed
const filesList = computed(() => props.files.map(file => ({ ...file, title: file.name, slot: 'file' })))
</script>

<template>
  <div class="file-tabs-view flex flex-col h-full">
    <base-tab-view
      :tab-view="filesList"
      scrollable
      truncate
      actions
    >
      <template #file="{ value }">
        <div class="h-[calc(100vh-240px)]">
          <template v-if="value">
            <file-preview :file="value" />
          </template>
        </div>
      </template>
    </base-tab-view>
  </div>
</template>

<style scoped>

</style>
