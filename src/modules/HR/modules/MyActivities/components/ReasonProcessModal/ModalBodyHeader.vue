<script setup>
// core
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
// components
import { AlarmBoldIcon } from '@/components/Icons';
import ReasonCard from './ReasonCard.vue';
// composable
const { t } = useI18n()

const reasonData1 = ref({
    title: 'title',
		icon: AlarmBoldIcon,
		iconClass: "bg-primary-300 text-white",
    description: 'description',
    toolTipInfo: {
        value: 'my-worked-time-per-day'
    }
})
const reasonData2 = ref({
    title: 'title',
		icon: AlarmBoldIcon,
		iconClass: "bg-primary-300 text-white",
    description: 'description',
    toolTipInfo: {
        value: 'my-arrival-and-departure-time'
    }
})

const toolTipFun = () => {
  return {
    value: `<div class="flex flex-col gap-1">
              <p class="text-sm text-white">6 ч.</p>
            </div>`,
    pt: {
      arrow: {
        class: '!text-greyscale-900 !bottom-[4px]'
      },
      text: '!px-3 !py-2 !rounded-[12px] !bg-greyscale-900 !text-white !text-sm !w-max relative top-[-4px] !w-fit',
    },
    escape: true,
    autoHide: false
  }
}

</script>
<template>
  <div class="flex gap-5">
    <ReasonCard :data="reasonData1">
      <template #title>
        <div class="text-xl font-semibold text-greyscale-900">6 ч. 35 м.</div>
      </template>
      <template #description>
        <div 
          v-tooltip.top="toolTipFun()"
          class="h-1 w-full bg-greyscale-70 rounded-full overflow-hidden">
          <div 
            class="h-1 w-full rounded-full"
            :class="{'w-[60%] bg-warning-500': false,'w-[100%] bg-success-500': true}">
            </div>
        </div>
      </template>
    </ReasonCard>
    <ReasonCard :data="reasonData2">
      <template #title>
        <div class="text-xl font-semibold text-greyscale-900">
          <span 
            :class="{'text-critic-500': true}"
            >09:37</span>
          <span class=""> - </span>
          <span :class="{'text-critic-500': false}">18:45</span>
        </div>
      </template>
      <template #description>
        <div class="text-sm text-greyscale-900">{{t('my-arrival-and-departure-time')}}</div>
        </template>
    </ReasonCard>
  </div>

</template>