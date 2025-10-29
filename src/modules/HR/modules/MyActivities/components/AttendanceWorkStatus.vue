<script setup>
// Core
import { useI18n } from 'vue-i18n';
// enums
import { USER_STATUS_CODES } from '@/enums';

const { t } = useI18n()
// props
const props = defineProps({
     data: {
         type: Object,
     }
})

const wrapperClass = () => {
  if(props.data?.attendance?.type == USER_STATUS_CODES.WORKERS) {
    return 'bg-success-100 text-greyscale-900'
  }
  else if(props.data?.attendance?.type) {
      switch(props.data?.attendance?.type) {
        case USER_STATUS_CODES.LABOR_LEAVE:
          return 'bg-info-100 text-greyscale-900'
        case USER_STATUS_CODES.NO_CONTENT:
          return 'bg-warning-100 text-greyscale-900'
        case USER_STATUS_CODES.SICK_LEAVES:
          return 'bg-critic-30 text-greyscale-900'
        case USER_STATUS_CODES.BUSINESS_TRIP:
          return 'bg-greyscale-100 text-greyscale-900'
        default:
          return 'bg-greyscale-30 text-greyscale-900'
      }
  } else if (!props.data?.workDay && props.data?.currentMonth) {
    return 'bg-greyscale-50 text-greyscale-500'
  }

  return ""
}

const getMatchText = () => {
  if(props.data?.attendance?.type == USER_STATUS_CODES.WORKERS) {
    return `8 soat`
  }
  else if(props.data?.attendance?.type) {
    return props.data?.attendance?.user_status?.name
  } else if(!props.data.workDay && props.data.currentMonth) {
    return t("weekend-days")
  }
  return "-"
}

</script>
<template>
 <div 
   class="flex justify-center items-center px-3 py-[6px] text-xs font-semibold rounded-[8px] w-fit"
   :class="wrapperClass()"
  >
  {{ getMatchText() }}
  </div>
</template>