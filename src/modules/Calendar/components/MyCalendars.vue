<script setup>
// Core
import { useI18n } from 'vue-i18n'
// Components
import { CheckCircleBoldIcon } from '@/components/Icons'
// Composable
const { t } =useI18n()
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-1">
      <h1 class="text-lg font-semibold text-primary-900">{{ t('my-calendars') }}</h1>

      <span></span>
    </div>

    <ul>
      <li class="flex items-center gap-2 hover:bg-greyscale-50 cursor-pointer rounded-lg py-[10px] px-3">
        <base-iconify :icon="CheckCircleBoldIcon" class="text-primary-500" />
        <span class="text-sm font-medium text-primary-900">{{ t('events') }}</span>
      </li>

      <li class="flex items-center gap-2 hover:bg-greyscale-50 cursor-pointer rounded-lg py-[10px] px-3">
        <base-iconify :icon="CheckCircleBoldIcon" class="text-primary-500" />
        <span class="text-sm font-medium text-primary-900">{{ t('tasks') }}</span>
      </li>
    </ul>
  </div>
</template>
