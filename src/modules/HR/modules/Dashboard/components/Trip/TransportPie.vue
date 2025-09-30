<script setup>
import { ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHRDashboardStore } from '../../stores'
import Card from '../Card.vue'

const { t } = useI18n()
const dashboardStore = useHRDashboardStore()

const series = computed(() => {
  return Object.values(dashboardStore.byRoute.data)
})
const totalCount = computed(() => {
  return series.value.reduce((acc, val) => acc + val, 0)
})

const options = ref({
  chart: {
    type: 'donut',
    offsetX: -45,
  },
  dataLabels: {
    enabled: false
  },
  tooltip: {
    enabled: false
  },
  legend: {
    show: false,
  },
  fill: {
    colors: [
      '#29CD74',
      '#5EC1E7',
      '#ab7a84',
      '#FF7290',
    ],
  },
  stroke: {
    width: 6
  },
  plotOptions: {
    pie: {
      customScale: 1,
      donut: {
        size: '75%',
        labels: {
          show: true,
          value: {
            show: true,
            fontSize: '22px',
            fontFamily: 'SFProDisplay-Semibold',
            fontWeight: 600,
            color: '#191F3F',
            offsetY: 8,
          },
          total: {
            show: true,
            label: t('total'),
            fontSize: '18px',
            color: '#9CA8B9',
            fontFamily: 'SFProDisplay-Regular',
            showAlways: true
          }
        }
      },
      expandOnClick: false
    }
  }
})

onMounted(async () => {
  await dashboardStore.actionTripByRoute()
})
</script>

<template>
  <card>
    <h1 class="flex-1 font-semibold text-greyscale-900 mb-8">{{ t('hr-main-dashboard.transport') }}</h1>

    <template v-if="dashboardStore.byRoute.loader">
      <div class="h-[200px]">
        <base-spinner />
      </div>
    </template>

    <template v-else>
      <div class="flex items-center relative pb-2">
        <div class="max-w-[240px] w-full">
          <apexchart
            type="donut"
            :options="options"
            :series="series"
          ></apexchart>
        </div>

        <div class="flex-1 max-w-[275px] w-full absolute right-0 max-h-[200px] overflow-y-auto">
          <template v-for="item in Object.keys(dashboardStore.byRoute.data)">
            <div
              class="group flex items-center gap-2 font-medium text-greyscale-500 rounded-xl hover:bg-greyscale-50 cursor-pointer px-3 py-[6px]"
            >
              <div
                class="w-[10px] h-[10px] rounded"
                :style="{ backgroundColor: item === 'by_car' ? '#29CD74' : item === 'by_plane' ? '#5EC1E7' : item === 'by_train' ? '#ab7a84' : '#FF7290' }"
              ></div>

              <h1 class="flex-1 text-[13px] group-hover:text-greyscale-900">{{ item === 'by_train' ? t('train') : item === 'by_plane' ? t('airplane') : item === 'by_service_car' ? t('service-car') : t('taxi') }}</h1>

              <span class="text-greyscale-900 text-sm font-semibold">{{ dashboardStore.byRoute.data[item] }}</span>

              <span class="w-9 text-right text-sm group-hover:text-greyscale-900">
              {{ `${((dashboardStore.byRoute.data[item] / totalCount) * 100).toFixed(1)}%` }}
            </span>
            </div>
          </template>
        </div>
      </div>
    </template>
  </card>
</template>

<style scoped>

</style>
