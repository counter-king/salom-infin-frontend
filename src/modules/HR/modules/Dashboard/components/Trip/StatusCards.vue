<script setup>
import Card from '../Card.vue'
import { CheckListMinimalisticIcon, AlarmBoldIcon, MapPointBoldIcon, ClipboardCheckBoldIcon, Flag2BoldIcon } from '@/components/Icons'
</script>

<template>
  <div class="grid grid-cols-5 gap-2">
    <card class="!p-4">
      <div class="flex items-center gap-3">
        <div class="flex items-center justify-center w-8 h-8 bg-info-500 rounded-full">
          <base-iconify :icon="CheckListMinimalisticIcon" class="text-white" />
        </div>

        <h1 class="text-lg font-semibold text-greyscale-900">368</h1>
      </div>

      <h2 class="text-sm font-medium text-greyscale-900 mt-3">Всего</h2>
    </card>

    <card class="!p-4">
      <div class="flex items-center gap-3">
        <div class="flex items-center justify-center w-8 h-8 bg-warning-500 rounded-full">
          <base-iconify :icon="AlarmBoldIcon" class="text-white" />
        </div>

        <h1 class="text-lg font-semibold text-greyscale-900">25</h1>
      </div>

      <h2 class="text-sm font-medium text-greyscale-900 mt-3">Должен начаться</h2>
    </card>

    <card class="!p-4">
      <div class="flex items-center gap-3">
        <div class="flex items-center justify-center w-8 h-8 bg-critic-300 rounded-full">
          <base-iconify :icon="MapPointBoldIcon" class="text-white" />
        </div>

        <h1 class="text-lg font-semibold text-greyscale-900">64</h1>
      </div>

      <h2 class="text-sm font-medium text-greyscale-900 mt-3">На месте</h2>
    </card>

    <card class="!p-4">
      <div class="flex items-center gap-3">
        <div class="flex items-center justify-center w-8 h-8 bg-primary-400 rounded-full">
          <base-iconify :icon="ClipboardCheckBoldIcon" class="text-white" />
        </div>

        <h1 class="text-lg font-semibold text-greyscale-900">37</h1>
      </div>

      <h2 class="text-sm font-medium text-greyscale-900 mt-3">Отчёт</h2>
    </card>

    <card class="!p-4">
      <div class="flex items-center gap-3">
        <div class="flex items-center justify-center w-8 h-8 bg-[#2DB06A] rounded-full">
          <base-iconify :icon="Flag2BoldIcon" class="text-white" />
        </div>

        <h1 class="text-lg font-semibold text-greyscale-900">293</h1>
      </div>

      <h2 class="text-sm font-medium text-greyscale-900 mt-3">Завершена</h2>
    </card>
  </div>
</template>

<style scoped>

</style>
