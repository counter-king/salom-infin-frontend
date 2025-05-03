<script setup>
// core
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
// components
import { ActionToolbar } from '@/components/Actions';
import ToggleButton from './ToggleButton.vue';
import { AltArrowLeftIcon, AltArrowRightIcon, FileDownloadIcon } from '@/components/Icons';
import BaseButton from '@/components/UI/BaseButton.vue';

const { t } = useI18n()
// reactive
const selectedTabView = ref('calendar')
// methods
const onSelectedTabViewChange = (view) => {
  selectedTabView.value = view
}

const controlPagination = [
    {
        icon: AltArrowLeftIcon,
        action: () => {
            console.log("ishla")
        }
    },
    {
        icon: AltArrowRightIcon,
        action: () => {
            console.log("ishla")
        }
    }

]

</script>           
<template>
    <action-toolbar :title="t('my-attendance')">
    <template #title-after>
      <ToggleButton @update:selectedTabView="onSelectedTabViewChange" />
    </template>
    <template #filters>
      <div class="flex items-center gap-2">
        <div class="flex items-center gap-2">
            <div class="text-base font-medium text-greyscale-500 mr-1">
                Апрель, 2025
            </div>
            <div
                v-for="item in controlPagination"
                :key="item.icon"
                class="flex items-center justify-center p-[10px] bg-white rounded-full cursor-pointer hover:text-primary-500 "
                @click="item.action"
                v-tooltip.top="{
                    value: `${t('next-month')}`,
                    pt: {
                        arrow: {
                            class: '!text-greyscale-900'
                        },
                        text: '!px-3 !py-2 !rounded-[12px] !bg-greyscale-900 !text-white !text-sm' 
                    },
                }"
            >
                <base-iconify :icon="item.icon" class="!w-5 !h-5" />
            </div>
        </div>
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