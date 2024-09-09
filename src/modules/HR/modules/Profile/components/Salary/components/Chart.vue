<script setup>
// Core
import { ref, watch } from 'vue'
// Components
import { ActionToolbar, ExportButton } from '@/components/Actions'
import Empty from '@/components/Empty.vue'
// Stores
import { useSalaryStore } from '../../../stores/salary.store'
// Utils
import { formatNumberWithFloat } from '@/utils'
// Composable
const salaryStore = useSalaryStore()
// Watch
watch(
  () => salaryStore.isLoggedIn,
  async () => salaryStore.isLoggedIn && await salaryStore.getSalaryStatistic()
)
// Reactive
const options = ref({
  chart: {
    height: 275,
    type: 'line',
    zoom: {
      enabled: false
    }
  },
  dataLabels: {
    enabled: false
  },
  title: {
    text: 'Статистика',
    align: 'left',
    style: {
      fontSize: '16px',
      fontFamily: 'SFProDisplay-Semibold',
      color: '#191F3F'
    }
  },
  stroke: {
    curve: 'straight',
    lineCap: 'round',
    colors: ['#635AFF'],
    width: 4
  },
  grid: {
    borderColor: '#E2E8F0',
    strokeDashArray: 10,
    row: {
      colors: ['transparent', 'transparent'],
      opacity: 1
    },
  },
  markers: {
    size: 6,
    strokeWidth: 3,
    colors: '#635AFF',
    hover: {
      size: 10,
      sizeOffset: 10
    }
  },
  tooltip: {
    custom({ series, seriesIndex, dataPointIndex, w }) {
      return `<div class="min-w-[110px] bg-primary-900 rounded-lg text-white text-center py-[6px] px-2">
        <span class=" opacity-80">${w.globals.categoryLabels[dataPointIndex]}</span>
        <div class="flex gap-1 justify-center text-sm">
          <span class="font-medium">${ formatNumberWithFloat(series[seriesIndex][dataPointIndex])}</span>
          <span class="font-regular">сум</span>
        </div>
      </div>`
    }
  },
  xaxis: {
    categories: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь ', 'Ноябрь', 'Декабрь'],
  },
  yaxis: {
    labels: {
      formatter: (value) => {
        return String(parseInt(value)).length <= 9 ? `${value / 1e6} млн` : `${value / 1e9} млрд`
      },
    }
  }
})
// Methods
const dateSelect = async (value) => {
  const [_, __, year] = value.split('.')
  await salaryStore.getSalaryStatistic(year)
}
</script>

<template>
  <action-toolbar title="Годовая статистика зарплаты">
    <template #filters>
      <export-button root-class="!bg-greyscale-50 !border !border-greyscale-70 !shadow-none" />

      <base-calendar-button
        view="year"
        date-format="yyyy"
        root-class="!bg-greyscale-50 !border !border-greyscale-70 !shadow-none"
        @emit:date-select="dateSelect"
      />
    </template>
  </action-toolbar>

  <template v-if="!salaryStore.isLoggedIn">
    <empty class="h-[calc(100vh-655px)]" />
  </template>

  <template v-else-if="salaryStore.statisticContentLoading">
    <div
      class="flex items-center justify-center bg-primary-10 rounded-2xl"
      style="height: calc(100vh - 655px)"
    >
      <base-spinner content />
    </div>
  </template>

  <template v-else>
    <template v-if="!salaryStore.salarySeries[0].data.length">
      <empty title="На этот год зарплата не найдено" class="h-[calc(100vh-655px)]" />
    </template>

    <template v-else>
      <div class="salary-chart-view bg-primary-10 rounded-2xl pt-4 pb-3 px-5">
        <div class="-mx-1">
          <apexchart
            :options="options"
            :series="salaryStore.salarySeries"
            type="line"
            height="275"
          ></apexchart>
        </div>
      </div>
    </template>
  </template>
</template>

<style>
.apexcharts-title-text {
  transform: translateX(3px);
}
.apexcharts-text {
  font-family: 'SFProDisplay-Medium', serif !important;
  font-size: 12px;
  color: #767994;
}
.apexcharts-toolbar,
.apexcharts-xaxis-tick,
.apexcharts-xaxistooltip {
  display: none !important;
}
.apexcharts-grid-borders > line:last-child {
  display: none;
}
</style>
