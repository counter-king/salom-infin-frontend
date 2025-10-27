<script setup>
// core
import { useI18n } from 'vue-i18n';
// components
import { InfoCircleBoldIcon } from '@/components/Icons';
// store
import { useMyAttendanceStore } from '../store/myAttendence.store';
// composables
const { t } = useI18n()
const attendanceStore = useMyAttendanceStore()
//props
const props = defineProps({
    data: {
        type: Object,
        required: true
    }
})

const toolTipFun = (data)=> (
{
  value:t(data?.value),
  pt: {
      arrow: {
          class: '!text-greyscale-900'
      },
      text: '!px-3 !py-2 !rounded-[12px] !bg-greyscale-900 !text-white !text-sm',
  },
  escape: true,
  autoHide: false
})

</script>
<template>
    <div class="shadow w-full flex flex-col gap-3 p-4 cursor-pointer rounded-[20px] bg-white">
      <!-- top -->
      <div class="flex items-center gap-3 relative overflow-visible">
        <!-- icon wrapper -->
        <div 
          class="w-9 h-9 min-w-9 min-h-9 rounded-full flex items-center justify-center"
          :class="props.data.iconClass"
          >
          <base-iconify :icon="props.data.icon" class="!w-5 !h-5" />
        </div>
        <div v-if="attendanceStore.myAttendanceSummaryLoading">
          <base-spinner  rootClasses="!w-6 !h-6" />
        </div>
        <div v-else class="text-xl font-semibold text-greyscale-900">
            {{ t(props.data.title) }}
        </div>
        <!-- warning icon -->
        <div  
          class="z-[0] absolute top-[-2px] right-[-2px]"
          v-if="props.data.toolTipInfo.placement == 'left'"
          v-tooltip.left="toolTipFun(props.data.toolTipInfo)"
          >
          <base-iconify
            :icon="InfoCircleBoldIcon" class="!w-6 !h-6 text-greyscale-200"
          />
        </div>
        <div  
          class="z-[0] absolute top-[-2px] right-[-2px]"
          v-else
          v-tooltip.top="toolTipFun(props.data.toolTipInfo)"
          >
          <base-iconify
            :icon="InfoCircleBoldIcon" class="!w-6 !h-6 text-greyscale-200"
          />
        </div>
      </div>
      <!-- bottom -->
      <div class="text-sm font-medium text-greyscale-900">
          {{ t(props.data.description) }}
      </div>
    </div>
</template>
<style scoped>
 .shadow {
    box-shadow: 0px 2px 4px 0px rgba(47, 61, 87, 0.03), 0px 1px 1px 0px rgba(95, 110, 169, 0.03);
 }

</style>