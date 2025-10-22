<script setup>
// Core
import { computed } from "vue"
import { useI18n } from "vue-i18n"
//Utils
import { formatLateTime, getAttendanceEntryStatus, returnLateTime } from "@/utils"
import { formatHour } from "@/utils/formatDate"
// Components
import {
  AlarmTurnOffBoldIcon,
  CheckCircleBoldIcon,
  InfoCircleBoldIcon,
  MinusCircleBoldIcon,
  CloseCircleBoldIcon,
} from "@/components/Icons"


const props = defineProps({
  item: {
    type: Object,
    default: () => {},
    required: true
  }
})

// Composable
const { t, locale } = useI18n()

// Computed
const entryStatus = computed(() => {
  // return getAttendanceEntryStatus(props.item?.date, props.item?.first_check_in, props.item?.last_check_out)
  return props.item?.check_in_status || 'no-data'
})

const entryStatusIcon = computed(() => {
  switch (entryStatus.value) {
    case 'not-came':
      return CloseCircleBoldIcon
    case 'came-on-time':
      return CheckCircleBoldIcon
    case 'late-arrival':
      return AlarmTurnOffBoldIcon
    case 'no-entry-marked':
      return MinusCircleBoldIcon
    default:
      return InfoCircleBoldIcon
  }
})

const entryStatusClass = computed(() => {
  switch (entryStatus.value) {
    case 'not-came':
      return 'text-critic-500'
    case 'came-on-time':
      return 'text-success-500'
    case 'late-arrival':
      return 'text-warning-500'
    case 'no-entry-marked':
      return 'text-greyscale-400'
    default:
      return 'text-warning-500'
  }
})

const lateMinutes = computed(() => {
  // return entryStatus.value === 'late-arrival' ?
  //   returnLateTime(props.item?.first_check_in, props.item?.last_check_out, locale.value, 'entry') : null

  return props.item?.late_minutes > 0 ?
    formatLateTime(props.item?.late_minutes, locale.value) : null
})
</script>

<template>
  <div class="flex items-center gap-x-3">
    <div class="flex items-center gap-x-1">
      <base-iconify
        :icon="entryStatusIcon"
        :class="entryStatusClass"
      />

      <span
        class="text-sm  font-medium"
        :class="entryStatus === 'no-entry-marked' ? 'text-greyscale-900' : entryStatusClass"
      >
        {{  t(entryStatus) }}
      </span>
    </div>

    <div
      v-if="lateMinutes"
      class="text-xs font-medium text-critic-500"
    >
      {{ lateMinutes }}
    </div>

  </div>
</template>

<style scoped>

</style>
