<script setup>
// cores
import { ChevronDown20SolidIcon, DownloadMinimalisticIcon, FileTextBoldIcon } from '@/components/Icons';
import { useI18n } from 'vue-i18n';
// components
import { COMPONENT_TYPES } from '../constatns';
import FileItem from './FileItem.vue';
// utils
import { formatDateMonthWithDay } from '@/utils/formatDate';

const { t } = useI18n();
// props
const props = defineProps({
  onClickFun: {
   type: Function
  }
})

</script>
<template>
  <div class="flex flex-col gap-4 p-4">
   <!-- control title -->
   <div class="flex items-center gap-3 pl-2">
     <div class="flex bg-greyscale-50 rounded-full p-1">
       <BaseIconify
        :icon="ChevronDown20SolidIcon"
        class="text-greyscale-500 !h-6 !w-6 transform rotate-90 cursor-pointer"
        @click="props.onClickFun(COMPONENT_TYPES.FILES)"
       />
     </div>
     <span class="text-base font-semibold text-greyscale-900 select-none">
      {{ t('documents') }}
     </span>
   </div>
   <!-- data -->
    <div class="flex flex-col gap-1">
      <div class="pl-2 text-sm font-medium text-greyscale-500">{{ formatDateMonthWithDay('2025-01-12T00:03:18.155650+05:00') }}</div>
      <FileItem :right-icon="{ name: DownloadMinimalisticIcon, class: 'text-greyscale-500'}" :left-icon="{ name: FileTextBoldIcon, class: 'text-warning-500' }"/>
      <FileItem :right-icon="{ name: DownloadMinimalisticIcon, class: 'text-greyscale-500'}" :left-icon="{ name: FileTextBoldIcon, class: 'text-warning-500' }"/>
      <FileItem :right-icon="{ name: DownloadMinimalisticIcon, class: 'text-greyscale-500'}" :left-icon="{ name: FileTextBoldIcon, class: 'text-warning-500' }"/>
      <FileItem :right-icon="{ name: DownloadMinimalisticIcon, class: 'text-greyscale-500'}" :left-icon="{ name: FileTextBoldIcon, class: 'text-warning-500' }"/>
    </div>
  </div>
</template>