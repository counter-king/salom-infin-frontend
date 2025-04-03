<script setup>
// Core
import { useI18n } from "vue-i18n"
// Components
import { ArrowLeftDownIcon, ArrowRightUpIcon } from "@/components/Icons"
// Composable
const { t } = useI18n()
</script>

<template>
  <div class="flex flex-col rounded-xl border border-greyscale-100 py-[10px] px-3 bg-greyscale-50 mb-[6px] gap-y-2">
     <span class="text-greyscale-400 text-sm font-semibold">
        Офис / Регион
      </span>

    <div class="flex items-center gap-x-[6px]">
      <div class="flex items-center bg-greyscale-70 py-[2px] pr-2 pl-[3px] gap-x-1 rounded-xl">
        <div class="flex justify-center items-center w-[18px] h-[18px] bg-white rounded-full shadow">
          <base-iconify
            :icon="ArrowLeftDownIcon"
            class="text-greyscale-400 !w-3 !h-3"
          />
        </div>

        <span class="text-greyscale-400 text-xs font-medium">{{ t('arrived') }}</span>
      </div>

      <div class="w-1 h-1 bg-greyscale-300 rounded-full"></div>

      <span class="text-xs font-medium text-greyscale-400">Дата</span>

      <div class="w-1 h-1 bg-greyscale-300 rounded-full"></div>

      <span class="text-xs font-medium text-greyscale-400">{{ t('trip-place') }}</span>
    </div>

    <div class="flex items-center gap-x-[6px]">
      <div class="flex items-center bg-greyscale-70 py-[2px] pr-2 pl-[3px] gap-x-1 rounded-xl">
        <div class="flex justify-center items-center w-[18px] h-[18px] bg-white rounded-full shadow">
          <base-iconify
            :icon="ArrowRightUpIcon"
            class="text-greyscale-400 !w-3 !h-3"
          />
        </div>

        <span class="text-greyscale-400 text-xs font-medium">{{ t('left') }}</span>
      </div>

      <div class="w-1 h-1 bg-greyscale-300 rounded-full"></div>

      <span class="text-xs font-medium text-greyscale-400">Дата</span>

      <div class="w-1 h-1 bg-greyscale-300 rounded-full"></div>

      <span class="text-xs font-medium text-greyscale-400">Имя сотрудника</span>
    </div>
  </div>
</template>

<style scoped>

</style>
