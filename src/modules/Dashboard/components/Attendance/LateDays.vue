<script setup>
// Core
import { useI18n } from "vue-i18n"
// Components
import { CheckCircleBoldIcon, CloseCircleBoldIcon } from "@/components/Icons"

// Composable
const { t } = useI18n()
</script>

<template>
  <div class="late-days flex gap-x-4 h-full">
    <div class="flex flex-col w-[168px] gap-y-2 h-full">
      <div class="flex flex-col justify-between rounded-2xl p-4 border border-greyscale-90 h-1/2">
        <div class="text-sm font-medium text-greyscale-900">{{ t('excused') }}</div>
        <div class="flex items-center gap-x-3">
          <div class="w-8 h-8 rounded-full bg-[#2DB06A] flex items-center justify-center">
            <base-iconify :icon="CheckCircleBoldIcon" class="w-5 h-5 text-white"/>
          </div>
          <div class="text-[20px] text-greyscale-900 font-semibold">5</div>
        </div>
      </div>

      <div class="flex flex-col justify-between rounded-2xl p-4 border border-greyscale-90 h-1/2">
        <div class="text-sm font-medium text-greyscale-900">{{ t('unexcused') }}</div>
        <div class="flex items-center gap-x-3">
          <div class="w-8 h-8 rounded-full bg-critic-300 flex items-center justify-center">
            <base-iconify :icon="CloseCircleBoldIcon" class="w-5 h-5 text-white"/>
          </div>
          <div class="text-[20px] text-greyscale-900 font-semibold">3</div>
        </div>
      </div>
    </div>

    <div class="flex">

    </div>
  </div>
</template>

<style scoped>

</style>
