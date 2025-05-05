<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUsersStore } from '@/stores/users.store'
import axiosConfig from '@/services/axios.config'
import { USER_STATUS_CODES } from '@/enums'
import Card from './Card.vue'
import { ModalWithFilters } from '@/components/Modal'
import { isObject } from '@/utils'

const route = useRoute()
const router = useRouter()
const userStore = useUsersStore()

const headerDefault = [
  {
    header: 'tabel-number',
    field: 'tabel_number',
    width: '200px',
    active: true
  },
  {
    header: 'employee',
    field: 'full_name',
    width: '400px',
    active: true
  },
  {
    header: 'branch',
    field: 'company',
    width: '250px',
    active: true
  },
  {
    header: 'department',
    field: 'top_level_department',
    width: '400px',
    active: true
  },
  {
    header: 'position',
    field: 'position',
    width: '350px',
    active: true
  },
  {
    header: 'start-date',
    field: 'start_date',
    width: '250px',
    active: false,
    tabelTypes: ['B']
  },
  {
    header: 'end-date',
    field: 'end_date',
    width: '250px',
    active: false,
    tabelTypes: ['B', 'K']
  },
  {
    header: 'sick-type',
    field: 'sick_leave_type',
    width: '250px',
    active: false,
    tabelTypes: ['B']
  },
  {
    header: 'sick-leave-coefficient',
    field: 'sick_leave_coefficient',
    width: '400px',
    active: false,
    tabelTypes: ['B']
  },
  {
    header: 'experience',
    field: 'experience',
    width: '250px',
    active: false,
    tabelTypes: ['B']
  },
  {
    header: 'trip-address',
    field: 'trip_address',
    width: '250px',
    active: false,
    tabelTypes: ['K']
  },
  {
    header: 'trip-reason',
    field: 'trip_reason',
    width: '400px',
    active: false,
    tabelTypes: ['K']
  },
]

const modal = ref(false)
const selected = ref({
  title: '',
  number: null,
  class: null,
  CONDITION: null
})
const conditionLoading = ref(true)
const conditionOptions = ref({
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
            label: 'Сотрудники',
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
const conditionSeries = ref([])
const conditionList = ref({
  list: [],
  counts: 0
})
const users = ref({
  results: [],
  count: 0
})
const loading = ref(true)
const headers = ref(headerDefault)
const filters = ref({
  search: null,
  company: null,
  department: null,
})

const getConditionList = async () => {
  try {
    conditionLoading.value = true
    let { data } = await axiosConfig.get(`sql-query/`, {
      query_type: 'by_condition',
    })

    let list = data.data
    .sort((prev, next) => next['COUNT'] - prev['COUNT'])
    .map(item => {
      return {
        title: item['CONDITION_NOTE'],
        number: item['COUNT'],
        class: conditionColors(item['CONDITION']),
        CONDITION: item['CONDITION'],
      }
    })

    conditionSeries.value = data.data.map(item => item['COUNT'])
    conditionList.value = {
      list,
      counts: list.reduce((acc, cur) => acc + cur.number, 0)
    }
  }
  catch (error) {
    let mock = {
      data: [
        {
          "CONDITION_NOTE": "Академик отп.",
          "COUNT": 1,
          "CONDITION": "AO"
        },
        {
          "CONDITION_NOTE": "Без содержания",
          "COUNT": 13,
          "CONDITION": "OB"
        },
        {
          "CONDITION_NOTE": "Болничные",
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

    // let list = mock.data
    // .sort((prev, next) => next['COUNT'] - prev['COUNT'])
    // .map(item => {
    //   return {
    //     title: item['CONDITION_NOTE'],
    //     number: item['COUNT'],
    //     class: conditionColors(item['CONDITION']),
    //     CONDITION: item['CONDITION'],
    //   }
    // })
    //
    // conditionSeries.value = mock.data.map(item => item['COUNT'])
    // conditionList.value = {
    //   list,
    //   counts: list.reduce((acc, cur) => acc + cur.number, 0)
    // }
  }
  finally {
    setTimeout(() => {
      conditionLoading.value = false
    }, 500)
  }
}
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
const handleType = async (item) => {
  selected.value = item

  if(selected.value.CONDITION === 'B' || selected.value.CONDITION === 'K') {
    headers.value = headers.value?.map(header => {
      return {
        ...header,
        active: header.hasOwnProperty('tabelTypes') ? header.tabelTypes.includes(item.CONDITION) : true
      }
    })
  }

  modal.value = true

  if(
    [
      USER_STATUS_CODES.LABOR_LEAVE,
      USER_STATUS_CODES.SICK_LEAVES,
      USER_STATUS_CODES.ACADEMICIAN_VACATION,
      USER_STATUS_CODES.MILITARY_SERVICE,
      USER_STATUS_CODES.NO_CONTENT,
      USER_STATUS_CODES.DECREE_2,
      USER_STATUS_CODES.DECREE_3,
      USER_STATUS_CODES.STUDY_LEAVE,
      USER_STATUS_CODES.SICK_LEAVE_DECREE,
      USER_STATUS_CODES.BUSINESS_TRIP
    ].includes(selected.value.CONDITION)
  ) {
    await actionUserOnVacationList()
  }
  else {
    await actionUserSearchList()
  }
}
const handleFiltered = async (value) => {
  filters.value = value
  await actionUserSearchList(value)
}
const actionUserSearchList = async (params = {}) => {
  try {
    setLoading(true)

    users.value = await userStore.actionUserSearchList({
      ...params,
      status_codes: selected.value.CONDITION
    })
  }
  catch (error) {}
  finally {
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }
}
const actionUserOnVacationList = async (params = {}) => {
  try {
    setLoading(true)

    users.value = await userStore.actionUserOnVacationList({
      ...params,
      code: selected.value.CONDITION
    })

    // users.value.results = results.filter(item => item.)
  }
  catch (error) {}
  finally {
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }
}
const setLoading = (value) => {
  loading.value = value
}
const handlePaginate = async (value) => {
  await actionUserSearchList({
    page: value,
    ...filters.value,
  })
}
const handleAfterHide = async () => {
  await router.replace({
    path: route.fullPath,
    query: {}
  })
  .then(() => {})
  headers.value = headerDefault
}

onMounted(async () => {
  await getConditionList()
})
</script>

<template>
  <card>
    <h1 class="font-semibold text-greyscale-900 mb-2">Присутствие</h1>

    <template v-if="conditionLoading">
      <base-spinner />
    </template>

    <template v-else>
      <div class="flex items-center relative pb-3">
        <div class="max-w-[280px] w-full">
          <apexchart type="donut" :options="conditionOptions" :series="conditionSeries"></apexchart>
        </div>

        <div class="flex-1 max-w-[275px] w-full absolute right-0 max-h-[200px] overflow-y-auto">
          <template v-for="item in conditionList.list">
            <div
              class="group flex items-center gap-2 font-medium text-greyscale-500 rounded-xl hover:bg-greyscale-50 cursor-pointer px-3 py-[6px]"
              @click="handleType(item)"
            >
              <div
                class="w-[10px] h-[10px] rounded"
                :style="{ backgroundColor: item.class }"
              ></div>

              <h1 class="flex-1 text-[13px] group-hover:text-greyscale-900">{{ item.title }}</h1>

              <span class="text-greyscale-900 text-sm font-semibold">{{ item.number }}</span>

              <span class="w-9 text-right text-sm group-hover:text-greyscale-900">
                {{ `${(item.number / conditionList.counts * 100).toFixed(1)}%` }}
              </span>
            </div>
          </template>
        </div>
      </div>
    </template>
  </card>

  <modal-with-filters
    v-model="modal"
    :label="selected.title"
    @update:filtered="handleFiltered"
    @emit:after-hide="handleAfterHide"
  >
    <template #content>
      <template v-if="loading">
        <div class="h-[75vh]">
          <base-spinner />
        </div>
      </template>

      <template v-else>
        <base-data-table
          :headers="headers"
          :value="users.results"
          :total-count="users.count"
          :roundable="false"
          borderable
          scroll-height="calc(100vh - 295px)"
          @emit:onPageChange="handlePaginate"
        >
          <template #tabel_number="{ data }">
            <h1 class="text-sm font-medium text-greyscale-900">{{ data.tabel_number ?? '-' }}</h1>
          </template>

          <template #full_name="{ data }">
            <div class="flex items-center gap-3">
              <base-avatar
                :image="data.avatar?.url"
                :label="data.full_name"
                :color="data.color"
              />

              <h1 class="text-sm font-medium text-greyscale-900">{{ data.full_name }}</h1>
            </div>
          </template>

          <template #company="{ data }">
            <h1 class="text-sm font-medium text-greyscale-900">
              {{ isObject(data.company) ? data.company?.name ?? '-' : data.company }}
            </h1>
          </template>

          <template #top_level_department="{ data }">
            <template v-if="data.department">
              <h1 class="text-sm font-medium text-greyscale-900">
                {{ data.department }}
              </h1>
            </template>

            <template v-else>
              <h1 class="text-sm font-medium text-greyscale-900">
                {{ isObject(data.top_level_department) ? data.top_level_department?.name ?? '-' : data.top_level_department }}
              </h1>
            </template>
          </template>

          <template #position="{ data }">
            <h1 class="text-sm font-medium text-greyscale-900">
              {{ isObject(data.position) ? data.position?.name ?? '-' : data.position }}
            </h1>
          </template>

          <template #start_date="{ data }">
            <h1 class="text-sm font-medium text-greyscale-900">{{ data.start_date ?? '-' }}</h1>
          </template>

          <template #end_date="{ data }">
            <h1 class="text-sm font-medium text-greyscale-900">{{ data.end_date ?? '-' }}</h1>
          </template>

          <template #sick_leave_type="{ data }">
            <h1 class="text-sm font-medium text-greyscale-900">{{ data.sick_leave_type ?? '-' }}</h1>
          </template>

          <template #sick_leave_coefficient="{ data }">
            <h1 class="text-sm font-medium text-greyscale-900">{{ data.sick_leave_coefficient ?? '-' }}</h1>
          </template>

          <template #experience="{ data }">
            <h1 class="text-sm font-medium text-greyscale-900">{{ data.experience ?? '-' }}</h1>
          </template>

          <template #trip_address="{ data }">
            <h1 class="text-sm font-medium text-greyscale-900">{{ data.trip_address ?? '-' }}</h1>
          </template>

          <template #trip_reason="{ data }">
            <h1
              class="text-sm font-medium text-greyscale-900 line-clamp-2"
              v-tooltip.top="{
                value: `<h4 class='text-xs text-white -my-1'>${data.trip_reason}</h4>`,
                escape: true
              }"
            >
              {{ data.trip_reason ?? '-' }}</h1>
          </template>
        </base-data-table>
      </template>
    </template>
  </modal-with-filters>
</template>

<style scoped>

</style>
