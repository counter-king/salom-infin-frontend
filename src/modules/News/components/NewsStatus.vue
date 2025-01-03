<script setup>
// Core
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { NEWS_STATUS } from '../enums';

const { t } = useI18n()
// props
const props = defineProps({
     status: {
         type: String,
     }
 })

const statusClass = computed(() => {
  switch (props.status) {
    case NEWS_STATUS.PANDING:
      return 'bg-greyscale-50 text-greyscale-500'
    case NEWS_STATUS.DRAFT:
      return 'bg-info-50 text-info-500'
    case NEWS_STATUS.PUBLISHED:
      return 'bg-success-50 text-success-500'
    case NEWS_STATUS.ARCHIVED:
      return 'bg-info-50 text-info-500'
    case NEWS_STATUS.DECLINED:
      return 'bg-critic-50 text-critic-500'
    default:
      return 'bg-greyscale-50 text-greyscale-500'
  }
})
</script>
<template>
 <div 
   class="flex justify-center items-center px-2 py-1 text-xs font-semibold rounded-[80px] w-fit"
   :class="statusClass"
  >
   {{ t(props.status === NEWS_STATUS.PANDING ? 'news-pending' : props.status) }}
  </div>
</template>