<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import axiosConfig from '@/services/axios.config'
import { fetchCompaniesList, fetchDepartmentList } from '@/services/common.service'
import {
  UsersGroupBoldDuotoneIcon,
  NoteBookBoldDuotoneIcon,
  CaseRoundBoldDuotoneIcon,
  UserSpeakBoldDuotoneIcon
} from '@/components/Icons'
import HandbookDropdown from '@/modules/Handbook/components/Dropdown.vue'
import Card from '../components/Card.vue'
import { USER_STATUS_CODES } from '@/enums'

const { t } = useI18n()

const branches = ref([])
const branchSelect = ref(null)
const departments = ref([])
const departmentSelect = ref(null)
const option = ref({
  chart: {
    type: 'radialBar',
    offsetX: -25,
    offsetY: -16,
    sparkline: {
      enabled: true
    }
  },
  plotOptions: {
    radialBar: {
      startAngle: -90,
      endAngle: 90,
      track: {
        background: '#f1f1f6'
      },
      dataLabels: {
        show: false,
      }
    }
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 1,
      opacityTo: 1,
      colorStops: [
        {
          offset: 100,
          color: '#FDC031',
          opacity: 1
        }
      ]
    }
  },
})
const option2 = ref({
  chart: {
    type: 'radialBar',
    offsetX: -45,
    offsetY: -16,
    sparkline: {
      enabled: true
    }
  },
  plotOptions: {
    radialBar: {
      startAngle: -90,
      endAngle: 90,
      track: {
        background: '#f1f1f6'
      },
      dataLabels: {
        show: false,
      }
    }
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 1,
      opacityTo: 1,
      colorStops: [
        {
          offset: 100,
          color: '#29CD74',
          opacity: 1
        }
      ]
    }
  },
})
const series = ref([76])

const genderLoading = ref(true)
const genderOptions = ref({
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
    colors: ['#FF7290', '#5EC1E7']
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
const genderSeries = ref([])
const genderList = ref({
  list: [],
  counts: 0
})

const getGenderList = async () => {
  try {
    genderLoading.value = true
    let { data } = await axiosConfig.get(`sql-query/`, {
      query_type: 'by_gender',
    })

    let list = data.data.map(item => {
      return {
        title: item['GENDER'] === 'F' ? 'Женщины' : 'Мужчины',
        number: item['COUNT'],
        class: item['GENDER'] === 'F' ? 'bg-[#FF7290]' : 'bg-[#5EC1E7]'
      }
    })

    genderSeries.value = data.data.map(item => item['COUNT'])
    genderList.value = {
      list,
      counts: list.reduce((acc, cur) => acc + cur.number, 0)
    }
  }
  catch (error) {}
  finally {
    setTimeout(() => {
      genderLoading.value = false
    }, 500)
  }
}

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
        class: conditionColors(item['CONDITION'])
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

const experienceLoading = ref(true)
const experienceOptions = ref({
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
      '#827BFF'
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
            offsetY: 8
          },
          total: {
            show: true,
            label: 'лет в среднее',
            fontSize: '18px',
            color: '#9CA8B9',
            fontFamily: 'SFProDisplay-Regular',
            showAlways: true,
            formatter: function (w) {
              return '2.8 год'
            }
          }
        }
      },
      expandOnClick: false
    }
  }
})
const experienceSeries = ref([])
const experienceList = ref({
  list: [],
  counts: 0
})

const getExperienceList = async () => {
  try {
    experienceLoading.value = true
    let { data } = await axiosConfig.get(`sql-query/`, {
      query_type: 'employee_experience',
    })

    let list = data.data.map((item, index) => {
      return {
        title: item['CATEGORY'],
        number: item['COUNT'],
        class: experienceColors(index)
      }
    })

    experienceSeries.value = data.data.map(item => item['COUNT'])
    experienceList.value = {
      list: [list[0], list[4], list[2], list[3], list[1]],
      counts: list.reduce((acc, cur) => acc + cur.number, 0)
    }
  }
  catch (error) {
    let mock = {
      data: [
        {
          "CATEGORY": "Более 5 лет",
          "COUNT": 3378
        },
        {
          "CATEGORY": "До 3 месяцев",
          "COUNT": 126
        },
        {
          "CATEGORY": "От 1 года до 3 лет",
          "COUNT": 336
        },
        {
          "CATEGORY": "От 3 до 12 месяцев",
          "COUNT": 215
        },
        {
          "CATEGORY": "От 3 лет до 5 лет",
          "COUNT": 305
        }
      ],
      avg: 2.5
    }
  }
  finally {
    setTimeout(() => {
      experienceLoading.value = false
    }, 500)
  }
}
const experienceColors = (index) => {
  switch (index) {
    case 0:
      return '#29CD74'
    case 1:
      return '#5EC1E7'
    case 2:
      return '#FF7290'
    case 3:
      return '#FDC031'
    case 4:
      return '#827BFF'
  }
}

const agesLoading = ref(true)
const agesOptions = ref({
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
      '#FDC031'
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
            label: 'лет в среднее',
            fontSize: '18px',
            color: '#9CA8B9',
            fontFamily: 'SFProDisplay-Regular',
            showAlways: true,
            formatter: function (w) {
              return '31-40'
            }
          }
        }
      },
      expandOnClick: false
    }
  }
})
const agesSeries = ref([])
const agesList = ref({
  list: [],
  counts: 0
})

const getAgesList = async () => {
  try {
    agesLoading.value = true
    let { data } = await axiosConfig.get(`sql-query/`, {
      query_type: 'by_ages',
    })

    let list = data.data.map((item, index) => {
      return {
        title: item['AGE_GROUP'],
        number: item['COUNT'],
        class: agesColors(index)
      }
    })

    agesSeries.value = data.data.map(item => item['COUNT'])
    agesList.value = {
      list,
      counts: list.reduce((acc, cur) => acc + cur.number, 0)
    }
  }
  catch (error) {
    let mock = {
      data: [
        {
          "AGE_GROUP": "20-30",
          "COUNT": 1172
        },
        {
          "AGE_GROUP": "31-40",
          "COUNT": 1918
        },
        {
          "AGE_GROUP": "41-50",
          "COUNT": 967
        },
        {
          "AGE_GROUP": "50+",
          "COUNT": 303
        }
      ]
    }
  }
  finally {
    setTimeout(() => {
      agesLoading.value = false
    }, 500)
  }
}
const agesColors = (index) => {
  switch (index) {
    case 0:
      return '#29CD74'
    case 1:
      return '#5EC1E7'
    case 2:
      return '#FF7290'
    case 3:
      return '#FDC031'
  }
}

const managersLoading = ref(true)
const managersOptions = ref({
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
    colors: ['#29CD74', '#5EC1E7', '#FF7290'],
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
            label: 'сотрудники',
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
const managersSeries = ref([])
const managersList = ref({
  list: [],
  counts: 0
})

const getManagersList = async () => {
  try {
    managersLoading.value = true
    let { data } = await axiosConfig.get(`sql-query/`, {
      query_type: 'by_rank',
    })

    let list = data.data.map((item, index) => {
      return {
        title: item['CODE_RANGE'] === 'SPEC' ? 'Специалисты' : item['CODE_RANGE'] === 'BOSS' ? 'Руководители' : 'Рабочие',
        number: item['CNT'],
        class: agesColors(index)
      }
    })

    managersSeries.value = data.data.map(item => item['CNT'])
    managersList.value = {
      list: [list[2], list[0], list[1]],
      counts: list.reduce((acc, cur) => acc + cur.number, 0)
    }
  }
  catch (error) {
    let mock = {
      data: [
        {
          "CODE_RANGE": "SPEC",
          "CNT": 1172
        },
        {
          "CODE_RANGE": "ISHCHI",
          "CNT": 1918
        },
        {
          "CODE_RANGE": "BOSS",
          "CNT": 967
        }
      ]
    }
  }
  finally {
    setTimeout(() => {
      managersLoading.value = false
    }, 500)
  }
}

const positionRankLoading = ref(true)
const positionRankList = ref({
  list: []
})

const getPositionRankList = async () => {
  try {
    positionRankLoading.value = true
    let { data } = await axiosConfig.get(`sql-query/`, {
      query_type: 'by_position_rank',
    })

    let counts = data.data.reduce((acc, cur) => acc + cur['CNT'], 0)
    let list = data.data.map((item, index) => {
      return {
        title: item['CODE_RANGE'],
        number: item['CNT'],
        style: `${(item['CNT'] / counts * 100).toFixed(1)}%`
      }
    })

    positionRankList.value = {
      list: [list[1], list[2], list[3], list[0], list[4]]
    }
  }
  catch (error) {
    let mock = {
      data: [
        {
          "CODE_RANGE": "0-6",
          "CNT": 1755
        },
        {
          "CODE_RANGE": "16+",
          "CNT": 326
        },
        {
          "CODE_RANGE": "13-15",
          "CNT": 1111
        },
        {
          "CODE_RANGE": "10-12",
          "CNT": 1722
        },
        {
          "CODE_RANGE": "1-5",
          "CNT": 481
        }
      ]
    }
  }
  finally {
    setTimeout(() => {
      positionRankLoading.value = false
    }, 500)
  }
}

watchEffect(async () => {
  if(!branchSelect.value) {
    departments.value = []
  }

  if(branchSelect.value) {
    let { data } = await fetchDepartmentList({ page_size:100, company: branchSelect.value, ordering:"name" })

    departments.value = data.results
  }
})

onMounted(async () => {
  await getGenderList()
  await getConditionList()
  await getExperienceList()
  await getAgesList()
  await getManagersList()
  await getPositionRankList()

  // let { data } = await fetchCompaniesList({ page_size: 100 })
  // branches.value = data.results
  // branchSelect.value = data.results[0].id
})
</script>

<template>
  <div class="hr-dashboard-view flex flex-col flex-1">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl text-primary-900 font-bold">{{ t('dashboard') }}</h1>

<!--      <div class="flex justify-end flex-1 gap-2">-->
<!--        <div class="max-w-[350px] w-full">-->
<!--          <handbook-dropdown-->
<!--            v-model="branchSelect"-->
<!--            v-model:options="branches"-->
<!--            api-url="companies"-->
<!--            placeholder="Филиал"-->
<!--          />-->
<!--        </div>-->

<!--        <div class="max-w-[350px] w-full">-->
<!--          <handbook-dropdown-->
<!--            v-model="departmentSelect"-->
<!--            v-model:options="departments"-->
<!--            api-url="departments/top-level-departments"-->
<!--            :api-params="{-->
<!--              company: branchSelect,-->
<!--              condition: 'A,K'-->
<!--            }"-->
<!--            placeholder="Подразделение"-->
<!--          />-->
<!--        </div>-->
<!--      </div>-->
    </div>

    <div class="grid grid-cols-3 gap-4">
      <div class="col-span-2">
        <card>
          <div class="grid grid-cols-[225px_1fr_1fr_225px] p-1">
            <div class="flex items-center gap-4 border-r border-r-greyscale-200">
              <div class="flex items-center justify-center w-12 h-12 bg-greyscale-50 rounded-xl">
                <base-iconify
                  :icon="UsersGroupBoldDuotoneIcon"
                  class="w-7 h-7 text-warning-500"
                />
              </div>

              <div class="font-medium">
                <h1 class="text-sm text-greyscale-500">Всего людей</h1>
                <p class="text-2xl text-greyscale-900">0</p>
              </div>
            </div>

            <div class="flex items-center justify-center gap-4 border-r border-r-greyscale-200">
              <div class="flex items-center justify-center w-12 h-12 bg-greyscale-50 rounded-xl">
                <base-iconify
                  :icon="NoteBookBoldDuotoneIcon"
                  class="w-7 h-7 text-success-500"
                />
              </div>

              <div class="font-medium">
                <h1 class="text-sm text-greyscale-500">Факт. численность</h1>
                <p class="text-2xl text-greyscale-900">0</p>
              </div>
            </div>

            <div class="flex items-center justify-center gap-4 border-r border-r-greyscale-200">
              <div class="flex items-center justify-center w-12 h-12 bg-greyscale-50 rounded-xl">
                <base-iconify
                  :icon="CaseRoundBoldDuotoneIcon"
                  class="w-7 h-7 text-info-500"
                />
              </div>

              <div class="font-medium">
                <h1 class="text-sm text-greyscale-500">Штатная численность</h1>
                <p class="text-2xl text-greyscale-900">0</p>
              </div>
            </div>

            <div class="flex items-center justify-center gap-4">
              <div class="flex items-center justify-center w-12 h-12 bg-greyscale-50 rounded-xl">
                <base-iconify
                  :icon="UserSpeakBoldDuotoneIcon"
                  class="w-7 h-7 text-critic-500"
                />
              </div>

              <div class="font-medium">
                <h1 class="text-sm text-greyscale-500">Вакансии</h1>
                <p class="text-2xl text-greyscale-900">0</p>
              </div>
            </div>
          </div>
        </card>
      </div>

      <div class="col-span-1">
        <card>
          <div class="flex p-1">
            <div class="flex items-center flex-1 relative">
              <div class="w-[150px] h-[52px] relative">
                <apexchart
                  type="radialBar"
                  :options="option"
                  :series="series"
                  class="absolute"
                ></apexchart>
              </div>

              <div class="font-medium absolute -right-2">
                <h1 class="text-sm text-greyscale-500">Активность</h1>
                <p class="text-2xl text-greyscale-900">0</p>
              </div>
            </div>

            <div class="w-20">
              <div class="h-[52px] w-[1px] bg-greyscale-200 m-auto"></div>
            </div>

            <div class="flex items-center flex-1 relative">
              <div class="w-[150px] h-[52px] relative">
                <apexchart
                  type="radialBar"
                  :options="option2"
                  :series="series"
                  class="absolute"
                ></apexchart>
              </div>

              <div class="font-medium absolute -right-1">
                <h1 class="text-sm text-greyscale-500">Заполненность</h1>
                <p class="text-2xl text-greyscale-900">0</p>
              </div>
            </div>
          </div>
        </card>
      </div>
    </div>

    <div class="grid grid-cols-3 gap-4 my-4">
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
                <div class="group flex items-center gap-2 font-medium text-greyscale-500 rounded-xl hover:bg-greyscale-50 px-3 py-[6px]">
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

      <card>
        <h1 class="font-semibold text-greyscale-900 mb-2">Возраст</h1>

        <template v-if="agesLoading">
          <base-spinner />
        </template>

        <template v-else>
          <div class="flex items-center relative pb-3">
            <div class="max-w-[280px] w-full">
              <apexchart type="donut" :options="agesOptions" :series="agesSeries"></apexchart>
            </div>

            <div class="flex-1 max-w-[275px] w-full absolute right-0">
              <template v-for="item in agesList.list">
                <div class="group flex items-center gap-2 font-medium text-greyscale-500 rounded-xl hover:bg-greyscale-50 px-3 py-[6px]">
                  <div
                    class="w-[10px] h-[10px] rounded"
                    :style="{ backgroundColor: item.class }"
                  ></div>

                  <h1 class="flex-1 text-[13px] group-hover:text-greyscale-900">{{ item.title }}</h1>

                  <span class="text-greyscale-900 text-sm font-semibold">{{ item.number }}</span>

                  <span class="w-9 text-right text-sm group-hover:text-greyscale-900">
                    {{ `${(item.number / agesList.counts * 100).toFixed(1)}%` }}
                  </span>
                </div>
              </template>
            </div>
          </div>
        </template>
      </card>

      <card>
        <h1 class="font-semibold text-greyscale-900 mb-2">Стаж</h1>

        <template v-if="experienceLoading">
          <base-spinner />
        </template>

        <template v-else>
          <div class="flex items-center relative pb-3">
            <div class="max-w-[280px] w-full">
              <apexchart type="donut" :options="experienceOptions" :series="experienceSeries"></apexchart>
            </div>

            <div class="flex-1 max-w-[275px] w-full absolute right-0">
              <template v-for="item in experienceList.list">
                <div class="group flex items-center gap-2 font-medium text-greyscale-500 rounded-xl hover:bg-greyscale-50 px-3 py-[6px]">
                  <div
                    class="w-[10px] h-[10px] rounded"
                    :style="{ backgroundColor: item.class }"
                  ></div>

                  <h1 class="flex-1 text-[13px] group-hover:text-greyscale-900">{{ item.title }}</h1>

                  <span class="text-greyscale-900 text-sm font-semibold">{{ item.number }}</span>

                  <span class="w-9 text-right text-sm group-hover:text-greyscale-900">
                    {{ `${(item.number / experienceList.counts * 100).toFixed(1)}%` }}
                  </span>
                </div>
              </template>
            </div>
          </div>
        </template>
      </card>
    </div>

    <div class="grid grid-cols-3 gap-4">
      <card>
        <h1 class="font-semibold text-greyscale-900 mb-2">Разряды</h1>

        <template v-if="positionRankLoading">
          <base-spinner />
        </template>

        <template v-else>
          <div class="space-y-1">
            <template v-for="item in positionRankList.list">
              <div class="flex items-center gap-5 font-medium text-greyscale-500 px-1 py-[6px]">
                <span class="text-[13px] w-16">{{ item.title }}</span>

                <div class="flex-1 bg-greyscale-50 h-4 rounded overflow-hidden">
                  <div
                    class="bg-primary-100 h-full border-r-2 border-r-primary-500"
                    :style="{ 'width': item.style }"
                  ></div>
                </div>

                <span class="text-sm w-10 text-center">{{ item.style }}</span>
              </div>
            </template>
          </div>
        </template>
      </card>

      <card>
        <h1 class="font-semibold text-greyscale-900 mb-2">Руководители / Специалисты / Рабочие</h1>

        <template v-if="managersLoading">
          <base-spinner />
        </template>

        <template v-else>
          <div class="flex items-center relative pb-3">
            <div class="max-w-[280px] w-full">
              <apexchart type="donut" :options="managersOptions" :series="managersSeries"></apexchart>
            </div>

            <div class="flex-1 max-w-[275px] w-full absolute right-0">
              <template v-for="item in managersList.list">
                <div class="group flex items-center gap-2 font-medium text-greyscale-500 rounded-xl hover:bg-greyscale-50 px-3 py-[6px]">
                  <div
                    class="w-[10px] h-[10px] rounded"
                    :style="{ backgroundColor: item.class }"
                  ></div>

                  <h1 class="flex-1 text-[13px] group-hover:text-greyscale-900">{{ item.title }}</h1>

                  <span class="text-greyscale-900 text-sm font-semibold">{{ item.number }}</span>

                  <span class="w-9 text-right text-sm group-hover:text-greyscale-900">
                  {{ `${(item.number / managersList.counts * 100).toFixed(1)}%` }}
                </span>
                </div>
              </template>
            </div>
          </div>
        </template>
      </card>

      <card>
        <h1 class="font-semibold text-greyscale-900 mb-2">Пол</h1>

        <template v-if="genderLoading">
          <base-spinner />
        </template>

        <template v-else>
          <div class="flex items-center relative pb-3">
            <div class="max-w-[280px] w-full">
              <apexchart type="donut" :options="genderOptions" :series="genderSeries"></apexchart>
            </div>

            <div class="flex-1 max-w-[275px] w-full absolute right-0">
              <template v-for="item in genderList.list">
                <div class="group flex items-center gap-2 font-medium text-greyscale-500 rounded-xl hover:bg-greyscale-50 px-3 py-[6px]">
                  <div
                    class="w-[10px] h-[10px] rounded"
                    :style="{ backgroundColor: item.class }"
                  ></div>

                  <h1 class="flex-1 text-[13px] group-hover:text-greyscale-900">{{ item.title }}</h1>

                  <span class="text-greyscale-900 text-sm font-semibold">{{ item.number }}</span>

                  <span class="w-9 text-right text-sm group-hover:text-greyscale-900">
                    {{ `${(item.number / genderList.counts * 100).toFixed(1)}%` }}
                  </span>
                </div>
              </template>
            </div>
          </div>
        </template>
      </card>
    </div>
  </div>
</template>

<style scoped>

</style>
