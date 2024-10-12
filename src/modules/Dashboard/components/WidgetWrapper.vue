<script setup>
// Core
import { useI18n } from 'vue-i18n'
// Composable
const { t } = useI18n()
// Macros
const props = defineProps({
  title: {
    type: String,
    default: 'write-application'
  }
})
</script>

<template>
  <div class="doc-flow-view flex flex-col shadow-button rounded-xl bg-white">
    <div class="flex items-center gap-4 px-5 pt-4 pb-3">
      <h1 class="text-primary-900 font-semibold">{{ t(props.title) }}</h1>

      <div class="flex-1"></div>

      <slot name="header-after"></slot>
    </div>

    <div class="relative h-full overflow-y-auto pr-2 mr-2 mb-4 ml-5">
      <slot name="content" />
    </div>
  </div>
</template>
