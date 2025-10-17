<script setup>
// Core
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { STATUS } from '../enums';

const { t } = useI18n()
// props
const props = defineProps({
     status: {
         type: String,
     }
})

const statusClass = computed(() => {
  switch (props.status) {
    default:
      return 'bg-critic-30 text-critic-500'
  }
})
</script>
<template>
 <div 
   class="flex justify-center items-center px-3 py-[6px] text-xs font-semibold rounded-[8px] w-fit"
   :class="statusClass"
  >
   Sabab kiritilmagan
  </div>
</template>