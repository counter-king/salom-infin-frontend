<script setup>
// core
import { useI18n } from 'vue-i18n';
// components
import { InfoCircleBoldIcon } from '@/components/Icons';
const { t } = useI18n()
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
    <div class="shadow w-full flex flex-col justify-between min-h-[96px] gap-3 p-4 border border-greyscale-90  cursor-pointer rounded-[20px] bg-white">
      <!-- top -->
      <div class="flex items-center gap-3 relative overflow-visible">
        <!-- icon wrapper -->
        <div 
          class="w-8 h-8 min-w-8 min-h-8 rounded-full flex items-center justify-center"
          :class="props.data?.iconClass"
          >
          <base-iconify :icon="props.data?.icon" class="!w-5 !h-5" />
        </div>
        <slot name="title">
          <div class="text-xl font-semibold text-greyscale-900">
              {{ t(props.data?.title) }}
          </div>
        </slot>
        <!-- warning icon -->
        <div  
          class="z-[0] absolute top-[-2px] right-[-2px]"
          v-if="props.data?.toolTipInfo?.placement == 'left'"
          v-tooltip.left="toolTipFun(props.data?.toolTipInfo)"
          >
          <base-iconify
            :icon="InfoCircleBoldIcon" class="!w-6 !h-6 text-greyscale-200"
          />
        </div>
        <div  
          class="z-[0] absolute top-[-2px] right-[-2px]"
          v-else
          v-tooltip.top="toolTipFun(props.data?.toolTipInfo)"
          >
          <base-iconify
            :icon="InfoCircleBoldIcon" class="!w-6 !h-6 text-greyscale-200"
          />
        </div>
      </div>
      <!-- bottom -->
      <slot name="description">
        <div class="text-sm font-semibold text-greyscale-900">
          {{ t(props.data?.description) }}
        </div>
      </slot>
    </div>
</template>
<style scoped>
 .shadow {
    box-shadow: 0px 2px 4px 0px rgba(47, 61, 87, 0.03), 0px 1px 1px 0px rgba(95, 110, 169, 0.03);
 }

</style>