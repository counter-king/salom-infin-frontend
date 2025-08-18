<script setup>
import { StatusChip } from '@/components/Chips'
import { CalendarDateBoldDuotoneIcon, CheckCircleBoldDuotoneIcon, StopWatchBoldDuotoneIcon } from '@/components/Icons'
</script>

<template>
  <div class="card-item-view bg-white relative shadow-button rounded-[20px] p-6 !pb-5">
    <div class="pb-8">
      <div class="max-w-[325px] relative">
        <h1 class="text-lg font-medium text-greyscale-900 after:content-[''] after:absolute after:top-1 after:-left-6 after:w-1 after:h-full after:bg-primary-500 after:rounded-tr-md after:rounded-br-md mb-3">
          Тест на определение психологического состояния
        </h1>
      </div>

      <status-chip
        border
        circle
        :status="{ id: 13 }"
      >
        Психологический тест
      </status-chip>
    </div>

    <img
      src="/images/illustration/clock.svg"
      alt="Clock icon"
      class="absolute top-6 right-6"
    />

    <div class="border-t border-greyscale-200">
      <div class="flex items-center gap-3 pt-3">
        <div class="flex items-center gap-2">
          <base-iconify :icon="CalendarDateBoldDuotoneIcon" class="!w-6 !h-6 text-greyscale-400" />

          <span class="text-greyscale-500 font-medium">до 5 Апр. 2025</span>
        </div>

        <div class="w-1.5 h-1.5 bg-greyscale-200 rounded-full"></div>

        <div class="flex items-center gap-2">
          <base-iconify :icon="StopWatchBoldDuotoneIcon" class="!w-6 !h-6 text-greyscale-400" />

          <span class="text-greyscale-500 font-medium">20 мин.</span>
        </div>

        <div class="w-1.5 h-1.5 bg-greyscale-200 rounded-full"></div>

        <div class="flex items-center gap-2">
          <base-iconify :icon="CheckCircleBoldDuotoneIcon" class="!w-6 !h-6 text-greyscale-400" />

          <span class="text-greyscale-500 font-medium">15 вопрос</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
