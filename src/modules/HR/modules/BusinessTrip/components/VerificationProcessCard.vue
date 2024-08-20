<script setup>
// Components
import {ArrowLeftDownIcon, ArrowRightUpIcon} from "@/components/Icons"

const props = defineProps({
  item: {
    type: Object
  }
})
</script>

<template>
  <div class="flex flex-col rounded-xl border border-greyscale-100 py-[10px] px-3 bg-greyscale-50 mb-[6px] gap-y-2">
      <span class="text-primary-900 text-sm font-semibold">
        Юнусабадский филиал банка
      </span>

      <div class="flex items-center gap-x-[6px]">
        <div class="flex items-center bg-success-100 py-[2px] pr-2 pl-[3px] gap-x-1 rounded-xl">
          <div class="flex justify-center items-center w-[18px] h-[18px] bg-white rounded-full shadow">
            <base-iconify
              :icon="ArrowLeftDownIcon"
              class="text-success-500 !w-3 !h-3"
            />
          </div>

          <span class="text-success-500 text-xs font-medium">Прибыл</span>
        </div>

        <div class="w-1 h-1 bg-greyscale-300 rounded-full"></div>

        <span class="text-xs font-medium text-greyscale-500">13.08.2024 16:35</span>
      </div>

      <div class="flex items-center gap-x-[6px]">
        <div class="flex items-center bg-critic-30 py-[2px] pr-2 pl-[3px] gap-x-1 rounded-xl">
          <div class="flex justify-center items-center w-[18px] h-[18px] bg-white rounded-full shadow">
            <base-iconify
              :icon="ArrowRightUpIcon"
              class="text-critic-500 !w-3 !h-3"
            />
          </div>

          <span class="text-critic-500 text-xs font-medium">Убыл</span>
        </div>

        <div class="w-1 h-1 bg-greyscale-300 rounded-full"></div>

        <span class="text-xs font-medium text-greyscale-500">13.08.2024 16:35</span>
      </div>

      <span class="text-xs font-medium text-primary-900">Боситхонов Диёр Акмалович</span>
    </div>
</template>

<style scoped>

</style>
