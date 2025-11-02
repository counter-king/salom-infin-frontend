<script setup>
// Core
import { useI18n } from "vue-i18n"
import { computed } from "vue";
// Components
import { InfoCircleBoldIcon, CloseCircleBoldIcon, MinusCircleBoldIcon } from "@/components/Icons"
// enums
import { KIND } from '@/modules/HR/modules/MyActivities/enums';
// Composable
const { t } = useI18n()

const props = defineProps({
  status: {
    type: String,
  }
})

const statusIcon = computed(() => {
  switch(props.status) {
    case KIND.LATE:
    case KIND.EARLY_LEAVE:
      return InfoCircleBoldIcon
    
    case KIND.MISSED_CHECKIN:
    case KIND.MISSED_CHECKOUT:
      return MinusCircleBoldIcon
    
    case KIND.ABSENT:
      return CloseCircleBoldIcon
    
    default:
      return false
  }
})

const wrapperClass = computed(() => {
  switch(props.status) {
    case KIND.LATE:
    case KIND.EARLY_LEAVE:
      return 'text-warning-500'
    
    case KIND.MISSED_CHECKIN:
    case KIND.MISSED_CHECKOUT:
      return 'text-greyscale-900'
    
    case KIND.ABSENT:
      return 'text-critic-500'
    
    default:
      return false
  }
})

const statusIconClass = computed(() => {
  switch(props.status) {
    case KIND.LATE:
    case KIND.EARLY_LEAVE:
      return 'text-warning-500'
    
    case KIND.MISSED_CHECKIN:
    case KIND.MISSED_CHECKOUT:
      return 'text-greyscale-400'
    
    case KIND.ABSENT:
      return 'text-critic-500'
    
    default:
      return false
  }
})

const getMatchText = computed(() => {
  switch(props.status) {
    case KIND.LATE:
      return 'late-noun'
    
    case KIND.EARLY_LEAVE:
      return 'early-leave-noun'
    
    case KIND.MISSED_CHECKIN:
    case KIND.MISSED_CHECKOUT:
      return 'not-recorded-noun'
    
    case KIND.ABSENT:
      return 'not-come-noun'
    
    default:
      return ''
  }
})

</script>

<template>
  <div v-if="!!wrapperClass" class="attendance-status flex gap-x-1 items-center" :class="wrapperClass">
    <base-iconify :icon="statusIcon"  :class="statusIconClass" />
    <div class="text-sm font-medium">
      {{ t(getMatchText) }}
    </div>
  </div>
</template>

<style scoped>

</style>
