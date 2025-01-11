<script setup>
// Core
import { useI18n } from 'vue-i18n'
// Composable
const { t } = useI18n()
// Macros
const props = defineProps({
  title: {
    type: String
  },
  description: {
    type: String
  },
})
</script>

<template>
  <div class="vertical-card-item-view bg-primary-10 border border-greyscale-70 font-medium rounded py-[10px] px-4">
    <h1 class="text-xs text-greyscale-500 mb-1">{{ t(props.title) ?? '-' }}</h1>

    <p class="text-sm text-greyscale-900">{{ props.description ?? '-' }}</p>
  </div>
</template>

<style>
.vertical-card-item-view:first-child {
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

.vertical-card-item-view:last-child {
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
}
</style>
