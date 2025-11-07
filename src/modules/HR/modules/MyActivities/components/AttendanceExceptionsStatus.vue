<script setup>
// core
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
// enums
import { ATTENDANCE_EXCEPTION_STATUS } from '../enums';

const { t } = useI18n()
// props
const props = defineProps({
  status: {
      type: String,
  }
})

const wrapperClass = computed(() => {
  if(props.status == ATTENDANCE_EXCEPTION_STATUS.PENDING){
    return 'bg-warning-50 border border-warning-100 text-warning-500'  
  } 
  else if(props.status == ATTENDANCE_EXCEPTION_STATUS.APPROVED){
    return 'bg-success-50 border border-success-100 text-success-500'
  }
  else if(props.status == ATTENDANCE_EXCEPTION_STATUS.REJECTED){
    return 'bg-critic-30 border border-critic-100 text-critic-500'
  }
  return ''
})

const getMatchText = computed(() => {
  if(props.status == ATTENDANCE_EXCEPTION_STATUS.PENDING){
    return t('in-the-process-of-agreement')
  }
  else if(props.status == ATTENDANCE_EXCEPTION_STATUS.APPROVED){
    return t('agreed')
  }
  else if(props.status == ATTENDANCE_EXCEPTION_STATUS.REJECTED){
    return t('rejected')
  }
  return ''
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