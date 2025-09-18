<script setup>
// Core
import { useI18n } from "vue-i18n"
// Utils
import { getWorkdayStatus } from "@/utils"
// Components
import { InfoCircleBoldIcon, CloseCircleBoldIcon, CheckCircleBoldIcon } from "@/components/Icons"
import { computed } from "vue";

const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
    required: true
  }
})

// Computed
const statusValue = computed(() => {
  return getWorkdayStatus(props.item.first_check_in, props.item.last_check_out)
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
  <div class="attendance-status flex gap-x-1">
    <base-iconify
      :icon="statusIcon"
      :class="statusClass"
    />
    <div
      class=" text-sm font-medium"
      :class="statusClass"
    >
      {{ t(statusValue) }}
    </div>
  </div>
</template>

<style scoped>

</style>
