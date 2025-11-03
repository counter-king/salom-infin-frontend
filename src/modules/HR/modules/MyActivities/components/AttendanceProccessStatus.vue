<script setup>
// core
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
// enums
import { REASON_PROCESS_STATUS } from '../enums';


// composables
const { t } = useI18n()
// props
const props = defineProps({
  // type: {
  //   type: String,
  //   default: 'employee',
  //   validator: (value) => [USER_TYPE.HR, USER_TYPE.MANAGER, USER_TYPE.EMPLOYEE].includes(value)
  // },
  // status: {
  //     type: [String, Number, Boolean, Object],
  // }
  status: {
    type: String,
    required: true
  }
})


const wrapperClass = computed(() => {
  switch(props.status){
  case REASON_PROCESS_STATUS.WAITING:
    return 'bg-warning-50 border border-warning-100 text-warning-500'
  case REASON_PROCESS_STATUS.REASON_ENTERED:
  case REASON_PROCESS_STATUS.ENTERED_TO_TIMESHEET:
    return 'bg-success-50 border border-success-100 text-success-500'
  case REASON_PROCESS_STATUS.CONFIRMED:
    return 'bg-info-50 border border-info-100 text-info-500'
  case REASON_PROCESS_STATUS.REJECTED:
    return 'bg-critic-30 border border-critic-100 text-critic-500'
  case REASON_PROCESS_STATUS.LETTER_WRITTEN:
    return 'bg-warning-50 border border-warning-100 text-warning-500'
  }
})

const getMatchText = computed(() => {
  switch(props.status){
    case REASON_PROCESS_STATUS.WAITING:
      return t('waiting')
    case REASON_PROCESS_STATUS.REASON_ENTERED:
      return t('reason-entered')
    case REASON_PROCESS_STATUS.ENTERED_TO_TIMESHEET:
      return t('entered-to-timesheet')
    case REASON_PROCESS_STATUS.CONFIRMED:
      return t('confirmed')
    case REASON_PROCESS_STATUS.REJECTED:
      return t('rejected')
    case REASON_PROCESS_STATUS.LETTER_WRITTEN:
      return t('letter-written')
    default:
      return ''
  }
})

</script>
<template>
 <div 
   class="flex justify-center items-center px-3 py-[6px] text-xs font-semibold rounded-[8px] w-fit"
   :class="wrapperClass"
  >
   {{ getMatchText }}
  </div>
</template>