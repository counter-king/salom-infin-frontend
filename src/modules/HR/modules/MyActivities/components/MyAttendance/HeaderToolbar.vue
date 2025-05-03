<script setup>
// core
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
// components
import { ActionToolbar } from '@/components/Actions';
import ToggleButton from './ToggleButton.vue';
import { FileDownloadIcon } from '@/components/Icons';
import BaseButton from '@/components/UI/BaseButton.vue';
import CalendarButton from './CalendarButton.vue';

const { t } = useI18n()
// reactive
const selectedTabView = ref('calendar')
// methods
const onSelectedTabViewChange = (view) => {
  selectedTabView.value = view
}
</script>           
<template>
    <action-toolbar :title="t('my-attendance')">
    <template #title-after>
      <ToggleButton @update:selectedTabView="onSelectedTabViewChange" />
    </template>
    <template #filters>
      <div class="flex items-center gap-2">
        <calendar-button />
        <base-button 
          label="current-month"
          rounded
          border-color="border-transparent"
          size="large"
          shadow
          class="bg-white text-primary-900 font-medium text-xs hover:bg-greyscale-100"
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