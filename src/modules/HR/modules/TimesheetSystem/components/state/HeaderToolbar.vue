<script setup>
// core
import { ref, inject } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter, useRoute } from 'vue-router';
// components
import { ActionToolbar } from '@/components/Actions';
import ToggleButton from './ToggleButton.vue';
import { FileDownloadIcon, CalendarBoldIcon, FaceScanSquareBoldIcon } from '@/components/Icons';
import BaseButton from '@/components/UI/BaseButton.vue';
import CalendarButton from '@/components/Actions/CalendarButton.vue';

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
// injects
const currentDate = inject('currentDate')
const handleMonthChange = inject('handleMonthChange')
const goToPrevMonth = inject('goToPrevMonth')
const goToNextMonth = inject('goToNextMonth')
const handleClickCurrentMonth = inject('handleClickCurrentMonth')
// reactives
const activeTabView = ref(route.name == 'General' ? 1 : route.name == 'FaceId' ? 2 : 3)
const filterValue = ref('')
// methods
const onSelectedTabViewChange = (view) => {
  console.log("view", view);
  if(view == 1){
    router.push({ name: 'General' })
  } else if(view == 2){
    router.push({ name: 'FaceId' })
  } else {
    router.push({ name: 'HelloSQB' })
  }
}

const ToggleButtonList = [
  {
    name: 'general',
    icon: CalendarBoldIcon,
    value: 1
  },
  {
    name: 'faceId',
    icon: FaceScanSquareBoldIcon,
    value: 2
  },
  {
    name: 'helloSQB',
    icon: CalendarBoldIcon,
    value: 3
  }
]

// methods
const onMonthChange = (date) => {
  console.log("date", date);
  handleMonthChange(date)
  router.push({ query: {...router.currentRoute.value.query, month: date.date }})
}

</script>           
<template>
    <action-toolbar :title="t('state')">
    <template #title-after>
      <ToggleButton @emit:onChange="onSelectedTabViewChange" :list="ToggleButtonList" :active-tab-view="activeTabView">
        <template #helloSQB>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.915 4.33579C13.3174 3.35921 12.4864 2.54128 11.5 1.95985C10.4651 1.34999 9.25763 1 7.96726 1C6.67693 1 5.46943 1.34991 4.43462 1.95985C3.4481 2.54124 2.61717 3.35921 2.01953 4.33575C3.10492 4.71129 3.96639 5.55958 4.36355 6.62943C4.55827 6.10499 4.86402 5.63459 5.25239 5.247C5.94791 4.55273 6.9077 4.12339 7.96726 4.12339C9.02718 4.12339 9.98729 4.55299 10.6828 5.24761C11.0708 5.6351 11.3763 6.10514 11.5709 6.62912C11.969 5.55594 12.8313 4.7115 13.915 4.33579Z" fill="#9CA8B9"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.3312 9.83078C11.1563 10.1463 10.9384 10.4345 10.6855 10.6875C9.98989 11.383 9.02886 11.8132 7.96755 11.8132C6.90602 11.8132 5.94501 11.3829 5.24939 10.6872C4.55372 9.99161 4.12343 9.03051 4.12343 7.96907C4.12343 6.50128 3.17612 5.2098 1.77984 4.76172C1.54075 5.22187 1.3516 5.71143 1.21955 6.22331C1.07625 6.77869 1 7.36365 1 7.96907C1 9.89307 1.77988 11.635 3.04075 12.8959C4.30161 14.1567 6.0435 14.9366 7.96755 14.9366C8.87983 14.9366 9.74486 14.5726 10.3818 13.9189C10.9725 13.3129 11.3357 12.4856 11.3322 11.5739L11.3312 9.83078Z" fill="#9CA8B9"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.9344 7.96903C14.9344 7.36362 14.8581 6.77865 14.7148 6.22327C14.5828 5.71143 14.3937 5.22183 14.1545 4.76172C12.764 5.20361 11.8134 6.50025 11.81 7.96025V11.5729C11.8141 12.6794 11.3389 13.7297 10.5073 14.4592C11.4239 14.1002 12.246 13.5526 12.9258 12.864C14.1677 11.606 14.9344 9.87734 14.9344 7.96903Z" fill="#9CA8B9"/>
          </svg>
        </template>
      </ToggleButton>
    </template>
    <template #filters>
      <div class="flex items-center gap-2">
        <base-dropdown
          v-model="filterValue"
          :options="[{title: t('all'), value: 'all'}]"
          option-label="title"
          option-value="value"
          :placeholder="t('all')"
          class="w-[341px] max-w-[341px]"
          root-class="bg-white"
          size="small"
          input-class="!text-xs !p-3"
        />
        <calendar-button 
          :date="currentDate"
          @click:submit="onMonthChange"
          :onRightArrowClick="goToNextMonth"
          :onLeftArrowClick="goToPrevMonth"
        />
        <base-button 
          label="current-month"
          rounded
          border-color="border-transparent"
          size="large"
          shadow
          class="bg-white text-primary-900 font-medium text-xs hover:bg-greyscale-100"
          @click="handleClickCurrentMonth"
        >
        </base-button>
        <base-button 
          label="export"
          rounded
          border-color="border-transparent"
          class="bg-white text-primary-900 font-medium text-xs hover:bg-greyscale-100"
          shadow
          icon-color="text-greyscale-500"
          :icon-left="FileDownloadIcon"
        >
        </base-button>
      </div>
    </template>
    </action-toolbar>
</template>