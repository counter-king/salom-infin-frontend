<script setup>
// Core
import { useI18n } from "vue-i18n"
import { computed } from "vue";
// Components
import { InfoCircleBoldIcon, CloseCircleBoldIcon, MinusCircleBoldIcon, CheckCircleBoldDuotoneIcon, CheckCircleBoldIcon } from "@/components/Icons"
// enums
import { KIND } from '@/modules/HR/modules/MyActivities/enums';
// Composable
const { t } = useI18n()

const props = defineProps({
  item: {
    type: String,
  }
})

const exitStatus = computed(() => {
  return props.item?.check_out_status || 'no-data'
})
const entryStatus = computed(() => {
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




</script>

<template>
  <div>
    <!-- left -->
    <div class="flex gap-x-1 items-center border-r border-r-greyscale-300" :class="entryStatusClass">
      <base-iconify :icon="entryStatusIcon"   />
      <div class="text-sm font-medium">
        {{ t(entryStatus) }}
      </div>
    </div>
    <!-- right -->
    <div class="flex gap-x-1 items-center" :class="exitStatusClass">
      <base-iconify :icon="exitStatusIcon"   />
      <div class="text-sm font-medium">
        {{ t(exitStatus) }}
      </div>
    </div>

</div>
</template>

<style scoped>

</style>
