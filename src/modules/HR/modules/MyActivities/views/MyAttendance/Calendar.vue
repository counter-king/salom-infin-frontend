<script setup>
// core
import { computed, ref, inject} from 'vue';
import { useI18n } from 'vue-i18n';
// enums
import { WEEK_DAYS_RU, WEEK_DAYS_UZ } from '../../enums';
import { MONTH_NAMES } from '@/enums';
// constants
import { LeaveTypes } from '../../constants';

const { t, locale } = useI18n()
// reactives
const weekDays = computed(() => locale.value === 'ru' ? WEEK_DAYS_RU : WEEK_DAYS_UZ)
// injects
const calendarDays = inject('calendarDays')

// methods
const getCellMergeRangeClass = (status,index) => {
  const data1 = [{status: 1},{status: 1},{status: 1},{status:1, exception:true },{status: 1, exception:true },{status: 1},{status: 1},{status: 1},{status: 1}]
  const data2 = [{status: 1},{status: 1},{status: 2},{status: 1},{status: 2},{status: 1},{status: 1},{status: 1}]
  if(index == 2) return ['w-[calc(200%+20px)] left-[calc(50%+20px)] bg-info-100 border-info-200']
  if(index == 3) return ['w-[calc(200%+20px)] left-[calc(50%+20px)] bg-critic-30 border-critic-50']
  if(index == 4) return ['w-[calc(200%+20px)] left-[calc(50%+20px)] bg-warning-100 border-warning-200']
}

const getCellMergeRangeText = (index) => {
  return LeaveTypes[index]
}

const getToltipText = (value) => {
  if(value == '4') return { title: '23-24 Апрель, (2 день)', description: LeaveTypes[value] }
  else if(value == '2') return { title: '23-24 Апрель, (2 день)', description: LeaveTypes[value] }
  else if(value == '3') return { title: '23-24 Апрель, (2 день)', description: LeaveTypes[value] }
  else if(value == '1') return { title: '23-24 Апрель, (2 день)', description: LeaveTypes[value] }
}

const toolTipFun = (data) => {
  return {
    value: `<div class="flex flex-col gap-1">
              <p class="text-sm text-white">${ data?.title }</p>
              <p class="text-sm text-white">${ t(data?.description) }</p>
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
    <div class="flex flex-col bg-white  rounded-2xl overflow-hidden shadow-button mt-4">
        <!-- table header -->
        <div class="grid grid-cols-7">
          <template v-for="day in weekDays" :key="day">
            <div class="flex items-center justify-center p-4 h-[48px] text-sm font-medium text-greyscale-500 [&:not(:nth-child(7n))]:border-r border-greyscale-200">{{ day }}</div>
          </template>
        </div>
        <!-- table body -->
        <div class="grid grid-cols-7">
          <template v-for="(day, index) in calendarDays" :key="index">
            <!-- cell -->
            <div
              v-if="false"
              class="flex flex-col justify-between items-center p-4 h-[120px] border-t [&:not(:nth-child(7n))]:border-r border-greyscale-200"
            >
                <!-- number area -->
                <div 
                  class="text-base font-medium text-greyscale-900"
                  :class="{'!text-greyscale-400': index % 7 == 5 || index % 7 == 6 }"
                  >
                  {{ day.day }} 
                </div>
                <!-- info area line  -->
                <div 
                  v-if="index == 2"
                  v-tooltip.top="toolTipFun(getToltipText('1'))"
                  class="flex justify-center items-center py-[6px] px-2 relative h-[32px] cursor-pointer text-sm border-[2px] text-greyscale-900 font-medium rounded-lg" 
                  :class="getCellMergeRangeClass(status = 2, index)"
                >
                  {{ t(getCellMergeRangeText("1")) }}
                </div>
                <!-- hour -->
                <div v-else class="flex justify-center items-center py-[6px] px-[6px] rounded-lg bg-success-100 text-xs font-semibold text-greyscale-900">
                  8 ч.
                </div>
            </div>
            <div 
              v-else
              class="flex flex-col justify-between items-center p-4 h-[120px] border-t [&:not(:nth-child(7n))]:border-r text-critic-500"
            >
              123
            </div>
          </template>
        </div>
    </div>
</template>