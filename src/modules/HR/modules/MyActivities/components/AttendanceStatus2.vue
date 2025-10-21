<script setup>
// Core
import { useI18n } from "vue-i18n"
import { computed } from "vue";
// Components
import { InfoCircleBoldIcon, CloseCircleBoldIcon, CheckCircleBoldIcon } from "@/components/Icons"

const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
    required: true
  }
})

const statusIcon = computed(() => {
  switch (statusValue.value) {
    case 'not-came':
      return CloseCircleBoldIcon
    case 'came-on-time':
      return CheckCircleBoldIcon
    default:
      return InfoCircleBoldIcon
  }
})
const statusClass = computed(() => {
  switch (statusValue.value) {
    case 'not-came':
      return 'text-critic-500'
    case 'came-on-time':
      return 'text-success-500'
    default:
      return 'text-warning-500'
  }
})

// Composable
const { t } = useI18n()
</script>

<template>
  <div class="attendance-status flex gap-x-1 items-center">
    <base-iconify :icon="InfoCircleBoldIcon" class="text-warning-500"/>
    <div class="text-sm font-medium text-warning-500">
      Kechikish
    </div>
  </div>
</template>

<style scoped>

</style>
