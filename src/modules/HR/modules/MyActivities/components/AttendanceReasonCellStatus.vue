<script setup>
// Core
import { useI18n } from "vue-i18n"
import { computed } from "vue";
// Components
import { InfoCircleBoldIcon, CloseCircleBoldIcon, MinusCircleBoldIcon } from "@/components/Icons"
// enums
import { CHECK_IN_STATUS, CHECK_OUT_STATUS } from "../enums";

// Composable
const { t } = useI18n()

const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  }
})

const statusIcon = (data) => {
  // Late arrival or early departure
  if(data?.check_in_status == CHECK_IN_STATUS.LATE_ARRIVAL || data?.check_out_status == CHECK_OUT_STATUS.EARLY_DEPARTURE) {
    return InfoCircleBoldIcon
  }

  // No entry marked or no exit marked
  else if(data?.check_in_status == CHECK_IN_STATUS.NO_ENTRY_MARKED || data?.check_out_status == CHECK_OUT_STATUS.NO_EXIT_MARKED) {
    return MinusCircleBoldIcon
  }
  // not come 
  else if(data?.check_in_status == CHECK_IN_STATUS.NOT_CAME || data?.check_out_status == CHECK_OUT_STATUS.NOT_CAME) {
    return CloseCircleBoldIcon 
  }
}

const wrapperClass = (data) => {
  
  if(data?.check_in_status == CHECK_IN_STATUS.LATE_ARRIVAL || data?.check_out_status == CHECK_OUT_STATUS.EARLY_DEPARTURE) {
    return 'text-warning-500'
  }

  // No entry marked or no exit marked
  else if(data?.check_in_status == CHECK_IN_STATUS.NO_ENTRY_MARKED || data?.check_out_status == CHECK_OUT_STATUS.NO_EXIT_MARKED) {
    return 'text-greyscale-900'
  }

  // not come 
  else if(data?.check_in_status == CHECK_IN_STATUS.NOT_CAME || data?.check_out_status == CHECK_OUT_STATUS.NOT_CAME) {
    return 'text-critic-500'
  }
}

const statusIconClass = (data) => {
  
  if(data?.check_in_status == CHECK_IN_STATUS.LATE_ARRIVAL || data?.check_out_status == CHECK_OUT_STATUS.EARLY_DEPARTURE) {
    return 'text-warning-500'
  }

  // No entry marked or no exit marked
  else if(data?.check_in_status == CHECK_IN_STATUS.NO_ENTRY_MARKED || data?.check_out_status == CHECK_OUT_STATUS.NO_EXIT_MARKED) {
    return 'text-greyscale-400'
  }

  // not come 
  else if(data?.check_in_status == CHECK_IN_STATUS.NOT_CAME || data?.check_out_status == CHECK_OUT_STATUS.NOT_CAME) {
    return 'text-critic-500'
  }
}

const getMatchStatus = (data) => {
  if(data?.check_in_status == CHECK_IN_STATUS.LATE_ARRIVAL) {
    return 'you-are-late2'
  }
  else if(data?.check_out_status == CHECK_OUT_STATUS.EARLY_DEPARTURE) {
    return 'you-left-early'
  }
  // No entry marked or no exit marked
  else if(data?.check_in_status == CHECK_IN_STATUS.NO_ENTRY_MARKED || data?.check_out_status == CHECK_OUT_STATUS.NO_EXIT_MARKED) {
    return 'not-recorded'
  }
  // not come 
  else if(data?.check_in_status == CHECK_IN_STATUS.NOT_CAME || data?.check_out_status == CHECK_OUT_STATUS.NOT_CAME) {
    return 'you-do-not-come'
  }
}
</script>

<template>
  <div class="attendance-status flex gap-x-1 items-center" :class="wrapperClass(props.data)">
    <base-iconify :icon="statusIcon(props.data)"  :class="statusIconClass(props.data)" />
    <div class="text-sm font-medium">
      <!-- {{ t(getMatchStatus(props.data)) }} -->
    </div>
  </div>
</template>

<style scoped>

</style>
