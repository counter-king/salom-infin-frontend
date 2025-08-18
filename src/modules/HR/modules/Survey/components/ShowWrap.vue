<script setup>
import { CheckCircleBoldDuotoneIcon, StopWatchBoldDuotoneIcon } from '@/components/Icons'
import { StatusChip } from '@/components/Chips'
</script>

<template>
  <div class="bg-white shadow-button rounded-2xl">
    <header class="flex items-center gap-6 py-8 px-12">
      <div class="max-w-[1055px] w-full">
        <h1 class="font-semibold text-2xl text-greyscale-900 mb-2">Тест на определение психологического состояния</h1>

        <status-chip
          border
          circle
          :status="{ id: 13 }"
        >
          Психологический тест
        </status-chip>
      </div>

      <div class="flex items-center justify-end flex-1 gap-6">
        <div>
          <h1 class="font-medium text-greyscale-400 mb-2">Завершение теста</h1>

          <div class="flex items-center gap-2.5">
            <base-iconify :icon="CheckCircleBoldDuotoneIcon" class="!w-7 !h-7 text-info-500" />

            <h1 class="text-3xl font-medium text-greyscale-900">35%</h1>
          </div>
        </div>

        <div class="w-[1px] h-12 bg-greyscale-200"></div>

        <div>
          <h1 class="font-medium text-greyscale-400 mb-2">Оставшееся время</h1>

          <div class="flex items-center gap-2.5">
            <base-iconify :icon="StopWatchBoldDuotoneIcon" class="!w-7 !h-7 text-warning-500" />

            <h1 class="text-3xl font-medium text-greyscale-900">09:25</h1>
          </div>
        </div>
      </div>
    </header>

    <div class="border-y border-y-greyscale-200 py-6 px-12">
      <ProgressBar
        :value="50"
        :show-value="false"
        :pt="{
          root: {
            class: 'h-2'
          },
          value: {
            class: 'bg-success-500'
          }
        }"
      ></ProgressBar>
    </div>

    <main>
      <div>
        <template v-for="item in 20">
          <h1 class="text-3xl">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis, fuga?</h1>
        </template>
      </div>
    </main>
  </div>
</template>

<style scoped>

</style>
