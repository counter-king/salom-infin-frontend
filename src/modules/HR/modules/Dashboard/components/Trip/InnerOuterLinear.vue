<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHRDashboardStore } from '../../stores'
import { formatNumberWithFloat } from '@/utils'
import Card from '../Card.vue'

const { t } = useI18n()
const dashboardStore = useHRDashboardStore()

const options = ref({
  chart: {
    height: 275,
    type: 'line',
    zoom: {
      enabled: false
    },
    toolbar: {
      show: false
    }
  },
  dataLabels: {
    enabled: false
  },
  legend: {
    show: false
  },
  stroke: {
    curve: 'straight',
    lineCap: 'round',
    colors: ['#635AFF', '#FFA803'],
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
    colors: ['#635AFF', '#FFA803'],
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
          <span class="font-medium">${ series[seriesIndex][dataPointIndex]}</span>
          <!-- <span class="font-medium">${ formatNumberWithFloat(series[seriesIndex][dataPointIndex])}</span> -->
<!--          <span class="font-regular">сум</span>-->
        </div>
      </div>`
    }
  },
  xaxis: {
    categories: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь ', 'Ноябрь', 'Декабрь'],
    tooltip: {
      enabled: false
    }
  },
  yaxis: {
    labels: {
      formatter: (value) => {
        return value
        // return String(parseInt(value)).length <= 9 ? `${value / 1e6} млн` : `${value / 1e9} млрд`
      },
    }
  }
})

const series = computed(() => {
  const values = Object.values(dashboardStore.innerOuterChart.data)

  return [
    {
      data: values.map(item => item.local).slice(0, new Date().getMonth() + 1)
    }
    // {
    //   data: values.map(item => item.foreign).slice(0, new Date().getMonth() + 1)
    // }
  ]
})

onMounted(async () => {
  await dashboardStore.actionTripInnerOuterChart()
})
</script>

<template>
  <card>
    <div class="flex items-center gap-6">
      <h1 class="flex-1 font-semibold text-greyscale-900">{{ t('hr-trip-dashboard.inner') }}</h1>

      <div class="flex items-center gap-2">
        <div class="w-[10px] h-[10px] bg-primary-500 rounded"></div>
        <h1 class="text-[13px] font-medium text-greyscale-500">{{ t('hr-trip-dashboard.inner') }}</h1>
      </div>

<!--      <div class="flex items-center gap-2">-->
<!--        <div class="w-[10px] h-[10px] bg-warning-500 rounded"></div>-->
<!--        <h1 class="text-[13px] font-medium text-greyscale-500">{{ t('hr-trip-dashboard.outer') }}</h1>-->
<!--      </div>-->
    </div>

    <template v-if="dashboardStore.innerOuterChart.loader">
      <div class="h-[275px]">
        <base-spinner />
      </div>
    </template>

    <template v-else>
      <apexchart
        :options="options"
        :series="series"
        type="line"
        height="275"
        class="-mx-3"
      ></apexchart>
    </template>
  </card>
</template>

<style scoped>

</style>
