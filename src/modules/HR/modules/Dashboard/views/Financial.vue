<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ChartBoldIcon, AlignVerticalSpacingBoldIcon } from '@/components/Icons'
import FinancialTable from '../components/FinancialTable.vue'
import FinancialChart from '../components/FinancialChart.vue'

const { t } = useI18n()
const tabIndex = ref(0)
</script>

<template>
  <div class="hr-dashboard-view flex flex-col flex-1">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl text-primary-900 font-bold">{{ t('financial-dashboard') }}</h1>

      <div class="flex items-center rounded-full border border-greyscale-200">
        <div
          class="flex items-center gap-2 bg-transparent rounded-full cursor-pointer py-3 px-4"
          :class="{ 'bg-white shadow-button' : tabIndex === 0 }"
          @click="tabIndex = 0"
        >
          <base-iconify
            :icon="ChartBoldIcon"
            class="text-greyscale-500"
            :class="{ 'text-primary-500' : tabIndex === 0 }"
          />

          <span
            class="font-medium text-sm text-greyscale-500"
            :class="{ 'text-greyscale-900' : tabIndex === 0 }"
          >
            График
          </span>
        </div>

        <div
          class="flex items-center gap-2 bg-transparent rounded-full cursor-pointer py-3 px-4"
          :class="{ 'bg-white shadow-button' : tabIndex === 1 }"
          @click="tabIndex = 1"
        >
          <base-iconify
            :icon="AlignVerticalSpacingBoldIcon"
            class="text-greyscale-500"
            :class="{ 'text-primary-500' : tabIndex === 1 }"
          />

          <span
            class="font-medium text-sm text-greyscale-500"
            :class="{ 'text-greyscale-900' : tabIndex === 1 }"
          >
            Таблица
          </span>
        </div>
      </div>
    </div>

    <template v-if="tabIndex === 0">
      <financial-chart />
    </template>

    <template v-else>
      <financial-table />
    </template>
  </div>
</template>

<style scoped>

</style>
