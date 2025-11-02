<script setup>
// core
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
// enums
import { USER_TYPE } from '../enums';


// composables
const { t } = useI18n()
// props
const props = defineProps({
  type: {
    type: String,
    default: 'employee',
    validator: (value) => [USER_TYPE.HR, USER_TYPE.MANAGER, USER_TYPE.EMPLOYEE].includes(value)
  },
  status: {
      type: [String, Number, Boolean, Object],
  }
})

const wrapperClass = computed(() => {
  switch(props.type){
    case USER_TYPE.MANAGER:
      switch(props.status){
        case false:
          return 'bg-critic-30 border border-critic-100 text-critic-500'  
        case true:
          return 'bg-info-50 border border-info-100 text-info-500'
        default:
          return 'bg-warning-50 border border-warning-100 text-warning-500'
      }
    case USER_TYPE.HR:
      switch(props.status){
        case true:
          return 'bg-info-50 border border-info-100 text-info-500'
        case false:
          return 'bg-critic-30 border border-critic-100 text-critic-500'
        default:
          return 'bg-warning-50 border border-warning-100 text-warning-500'
      }
    case USER_TYPE.EMPLOYEE:
      if(props.status == true){
        return 'bg-warning-50 border border-warning-100 text-warning-500'
      } else if(props.status == false){
      break;
  }


  // if((props.type == USER_TYPE.HR && props.status == false) || (props.type == USER_TYPE.MANAGER && props.status == true)){
  //   return 'bg-critic-30 border border-critic-100 text-critic-500'  
  // } 
  // else if(2){
  //   return 'bg-critic-30 border border-critic-100 text-critic-500'  
  // }
  // else if(3){
  //   return 'bg-warning-50 border border-warning-100 text-warning-500'
  // }
  // else if(4){
  //   return 'bg-info-50 border border-info-100 text-info-500'
  // } 
  // else if(5){
  //   return 'bg-success-50 border border-success-100 text-success-500'
  // }
  // else if(7){
  //   return 'bg-info-50 border border-info-100 text-info-500'
  // }
})

const getMatchText = computed(() => {
  switch(props.type){
    case USER_TYPE.MANAGER:
      switch(props.status){
        case false:
          return t('rejected')
        case true:
          return t('confirmed')
        default:
          return t('waiting')
    }
    case USER_TYPE.HR:
      switch(props.status){
        case true:
          return t('entered-to-timesheet')
        case false:
          return t('rejected')
        default:
          return t('waiting')
    }

    case USER_TYPE.EMPLOYEE:
      switch(props.status){
        case false:
          return t('no-reason-provided')
        case true:
          return t('reason-ente red')
        default:
          return t('waiting')
      }
  }
  // if(1){
  //   return t('reason-entered')
  // }
  // else if(2){
  //   return t('letter-written')
  // }
  // else if(3){
  //   return t('not-confirmed')
  // }
  // else if(4){
  //   return t('entered-to-timesheet')
  // }
  // else if(5){
  //   return t('rejected')
  // }
  // else if(6){
  //   return t('no-reason-provided')
  // }
  // else if(7){
  //   return t('confirmed')
  // }
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