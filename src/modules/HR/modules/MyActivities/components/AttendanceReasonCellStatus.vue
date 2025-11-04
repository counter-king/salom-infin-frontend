<script setup>
// Core
import { useI18n } from "vue-i18n"
import { computed } from "vue";
// Components
import { InfoCircleBoldIcon, CloseCircleBoldIcon, MinusCircleBoldIcon } from "@/components/Icons"
// enums
import { CHECK_IN_STATUS, CHECK_OUT_STATUS, KIND } from "../enums";

// Composable
const { t } = useI18n()

const props = defineProps({
  item: {
    type: Object,
    default: () => ({})
  }
})

const statusIcon = computed(() => {
  switch(props.item.kind) {
    case KIND.LATE:
    case KIND.EARLY_LEAVE:
      return InfoCircleBoldIcon
    case KIND.MISSED_CHECKIN:
    case KIND.MISSED_CHECKOUT:
      return MinusCircleBoldIcon
    case KIND.ABSENT:
      return CloseCircleBoldIcon
    default:
      return InfoCircleBoldIcon
  }
})

const wrapperClass = computed(() => {

  switch(props.item?.kind) {
    case KIND.LATE:
    case KIND.EARLY_LEAVE:
      return 'text-warning-500'
    case KIND.MISSED_CHECKIN:
    case KIND.MISSED_CHECKOUT:
      return 'text-greyscale-900'
    case KIND.ABSENT:
      return 'text-critic-500'
  }
})

const statusIconClass = computed(() => {
  
  switch(props.item?.kind) {
    case KIND.LATE:
    case KIND.EARLY_LEAVE:
      return 'text-warning-500'
    case KIND.MISSED_CHECKIN:
    case KIND.MISSED_CHECKOUT:
      return 'text-greyscale-400'
    case KIND.ABSENT:
      return 'text-critic-500'
  }
})

const getMatchText = computed(() => {
  switch(props.item?.kind) {
    case KIND.LATE:
      return 'you-are-late2'
    case KIND.EARLY_LEAVE:
      return 'you-left-early'
    case KIND.MISSED_CHECKIN:
    case KIND.MISSED_CHECKOUT:
      return 'not-recorded'
    case KIND.ABSENT:
      return 'you-do-not-come'
    default:
      return ''
  }
})
</script>

<template>
  <div class="attendance-status flex gap-x-1 items-center" :class="wrapperClass">
    <base-iconify :icon="statusIcon"  :class="statusIconClass" />
    <div class="text-sm font-medium">
      {{ t(getMatchText) }}
    </div>
  </div>
</template>

<style scoped>

</style>
