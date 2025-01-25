<script setup>
// cores
import { LinkCircleBoldIcon } from '@/components/Icons';
import { useI18n } from 'vue-i18n';
// components
import FileItemLink from './FileItemLink.vue';
// utils
import { formatDateMonthWithDay } from '@/utils/formatDate';

const { t } = useI18n();
// props
const props = defineProps({
})

</script>
<template>
  <div class="flex flex-col gap-4 p-4 overflow-auto h-[260px]">
   <!-- data -->
    <div class="flex flex-col gap-1">
      <div class="pl-2 text-sm font-medium text-greyscale-500">{{ formatDateMonthWithDay('2025-01-12T00:03:18.155650+05:00') }}</div>
      <FileItemLink link="https://www.facebook.com/reel" :left-icon="{ name: LinkCircleBoldIcon, class: 'text-primary-500' }"/>
      <FileItemLink link="https://www.facebook.com/reel" :left-icon="{ name: LinkCircleBoldIcon, class: 'text-primary-500' }"/>
      <FileItemLink link="https://www.facebook.com/reel" :left-icon="{ name: LinkCircleBoldIcon, class: 'text-primary-500' }"/>
      <FileItemLink link="https://www.facebook.com/reel" :left-icon="{ name: LinkCircleBoldIcon, class: 'text-primary-500' }"/>
      <FileItemLink link="https://www.facebook.com/reel" :left-icon="{ name: LinkCircleBoldIcon, class: 'text-primary-500' }"/>
      <FileItemLink link="https://www.facebook.com/reel" :left-icon="{ name: LinkCircleBoldIcon, class: 'text-primary-500' }"/>
      <FileItemLink link="https://www.facebook.com/reel" :left-icon="{ name: LinkCircleBoldIcon, class: 'text-primary-500' }"/>
      <FileItemLink link="https://www.facebook.com/reel" :left-icon="{ name: LinkCircleBoldIcon, class: 'text-primary-500' }"/>
    </div>
  </div>
</template>