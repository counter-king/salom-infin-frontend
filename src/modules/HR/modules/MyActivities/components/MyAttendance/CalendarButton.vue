<script setup>
// core
import { useI18n } from 'vue-i18n';
import { ref, unref } from 'vue';
// components
import { AltArrowLeftIcon, AltArrowRightIcon, CheckCircleBoldIcon } from '@/components/Icons';
import BaseOverlayPanel from '@/components/UI/BaseOverlayPanel.vue';
// utils
import { formatMonthAndYear } from '@/utils/formatDate';
// enums
import { MONTH_NAMES } from '@/enums';

const { t, locale } = useI18n()
// props
const props = defineProps({
  date: {
    type: [String, Date],
    default: ()=> new Date()
  },
  onRightArrowClick:  {
    type: Function,
    default: () => {}
  },
  onLeftArrowClick: {
    type: Function,
    default: () => {}
  }
})
// reactives
const refOverPanel = ref(null)
const selectedMonth = ref(null)
const selectedYear = ref(null)
// emit
const emit = defineEmits(['click:submit'])
// methods
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

const toggle = (event) => {
  selectedMonth.value = null
  selectedYear.value = null
  const _refOverPanel = unref(refOverPanel)
  _refOverPanel.opRef.toggle(event)
}

const YEARS = Array.from(
  { length: new Date().getFullYear() - 2021 + 1 },
  (_, i) => 2021 + i
)

const handleClickSubmit = () => {
  const date = new Date(selectedYear.value, selectedMonth.value?.id - 1, 1);
  // "2025-03-01T00:00:00.000Z"
  const isoDate = date.toISOString(); 
  emit('click:submit', {
    date: isoDate,
    month: selectedMonth.value,
    year: selectedYear.value
  })

  toggle();
}

</script>
<template>
  <div class="flex items-center">
    <div
      class="flex items-center justify-center p-[10px] bg-white rounded-l-[80px] cursor-pointer hover:text-primary-500 "
      @click="props.onLeftArrowClick"
      v-tooltip.top="toolTipFun('prev-month')"
    >
      <base-iconify :icon="AltArrowLeftIcon" class="!w-5 !h-5" />
    </div>
    <div 
      class="min-w-[136px] capitalize select-none flex items-center justify-center px-2 border-r border-l cursor-pointer border-greyscale-200 text-base font-medium text-greyscale-500 bg-white self-stretch"
      @click="toggle"
      >
       {{ formatMonthAndYear(props.date) }}
    </div>
    <div
      class="flex items-center justify-center p-[10px] bg-white rounded-r-[80px] cursor-pointer hover:text-primary-500 "
      @click="props.onRightArrowClick"
      v-tooltip.top="toolTipFun('next-month')"
    >
        <base-iconify :icon="AltArrowRightIcon" class="!w-5 !h-5" />
    </div>
  </div>
  <base-overlay-panel
    ref="refOverPanel"
    width="w-[416px]"
    menu-class="bg-white mt-1 overflow-hidden"
  >
    <template #header>
      <div class="flex items-center justify-between h-14 px-4">
        <span class="text-base font-semibold text-greyscale-900">{{ t('select-date') }}</span>
      </div>
    </template>
    <div class="flex ">
      <!-- months -->
      <div class="flex flex-col gap-[1px] flex-1 p-1 overflow-y-auto h-[224px]">
        <template v-for="month in MONTH_NAMES" :key="month.id">
          <div 
            class="flex items-center justify-between px-4 py-[10px] hover:bg-greyscale-50 rounded-lg cursor-pointer"
            :class="{'bg-greyscale-50': selectedMonth?.id === month.id }"
            @click="selectedMonth = month"
          >
            <span class="text-xs font-medium text-greyscale-900">{{ month[locale] }}</span>
            <base-iconify v-show="selectedMonth?.id == month.id" :icon="CheckCircleBoldIcon" class="!w-4 !h-4 text-primary-500" />
          </div>
        </template>
      </div>
      <!-- divider -->
      <!-- <div class="border greyscale-200"></div> -->
      <!-- years -->
      <div class="flex flex-col gap-[1px] flex-1 p-1 overflow-y-auto h-[224px]">
        <template v-for="year in YEARS" :key="year">
          <div 
            class="flex items-center justify-between px-4 py-[10px] hover:bg-greyscale-50 rounded-lg cursor-pointer"
            :class="{'bg-greyscale-50': selectedYear == year }"
            @click="selectedYear = year"
          >
            <span class="text-xs font-medium text-greyscale-900">{{ year }}</span>
            <base-iconify v-show="selectedYear == year" :icon="CheckCircleBoldIcon" class="!w-4 !h-4 text-primary-500" />
          </div>
        </template>
      </div>
    </div>
    <template #actions>
      <div class="flex justify-end items-center h-14">
        <base-button
          :disabled="!selectedMonth && !selectedYear"
          border-color="border-transparent"
          label="select"
          :rounded="true"
          shadow
          type="button"
          @click="handleClickSubmit"
        />
      </div>
    </template>
  </base-overlay-panel>

</template>