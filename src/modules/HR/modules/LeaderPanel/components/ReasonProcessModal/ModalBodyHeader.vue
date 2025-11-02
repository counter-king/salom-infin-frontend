<script setup>
// core
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
// components
import { AlarmBoldIcon } from '@/components/Icons';
import ReasonCard from './ReasonCard.vue';
// utils
import { formatSecondsToHoursMinutes } from '@/utils';
import { formatHour } from '@/utils/formatDate';
// enums
import { CHECK_IN_STATUS, CHECK_OUT_STATUS } from '@/modules/HR/modules/MyActivities/enums';
// composable
const { t, locale } = useI18n()

// props
const props = defineProps({
  data: {
    type: Object,
  },
})


// reactives
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

const isWorkedTimeLessThan8Hours = computed(() => props.data?.attendance?.worked_seconds / 60 / 60 > 8 ? true : false )
const workedTime = computed(() => formatSecondsToHoursMinutes(props.data?.attendance?.worked_seconds))
const prsentageOfWorkedTime = computed(() => props.data?.attendance?.worked_seconds / 60 / 60 / 8 * 100)

const toolTipFun = () => {
  return {
    value: `<div class="flex flex-col gap-1">
              <p class="text-sm text-white">${ workedTime.value }</p>
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
        <div class="text-xl font-semibold text-greyscale-900">{{ workedTime }}</div>
      </template>
      <template #description>
        <div 
          v-tooltip.top="toolTipFun()"
          class="h-1 w-full bg-greyscale-70 rounded-full overflow-hidden">
          <div 
            class="h-1 w-full rounded-full"
            :class="{'bg-warning-500': !isWorkedTimeLessThan8Hours,'w-[100%] bg-success-500': isWorkedTimeLessThan8Hours}"
            :style="{width: `${prsentageOfWorkedTime}%`}"
            >
            </div>
        </div>
      </template>
    </ReasonCard>
    <ReasonCard :data="reasonData2">
      <template #title>
        <div class="text-xl font-semibold text-greyscale-900">
          <span 
            :class="{'text-critic-500': props.data?.attendance?.check_in_status == CHECK_IN_STATUS.LATE_ARRIVAL}"
            >{{ formatHour(props.data?.attendance?.first_check_in) }}</span>
          <span class=""> - </span>
          <span :class="{'text-critic-500': props.data?.attendance?.check_out_status == CHECK_OUT_STATUS.EARLY_DEPARTURE}">{{ formatHour(props.data?.attendance?.last_check_out) }}</span>
        </div>  
      </template>
      <template #description>
        <div class="text-sm text-greyscale-900">{{t('my-arrival-and-departure-time')}}</div>
        </template>
    </ReasonCard>
    
  </div>
  <!-- <pre>{{ props.data }}</pre> -->


</template>