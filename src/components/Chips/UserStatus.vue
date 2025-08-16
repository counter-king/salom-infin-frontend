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
    case USER_STATUS_CODES.OTHERS:                                               // TO DO
      return 'bg-greyscale-50 text-greyscale-500 border-greyscale-200'
    case USER_STATUS_CODES.AUDIT_COMMISSION:                                        // IN_PROGRESS
      return 'bg-info-50 text-info-500 border-info-100'
    case USER_STATUS_CODES.BANK_COUNCIL:                                            // ON_HOLD
    case USER_STATUS_CODES.INTERNS:                                      // FOR_SIGNATURE
    case USER_STATUS_CODES.SICK_LEAVES:                                          // ON_REVIEW
      return 'bg-warning-50 text-warning-500 border-warning-500'
    case USER_STATUS_CODES.WORKERS:                                               // DONE
    case USER_STATUS_CODES.BUSINESS_TRIP:                                               // DONE
      return 'bg-success-50 text-success-500 border-success-500'
    case USER_STATUS_CODES.TRANSFER_TO_ANOTHER_BRANCH:                                               // DONE
      return
    case USER_STATUS_CODES.SUSPENDED_NOT_STAFF:                                               // DONE
      return
    case USER_STATUS_CODES.DISMISSED_NOT_STAFF:                                               // DONE
      return
    case USER_STATUS_CODES.WORKERS_NOT_STAFF:                                               // DONE
      return
    case USER_STATUS_CODES.FROM_THE_CONTENT:                                               // DONE
      return
    case USER_STATUS_CODES.NO_CONTENT:                                               // DONE
      return
    case USER_STATUS_CODES.LABOR_LEAVE:                                               // DONE
      return 'bg-critic-50 text-critic-500 border-critic-500'
    case USER_STATUS_CODES.MILITARY_SERVICE:                                               // DONE
      return
    case USER_STATUS_CODES.ACADEMICIAN_VACATION:                                               // DONE
      return
    case USER_STATUS_CODES.DECREE_3:                                               // DONE
      return
    case USER_STATUS_CODES.DECREE_2:                                               // DONE
      return
    case USER_STATUS_CODES.SICK_LEAVE_DECREE:                                               // DONE
      return
    case USER_STATUS_CODES.SUSPENDED:                                               // DONE
      return
    case USER_STATUS_CODES.DISMISSAL_TRANSFER_TO_BRANCH:                                               // DONE
      return
    case USER_STATUS_CODES.DISMISSED:                                               // DONE
      return
    case USER_STATUS_CODES.PART_TIMERS:                                               // DONE
      return
    case USER_STATUS_CODES.REJECTED:                                               // DONE
      return
    case USER_STATUS_CODES.ON_THE_STATEMENTS:                                               // DONE
      return
    case USER_STATUS_CODES.INTRODUCED:                                               // DONE                                            // DONE
      return
    default:                                                              // APPROVED
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
