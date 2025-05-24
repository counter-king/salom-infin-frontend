<script setup>
import { ref, onMounted } from 'vue'
import Card from '../Card.vue'
import { USER_STATUS_CODES } from '@/enums'

const tab = ref('region')
const regionOptions = ref({
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
      '#11A5ED',
      '#090F33'
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
            label: 'Всего',
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
const regionSeries = ref([])
const regionList = ref({
  list: [],
  counts: 0
})

const conditionColors = (condition) => {
  switch (condition) {
    case USER_STATUS_CODES.ACADEMICIAN_VACATION:
      return '#29CD74'
    case USER_STATUS_CODES.NO_CONTENT:
      return '#5EC1E7'
    case USER_STATUS_CODES.SICK_LEAVES:
      return '#FF7290'
    case USER_STATUS_CODES.MILITARY_SERVICE:
      return '#FDC031'
    case USER_STATUS_CODES.SICK_LEAVE_DECREE:
      return '#827BFF'
    case USER_STATUS_CODES.DECREE_2:
      return '#FF72D5'
    case USER_STATUS_CODES.DECREE_3:
      return '#635AFF'
    case USER_STATUS_CODES.BUSINESS_TRIP:
      return '#767994'
    case USER_STATUS_CODES.WORKERS:
      return '#63BA3D'
    case USER_STATUS_CODES.LABOR_LEAVE:
      return '#FFC352'
    case USER_STATUS_CODES.STUDY_LEAVE:
      return '#11A5ED'
    case USER_STATUS_CODES.FROM_THE_CONTENT:
      return '#090F33'
  }
}

onMounted(() => {
  let mock = {
    data: [
      {
        "CONDITION_NOTE": "Ташкентская об.",
        "COUNT": 1,
        "CONDITION": "AO"
      },
      {
        "CONDITION_NOTE": "Андижанская об.",
        "COUNT": 13,
        "CONDITION": "OB"
      },
      {
        "CONDITION_NOTE": "Наманганская об.",
        "COUNT": 26,
        "CONDITION": "B"
      },
      {
        "CONDITION_NOTE": "Воинская служба",
        "COUNT": 6,
        "CONDITION": "I"
      },
      {
        "CONDITION_NOTE": "Декрет больничный",
        "COUNT": 37,
        "CONDITION": "DB"
      },
      {
        "CONDITION_NOTE": "Декрет_2",
        "COUNT": 172,
        "CONDITION": "OD"
      },
      {
        "CONDITION_NOTE": "Декрет_3",
        "COUNT": 68,
        "CONDITION": "OF"
      },
      {
        "CONDITION_NOTE": "Командировка",
        "COUNT": 14,
        "CONDITION": "K"
      },
      {
        "CONDITION_NOTE": "Рабочие",
        "COUNT": 3821,
        "CONDITION": "A"
      },
      {
        "CONDITION_NOTE": "Трудовой отп.",
        "COUNT": 152,
        "CONDITION": "OT"
      },
      {
        "CONDITION_NOTE": "Ученический отп.",
        "COUNT": 50,
        "CONDITION": "OU"
      }
    ],
    median_age: 33
  }

  let list = mock.data
  .sort((prev, next) => next['COUNT'] - prev['COUNT'])
  .map(item => {
    return {
      title: item['CONDITION_NOTE'],
      number: item['COUNT'],
      class: conditionColors(item['CONDITION']),
      CONDITION: item['CONDITION'],
    }
  })

  regionSeries.value = mock.data.map(item => item['COUNT'])
  regionList.value = {
    list,
    counts: list.reduce((acc, cur) => acc + cur.number, 0)
  }
})
</script>

<template>
  <card>
    <div class="flex gap-1 mb-6">
      <h1 class="flex-1 font-semibold text-greyscale-900">Внутренняя</h1>

      <div
        class="cursor-pointer rounded-[6px] py-1 px-2"
        :class="{
          'bg-greyscale-50': tab === 'region'
        }"
        @click="tab = 'region'"
      >
        <span
          class="text-[13px] font-medium text-greyscale-500 hover:text-primary-500"
          :class="{
            '!text-primary-500': tab === 'region'
          }"
        >
          По регионам
        </span>
      </div>

      <div
        class="cursor-pointer rounded-[6px] py-1 px-2"
        :class="{
          'bg-greyscale-50': tab === 'branch'
        }"
        @click="tab = 'branch'"
      >
        <span
          class="text-[13px] font-medium text-greyscale-500 hover:text-primary-500"
          :class="{
            '!text-primary-500': tab === 'branch'
          }"
        >
          По филиалам
        </span>
      </div>
    </div>

    <template v-if="tab === 'region'">
      <div class="flex items-center relative pb-2">
        <div class="max-w-[240px] w-full">
          <apexchart
            type="donut"
            :options="regionOptions"
            :series="regionSeries"
          ></apexchart>
        </div>

        <div class="flex-1 max-w-[275px] w-full absolute right-0 max-h-[200px] overflow-y-auto">
          <template v-for="item in regionList.list">
            <div
              class="group flex items-center gap-2 font-medium text-greyscale-500 rounded-xl hover:bg-greyscale-50 cursor-pointer px-3 py-[6px]"
            >
              <div
                class="w-[10px] h-[10px] rounded"
                :style="{ backgroundColor: item.class }"
              ></div>

              <h1 class="flex-1 text-[13px] group-hover:text-greyscale-900">{{ item.title }}</h1>

              <span class="text-greyscale-900 text-sm font-semibold">{{ item.number }}</span>

              <span class="w-9 text-right text-sm group-hover:text-greyscale-900">
                {{ `${(item.number / regionList.counts * 100).toFixed(1)}%` }}
              </span>
            </div>
          </template>
        </div>
      </div>
    </template>

    <template v-if="tab === 'branch'">222</template>
  </card>
</template>

<style scoped>

</style>
