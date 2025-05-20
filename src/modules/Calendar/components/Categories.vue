<script setup>
// Core
import { useI18n } from 'vue-i18n'
// Composable
const { t } =useI18n()
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-1">
      <h1 class="text-lg font-semibold text-primary-900">{{ t('category') }}</h1>

      <span></span>
    </div>

    <ul>
      <li class="flex items-center gap-2 hover:bg-greyscale-50 cursor-pointer rounded-lg py-[10px] px-3">
        <div class="bg-info-200 w-4 h-4 rounded-full"></div>
        <span class="text-sm font-medium text-primary-900">{{ t('events') }}</span>
      </li>

      <li class="flex items-center gap-2 hover:bg-greyscale-50 cursor-pointer rounded-lg py-[10px] px-3">
        <div class="bg-success-200 w-4 h-4 rounded-full"></div>
        <span class="text-sm font-medium text-primary-900">{{ t('my-tasks') }}</span>
      </li>
    </ul>
  </div>
</template>
