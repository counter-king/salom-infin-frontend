<script setup>
// Core
import { computed } from "vue"
import { useI18n } from "vue-i18n"
//Utils
import { formatLateTime, getAttendanceExitStatus, returnLateTime } from "@/utils"
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
    default: () => {
    },
    required: true
  }
})

// Composable
const { t, locale } = useI18n()

// Computed
const exitStatus = computed(() => {
  // return getAttendanceExitStatus(props.item?.date, props.item?.first_check_in, props.item?.last_check_out)
  return props.item?.check_out_status || 'no-data'
})

const exitStatusIcon = computed(() => {
  switch (exitStatus.value) {
    case 'not-came':
      return CloseCircleBoldIcon
    case 'normal-exit':
      return CheckCircleBoldIcon
    default:
      return InfoCircleBoldIcon
  }
})

const exitStatusClass = computed(() => {
  switch (exitStatus.value) {
    case 'not-came':
      return 'text-critic-500'
    case 'normal-exit':
      return 'text-success-500'
    default:
      return 'text-warning-500'
  }
})

const earlyLeaveMinutes = computed(() => {
  // return exitStatus.value === 'early-departure'
  //   ? returnLateTime(props.item?.first_check_in, props.item?.last_check_out, locale.value, 'exit') : null

  return props.item?.early_leave_minutes > 0 ?
    formatLateTime(props.item?.early_leave_minutes, locale.value) : null
})
</script>

<template>
  <div class="flex items-center gap-x-3">
    <div class="flex items-center gap-x-1">
      <base-iconify
        :icon="exitStatusIcon"
        :class="exitStatusClass"
      />

      <span
        class="text-sm  font-medium"
        :class="exitStatus === 'no-exit-marked' ? 'text-greyscale-900' : exitStatusClass"
      >
        {{t(exitStatus) }}
      </span>
    </div>

    <div
      v-if="earlyLeaveMinutes"
      class="text-xs font-medium text-critic-500"
    >
      {{ earlyLeaveMinutes }}
    </div>

  </div>
</template>

<style scoped>

</style>
