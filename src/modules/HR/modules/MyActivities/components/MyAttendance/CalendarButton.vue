<script setup>
// core
import { useI18n } from 'vue-i18n';
// components
import { AltArrowLeftIcon, AltArrowRightIcon } from '@/components/Icons';
import BaseOverlayPanel from '@/components/UI/BaseOverlayPanel.vue';

const { t } = useI18n()
// methods
const onLeftArrowClick = () => {
  console.log("ishla")
}
const onRightArrowClick = () => {
  console.log("ishla")
}
const toolTipFun = (value) => {
  return {
      value: `${t(value)}`,
      pt: {
          arrow: {
              class: '!text-greyscale-900'
          },
          text: '!px-3 !py-2 !rounded-[12px] !bg-greyscale-900 !text-white !text-sm' 
      },
      escape: true,
      autoHide: false
  }
}

const handleCalendarClick = (event) => {}

</script>
<template>
  <div class="flex items-center">
    <div
      class="flex items-center justify-center p-[10px] bg-white rounded-l-[80px] cursor-pointer hover:text-primary-500 "
      @click="onLeftArrowClick"
      v-tooltip.top="toolTipFun('prev-month')"
    >
      <base-iconify :icon="AltArrowLeftIcon" class="!w-5 !h-5" />
    </div>
    <div 
      class="min-w-[136px] select-none flex items-center justify-center px-2 border-r border-l cursor-pointer border-greyscale-200 text-base font-medium text-greyscale-500 bg-white self-stretch"
      @click="handleCalendarClick"
      >
        Апрель, 2025
    </div>
    <div
      class="flex items-center justify-center p-[10px] bg-white rounded-r-[80px] cursor-pointer hover:text-primary-500 "
      @click="onRightArrowClick"
      v-tooltip.top="toolTipFun('next-month')"
    >
        <base-iconify :icon="AltArrowRightIcon" class="!w-5 !h-5" />
    </div>
  </div>

</template>