<script setup>
// Core
import {useI18n} from "vue-i18n"

const { t } = useI18n()
</script>

<template>
  <div class="flex flex-col rounded-xl border border-greyscale-100 py-[10px] px-3 bg-greyscale-50 mb-[6px] h-full gap-y-2">
    <div class="flex justify-between">
      <span class="text-sm font-semibold text-primary-900">{{ t('reports') }}</span>

      <div class="flex justify-center items-center border border-success-100 bg-success-50 text-xs font-semibold text-success-500 rounded-lg px-2 py-1">
        Done
      </div>
    </div>

    <span class="text-xs text-greyscale-500 font-medium">25.08.2024</span>
    <span class="text-xs text-primary-900 font-medium">Боситхонов Диёр Акмалович</span>
  </div>
</template>

<style scoped>

</style>
