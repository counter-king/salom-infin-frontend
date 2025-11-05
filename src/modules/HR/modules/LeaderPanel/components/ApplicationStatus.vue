<script setup>
// core
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
// enums

// composables
const { t } = useI18n()
// props
const props = defineProps({
  status: {
      type: [Boolean, Object],
  }
})

const wrapperClass = computed(() => {
  switch(props.status){
    case false:
      return 'bg-critic-30 border border-critic-100 text-critic-500'  
    case true:
      return 'bg-success-50 border border-success-100 text-success-500'
    default:
      return 'bg-warning-50 border border-warning-100 text-warning-500'
  }
})

const getMatchText = computed(() => {
  switch(props.status){
    case false:
      return t('rejected')
    case true:
      return t('confirmed')
    default:
      return t('waiting')
  }
})

</script>
<template>
 <div 
   class="flex justify-center items-center px-3 py-[6px] text-xs font-semibold rounded-[80px] w-fit"
   :class="wrapperClass"
  >
   {{ getMatchText }}
  </div>
</template>