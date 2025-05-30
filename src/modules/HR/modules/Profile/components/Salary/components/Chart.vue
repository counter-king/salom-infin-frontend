<script setup>
// Core
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
// Components
import { ActionToolbar, ExportButton } from '@/components/Actions'
import Empty from '@/components/Empty.vue'
// Stores
import { useSalaryStore } from '../../../stores/salary.store'
// Utils
import { formatNumberWithFloat } from '@/utils'
import { formatDateMonth } from '@/utils/formatDate'
// Composable
const { locale } = useI18n()
const salaryStore = useSalaryStore()
// Reactive
const date = ref(new Date().getFullYear().toString())
const month = ref(new Date().getMonth())
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
    labels: {
      show: false,
    }
  },
  yaxis: {
    labels: {
      formatter: (value) => {
        return String(parseInt(value)).length <= 9 ? `${value / 1e6} млн` : `${value / 1e9} млрд`
      },
    }
  }
})
// Watch
watch(
  () => salaryStore.isLoggedIn,
  async () => {
    salaryStore.isLoggedIn && await salaryStore.getSalaryStatistic()
    await handleYearMonth(new Date().getMonth())
  }
)
// Methods
const dateSelect = async () => {
  date.value = new Date(date.value).getFullYear().toString()
  await salaryStore.getSalaryStatistic(date.value)
  await handleYearMonth(new Date().getMonth())
}
const clear = () => {
  date.value = new Date().getFullYear().toString()
  salaryStore.getSalaryStatistic()
  handleYearMonth(new Date().getMonth())
}
const handleYearMonth = async (index) => {
  month.value = index
  await salaryStore.getSalary(new Date(parseInt(date.value), month.value, 1))
}
</script>

<template>
  <action-toolbar title="Годовая статистика зарплаты">
    <template #filters>
<!--      <export-button root-class="!bg-greyscale-50 !border !border-greyscale-70 !shadow-none" />-->

      <base-calendar-button
        v-model="date"
        view="year"
        date-format="yyyy"
        root-class="!bg-greyscale-50 !border !border-greyscale-70 !shadow-none"
        @emit:date-select="dateSelect"
        @emit:clear="clear"
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
      <div class="salary-chart-view bg-primary-10 rounded-2xl pt-4 pb-3 px-3">
        <div class="-mx-1">
          <apexchart
            :options="options"
            :series="salaryStore.salarySeries"
            type="line"
            height="275"
          ></apexchart>

          <div class="flex gap-6 -mx-2 pb-1 px-6">
            <template v-for="(_, index) in date === (new Date().getFullYear()).toString() ? new Date().getMonth() : 12">
              <div class="flex justify-center flex-1">
                <button
                  class="flex justify-center items-center h-7 bg-greyscale-70 text-sm text-greyscale-900 capitalize font-medium rounded-full px-3"
                  :class="{ 'bg-primary-500 text-white': date === (new Date().getFullYear()).toString() && month === index }"
                  @click="handleYearMonth(index)"
                >
                  {{ formatDateMonth(new Date().setMonth(index), locale, index) }}
                </button>
              </div>
            </template>
          </div>
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
