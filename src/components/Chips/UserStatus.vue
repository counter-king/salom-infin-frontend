<script setup>
// Core
import { computed } from 'vue'
// Utils
import { USER_STATUS_CODES } from '@/enums'
// Macros
const props = defineProps({
  code: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  status: {
    type: Object,
    default: () => {}
  },
  border: {
    type: Boolean
  },
  circle: {
    type: Boolean
  },
  rootClass: {
    type: String
  },
})
// Computed
const statement = computed(() => {
  switch (props.status?.id) {
    case USER_STATUS_CODES.OTHERS:
    case USER_STATUS_CODES.ON_THE_STATEMENTS:
    case USER_STATUS_CODES.APPROVED:
    case USER_STATUS_CODES.INTRODUCED:
      return 'bg-greyscale-50 text-greyscale-500 border-greyscale-200'
    // case USER_STATUS_CODES.AUDIT_COMMISSION:
    //   return 'bg-info-50 text-info-500 border-info-100'
    case USER_STATUS_CODES.INTERNS:
    case USER_STATUS_CODES.BUSINESS_TRIP:
    case USER_STATUS_CODES.LABOR_LEAVE:
    case USER_STATUS_CODES.ACADEMICIAN_VACATION:
    case USER_STATUS_CODES.STUDY_LEAVE:
    case USER_STATUS_CODES.NO_CONTENT:
    case USER_STATUS_CODES.FROM_THE_CONTENT:
      return 'bg-warning-50 text-warning-500 border-warning-100'
    case USER_STATUS_CODES.WORKERS:
    case USER_STATUS_CODES.WORKERS_NOT_STAFF:
    case USER_STATUS_CODES.PART_TIMERS:
    case USER_STATUS_CODES.BANK_COUNCIL:
    case USER_STATUS_CODES.AUDIT_COMMISSION:
      return 'bg-success-50 text-success-500 border-success-100'
    case USER_STATUS_CODES.TRANSFER_TO_ANOTHER_BRANCH:
      return
    case USER_STATUS_CODES.SICK_LEAVES:
    case USER_STATUS_CODES.SICK_LEAVE_DECREE:
    case USER_STATUS_CODES.DECREE_2:
    case USER_STATUS_CODES.DECREE_3:
    case USER_STATUS_CODES.MILITARY_SERVICE:
    case USER_STATUS_CODES.DISMISSED:
    case USER_STATUS_CODES.DISMISSED_NOT_STAFF:
    case USER_STATUS_CODES.SUSPENDED_NOT_STAFF:
    case USER_STATUS_CODES.SUSPENDED:
    case USER_STATUS_CODES.REJECTED:
    case USER_STATUS_CODES.DISMISSAL_TRANSFER_TO_BRANCH:
      return 'bg-critic-50 text-critic-500 border-critic-100'
    default:
      return ''
  }
})
</script>

<template>
  <span
    class="px-2 py-1 text-xs font-semibold rounded-lg"
    :class="[
      statement,
      {
        'border': props.border,
        '!rounded-[80px]': props.circle
      },
      props.rootClass
    ]"
  >
    <slot>
      {{ props.name }}
    </slot>
  </span>
</template>

<style scoped>

</style>
