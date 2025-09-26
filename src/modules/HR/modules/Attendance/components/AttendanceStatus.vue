<script setup>
// Core
import { useI18n } from "vue-i18n"
// Utils
import { getWorkdayStatus } from "@/utils"
// Components
import { InfoCircleBoldIcon, CloseCircleBoldIcon, CheckCircleBoldIcon } from "@/components/Icons"
import { computed } from "vue";
import AttendanceEntryHours from "@/modules/HR/modules/Attendance/components/AttendanceEntryHours.vue";
import AttendanceExitHours from "@/modules/HR/modules/Attendance/components/AttendanceExitHours.vue";

const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
    required: true
  }
})

// Computed
const statusValue = computed(() => {
  return getWorkdayStatus(props.item.date, props.item.first_check_in, props.item.last_check_out)
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
    <div class="w-1/2 border-r border-r-greyscale-300">
      <attendance-entry-hours :item="item" />
    </div>
    <div class="w-1/2">
      <attendance-exit-hours :item="item"/>
    </div>
  </div>
</template>

<style scoped>

</style>
