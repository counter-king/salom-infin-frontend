<script setup>
import { ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHRDashboardStore } from '../../stores'
import Card from '../Card.vue'

const { t } = useI18n()
const dashboardStore = useHRDashboardStore()

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
      '#FF7290',
      '#FDC031',
      '#827BFF',
      '#FF72D5',
      '#635AFF',
      '#767994',
      '#63BA3D',
      '#FFC352',
      // '#11A5ED',
      // '#090F33'
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

const series = computed(() => {
  return dashboardStore.byLocations.data.map(item => item.count)
})

const totalCount = computed(() => {
  return series.value.reduce((acc, val) => acc + val, 0)
})

const conditionColors = (condition) => {
  switch (condition) {
    case 'Namangan':
      return '#29CD74'
    case 'Farg\'ona':
      return '#5EC1E7'
    case 'Andijon':
      return '#FF7290'
    case 'Toshkent':
      return '#FDC031'
    case 'Xorazm':
      return '#827BFF'
    case 'Sirdaryo':
      return '#FF72D5'
    case 'Qoraqalpogiston Respublikasi':
      return '#635AFF'
    case 'Samarqand':
      return '#767994'
    case 'Surxondaryo':
      return '#63BA3D'
    case 'Qashqadaryo':
      return '#FFC352'
  }
}

onMounted(async () => {
  await dashboardStore.actionByLocations()
})
</script>

<template>
  <card>
    <div class="flex gap-1 mb-6">
      <h1 class="flex-1 font-semibold text-greyscale-900">{{ t('hr-trip-dashboard.inner') }}</h1>

<!--      <div-->
<!--        class="cursor-pointer rounded-[6px] py-1 px-2"-->
<!--        :class="{-->
<!--          'bg-greyscale-50': tab === 'region'-->
<!--        }"-->
<!--        @click="tab = 'region'"-->
<!--      >-->
<!--        <span-->
<!--          class="text-[13px] font-medium text-greyscale-500 hover:text-primary-500"-->
<!--          :class="{-->
<!--            '!text-primary-500': tab === 'region'-->
<!--          }"-->
<!--        >-->
<!--          По регионам-->
<!--        </span>-->
<!--      </div>-->

<!--      <div-->
<!--        class="cursor-pointer rounded-[6px] py-1 px-2"-->
<!--        :class="{-->
<!--          'bg-greyscale-50': tab === 'branch'-->
<!--        }"-->
<!--        @click="tab = 'branch'"-->
<!--      >-->
<!--        <span-->
<!--          class="text-[13px] font-medium text-greyscale-500 hover:text-primary-500"-->
<!--          :class="{-->
<!--            '!text-primary-500': tab === 'branch'-->
<!--          }"-->
<!--        >-->
<!--          По филиалам-->
<!--        </span>-->
<!--      </div>-->
    </div>

    <template v-if="dashboardStore.byLocations.loader">
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
          <template v-for="item in dashboardStore.byLocations.data">
            <div
              class="group flex items-center gap-2 font-medium text-greyscale-500 rounded-xl hover:bg-greyscale-50 cursor-pointer px-3 py-[6px]"
            >
              <div
                class="w-[10px] h-[10px] rounded"
                :style="{ backgroundColor: conditionColors(item.name) }"
              ></div>

              <h1 class="flex-1 text-[13px] group-hover:text-greyscale-900">{{ item.name }}</h1>

              <span class="text-greyscale-900 text-sm font-semibold">{{ item.count }}</span>

              <span class="w-9 text-right text-sm group-hover:text-greyscale-900">
              {{ `${((item.count / totalCount) * 100).toFixed(1)}%` }}
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
