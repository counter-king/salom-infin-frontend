<script setup>
// Core
import { useI18n } from "vue-i18n"
import { computed } from "vue";
// Components
import { InfoCircleBoldIcon, CloseCircleBoldIcon, MinusCircleBoldIcon, CheckCircleBoldDuotoneIcon, CheckCircleBoldIcon } from "@/components/Icons"
// enums
import { CHECK_IN_STATUS, CHECK_OUT_STATUS } from '@/modules/HR/modules/MyActivities/enums';
// Composable
const { t } = useI18n()

const props = defineProps({
  item: {
    type: String,
  }
})

const exitMatchText = computed(() => {
  switch (props.item?.check_out_status) {
    case CHECK_OUT_STATUS.NOT_CAME:
      return 'you-do-not-come'
    case CHECK_OUT_STATUS.EARLY_DEPARTURE:
      return 'you-left-early'
    case CHECK_OUT_STATUS.NORMAL_EXIT:
      return 'you-departure-on-time'
    case CHECK_OUT_STATUS.NO_EXIT_MARKED:
      return 'not-recorded'
    default:
      return 'no-data'
  }
})

const entryMatchText = computed(() => {
  switch (props.item?.check_in_status) {
    case CHECK_IN_STATUS.NOT_CAME:
      return 'you-do-not-come'
    case CHECK_IN_STATUS.CAME_ON_TIME:
      return 'you-come-on-time'
    case CHECK_IN_STATUS.LATE_ARRIVAL:
      return 'you-are-late'
    case CHECK_IN_STATUS.NO_ENTRY_MARKED:
      return 'not-recorded'
    default:
      return 'no-data'
  }
})

const entryStatusIcon = computed(() => {
  switch (props.item?.check_in_status) {
    case CHECK_IN_STATUS.NOT_CAME:
      return CloseCircleBoldIcon
    case CHECK_IN_STATUS.CAME_ON_TIME:
      return CheckCircleBoldIcon
    case CHECK_IN_STATUS.LATE_ARRIVAL:
      return InfoCircleBoldIcon
    case CHECK_IN_STATUS.NO_ENTRY_MARKED:
      return MinusCircleBoldIcon
    default:
      return InfoCircleBoldIcon
  }
})

const entryStatusClass = computed(() => {
  switch (props.item?.check_in_status) {
    case CHECK_IN_STATUS.NOT_CAME:
      return 'text-critic-500'
    case CHECK_IN_STATUS.CAME_ON_TIME:
      return 'text-success-500'
    case CHECK_IN_STATUS.LATE_ARRIVAL:
      return 'text-warning-500'
    case CHECK_IN_STATUS.NO_ENTRY_MARKED:
      return 'text-greyscale-400'
    default:
      return 'text-warning-500'
  }
})

const exitStatusIcon = computed(() => {
  switch (props.item?.check_out_status) {
    case CHECK_OUT_STATUS.NOT_CAME:
      return MinusCircleBoldIcon  
    case CHECK_OUT_STATUS.EARLY_DEPARTURE:
      return InfoCircleBoldIcon
    case CHECK_OUT_STATUS.NORMAL_EXIT:
      return CheckCircleBoldIcon
    case CHECK_OUT_STATUS.NO_EXIT_MARKED:
      return MinusCircleBoldIcon
    default:
      return InfoCircleBoldIcon
  }
})


const exitStatusClass = computed(() => {
  switch (props.item?.check_out_status) {
    case CHECK_OUT_STATUS.NOT_CAME:
      return 'text-critic-500'
    case CHECK_OUT_STATUS.NORMAL_EXIT:
      return 'text-success-500'
    case CHECK_OUT_STATUS.NO_EXIT_MARKED:
      return 'text-greyscale-400'
    default:
      return 'text-warning-500'
  }
})




</script>

<template>  
  <div class="grid grid-cols-2 gap-x-1">
    <!-- left -->
    <div v-if="props.item?.check_in_status" class="flex gap-x-1 items-center" :class="entryStatusClass">
      <base-iconify :icon="entryStatusIcon"   />
      <div class="text-sm font-medium">
        {{ t(entryMatchText) }}
      </div>
    </div>
    <!-- right -->  
     <!-- if exit status is not the same as entry status -->
    <div v-if="props.item?.check_out_status && props.item?.check_in_status != props.item?.check_out_status" class="flex gap-x-1 items-center  border-l border-l-greyscale-300 pl-2" :class="exitStatusClass">
      <base-iconify :icon="exitStatusIcon"   />
      <div class="text-sm font-medium">
        {{ t(exitMatchText) }} 
      </div>
    </div>
</div>
</template>

<style scoped>

</style>
