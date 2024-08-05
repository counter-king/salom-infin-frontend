<script setup>
// Core
import { ref } from 'vue'
// Utils
import { formatNumberWithFloat } from '@/utils'
// Reactive
const series = ref([{
  name: 'Desktops',
  data: [1e6, 2e6, 3e6, 4e6, 5e6, 6e6, 7e6, 8e6, 9e6, 10e6, 11e6, 11200000]
}])
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
      formatter: (value) => { return `${value / 1e6} млн` },
    }
  }
})
</script>

<template>
  <div class="salary-chart-view bg-white shadow-button rounded-xl pt-4 pb-3 px-5">
    <div class="-mx-1">
      <apexchart type="line" height="275" :options="options" :series="series"></apexchart>
    </div>
  </div>
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
