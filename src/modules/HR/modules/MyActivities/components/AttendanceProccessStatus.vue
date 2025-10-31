<script setup>
// core
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
// enums

const { t } = useI18n()
// props
const props = defineProps({
  status: {
      type: String,
  }
})

const wrapperClass = computed(() => {
  if(1){
    return 'bg-critic-30 border border-critic-100 text-critic-500'  
  } 
  else if(2){
    return 'bg-critic-30 border border-critic-100 text-critic-500'  
  }
  else if(3){
    return 'bg-warning-50 border border-warning-100 text-warning-500'
  }
  else if(4){
    return 'bg-info-50 border border-info-100 text-info-500'
  } 
  else if(5){
    return 'bg-success-50 border border-success-100 text-success-500'
  }
  else if(7){
    return 'bg-info-50 border border-info-100 text-info-500'
  }
})

const getMatchText = () => {
  if(1){
    return t('reason-entered')
  }
  else if(2){
    return t('letter-written')
  }
  else if(3){
    return t('not-confirmed')
  }
  else if(4){
    return t('entered-to-timesheet')
  }
  else if(5){
    return t('rejected')
  }
  else if(6){
    return t('no-reason-provided')
  }
  else if(7){
    return t('confirmed')
  }
}
</script>
<template>
 <div 
   class="flex justify-center items-center px-3 py-[6px] text-xs font-semibold rounded-[8px] w-fit"
   :class="wrapperClass"
  >
   {{ getMatchText() }}
  </div>
</template>