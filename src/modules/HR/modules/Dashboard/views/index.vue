<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import { fetchCompaniesList, fetchDepartmentList } from '@/services/common.service'
import {
  UsersGroupBoldDuotoneIcon,
  NoteBookBoldDuotoneIcon,
  CaseRoundBoldDuotoneIcon,
  UserSpeakBoldDuotoneIcon
} from '@/components/Icons'
import HandbookDropdown from '@/modules/Handbook/components/Dropdown.vue'
import Card from '../components/Card.vue'
import axiosConfig from "@/services/axios.config";

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
const option3 = ref({
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
    colors: ['#29CD74', '#5EC1E7', '#FF7290', '#FDC031', '#827BFF', '#FF72D5']
  },
  stroke: {
    width: 8
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
const series3 = ref([65, 55, 40, 25, 15, 100])
const presence = ref([
  {
    title: 'В работе',
    count: '59%',
    number: 704,
    class: 'bg-[#29CD74]'
  },
  {
    title: 'В отпуске',
    count: '12%',
    number: 1280,
    class: 'bg-[#5EC1E7]'
  },
  {
    title: 'В декретном отпуске',
    count: '8%',
    number: 490,
    class: 'bg-[#FF7290]'
  },
  {
    title: 'В больничной',
    count: '18%',
    number: 249,
    class: 'bg-[#FDC031]'
  },
  {
    title: 'Удаленный',
    count: '25%',
    number: 1790,
    class: 'bg-[#827BFF]'
  },
  {
    title: 'В командировке',
    count: '3%',
    number: 268,
    class: 'bg-[#FF72D5]'
  }
])

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
    width: 8
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
const genderList = ref([])

watchEffect(async () => {
  if(!branchSelect.value) {
    departments.value = []
  }

  if(branchSelect.value) {
    let { data } = await fetchDepartmentList({ page_size:100, company: branchSelect.value, ordering:"name" })

    departments.value = data.results
  }
})

const getGenderList = async () => {
  try {
    genderLoading.value = true
    let { data } = await axiosConfig.get(`sql-query/`, {
      query_type: 'by_gender',
    })

    console.log('BY GENDER', data)

    genderSeries.value = data.map(item => item['COUNT'])
    genderList.value = data.map(item => {
      return {
        title: item['GENDER'] === 'F' ? 'Женщины' : 'Мужчины',
        number: item['COUNT'],
        class: item['GENDER'] === 'F' ? 'bg-[#FF7290]' : 'bg-[#5EC1E7]'
      }
    })
  }
  catch (error) {
    let mock = [
      {
        "GENDER": "F",
        "COUNT": 1706
      },
      {
        "GENDER": "M",
        "COUNT": 2654
      }
    ]
  }
  finally {
    setTimeout(() => {
      genderLoading.value = false
    }, 500)
  }
}

onMounted(async () => {
  await getGenderList()
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
                <p class="text-2xl text-greyscale-900">5480</p>
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
                <p class="text-2xl text-greyscale-900">5230</p>
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
                <p class="text-2xl text-greyscale-900">4800</p>
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
                <p class="text-2xl text-greyscale-900">26</p>
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
                <p class="text-2xl text-greyscale-900">45%</p>
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
                <p class="text-2xl text-greyscale-900">76%</p>
              </div>
            </div>
          </div>
        </card>
      </div>
    </div>

    <div class="grid grid-cols-3 gap-4 my-4">
      <card>
        <h1 class="font-semibold text-greyscale-900 mb-2">Присутствие</h1>

        <div class="flex relative pb-3">
          <div class="max-w-[280px] w-full">
            <apexchart type="donut" :options="option3" :series="series3"></apexchart>
          </div>

          <div class="flex-1 max-w-[275px] w-full absolute right-0">
            <template v-for="item in presence">
              <div class="group flex items-center gap-2 font-medium text-greyscale-500 rounded-xl hover:bg-greyscale-50 px-3 py-[6px]">
                <div
                  class="w-[10px] h-[10px] rounded"
                  :class="item.class"
                ></div>

                <h1 class="flex-1 text-[13px] group-hover:text-greyscale-900">{{ item.title }}</h1>

                <span class="text-greyscale-900 text-sm font-semibold">{{ item.number }}</span>

                <span class="w-9 text-right text-sm group-hover:text-greyscale-900">{{ item.count }}</span>
              </div>
            </template>
          </div>
        </div>
      </card>

      <card>
        <h1 class="font-semibold text-greyscale-900 mb-2">Возраст</h1>

        <div class="flex relative pb-3">
          <div class="max-w-[280px] w-full">
            <apexchart type="donut" :options="option3" :series="series3"></apexchart>
          </div>

          <div class="flex-1 max-w-[275px] w-full absolute right-0">
            <template v-for="item in presence">
              <div class="group flex items-center gap-2 font-medium text-greyscale-500 rounded-xl hover:bg-greyscale-50 px-3 py-[6px]">
                <div
                  class="w-[10px] h-[10px] rounded"
                  :class="item.class"
                ></div>

                <h1 class="flex-1 text-[13px] group-hover:text-greyscale-900">{{ item.title }}</h1>

                <span class="text-greyscale-900 text-sm font-semibold">{{ item.number }}</span>

                <span class="w-9 text-right text-sm group-hover:text-greyscale-900">{{ item.count }}</span>
              </div>
            </template>
          </div>
        </div>
      </card>

      <card>
        <h1 class="font-semibold text-greyscale-900 mb-2">Стаж</h1>

        <div class="flex relative pb-3">
          <div class="max-w-[280px] w-full">
            <apexchart type="donut" :options="option3" :series="series3"></apexchart>
          </div>

          <div class="flex-1 max-w-[275px] w-full absolute right-0">
            <template v-for="item in presence">
              <div class="group flex items-center gap-2 font-medium text-greyscale-500 rounded-xl hover:bg-greyscale-50 px-3 py-[6px]">
                <div
                  class="w-[10px] h-[10px] rounded"
                  :class="item.class"
                ></div>

                <h1 class="flex-1 text-[13px] group-hover:text-greyscale-900">{{ item.title }}</h1>

                <span class="text-greyscale-900 text-sm font-semibold">{{ item.number }}</span>

                <span class="w-9 text-right text-sm group-hover:text-greyscale-900">{{ item.count }}</span>
              </div>
            </template>
          </div>
        </div>
      </card>
    </div>

    <div class="grid grid-cols-3 gap-4">
      <card>
        <h1 class="font-semibold text-greyscale-900 mb-2">Разряды</h1>

        <div class="space-y-1">
          <div class="flex items-center gap-5 font-medium text-greyscale-500 px-1 py-[6px]">
            <span class="text-[13px] w-16">15+</span>

            <div class="flex-1 bg-greyscale-50 h-4 rounded overflow-hidden">
              <div class="bg-primary-100 h-full border-r-2 border-r-primary-500" style="width: 70%"></div>
            </div>

            <span class="text-sm w-10 text-center">59%</span>
          </div>

          <div class="flex items-center gap-5 font-medium text-greyscale-500 px-1 py-[6px]">
            <span class="text-[13px] w-16">13-14</span>

            <div class="flex-1 bg-greyscale-50 h-4 rounded overflow-hidden">
              <div class="bg-primary-100 h-full border-r-2 border-r-primary-500" style="width: 14%"></div>
            </div>

            <span class="text-sm w-10 text-center">12%</span>
          </div>

          <div class="flex items-center gap-5 font-medium text-greyscale-500 px-1 py-[6px]">
            <span class="text-[13px] w-16">11-12</span>

            <div class="flex-1 bg-greyscale-50 h-4 rounded overflow-hidden">
              <div class="bg-primary-100 h-full border-r-2 border-r-primary-500" style="width: 10%"></div>
            </div>

            <span class="text-sm w-10 text-center">8%</span>
          </div>

          <div class="flex items-center gap-5 font-medium text-greyscale-500 px-1 py-[6px]">
            <span class="text-[13px] w-16">9-10</span>

            <div class="flex-1 bg-greyscale-50 h-4 rounded overflow-hidden">
              <div class="bg-primary-100 h-full border-r-2 border-r-primary-500" style="width: 20%"></div>
            </div>

            <span class="text-sm w-10 text-center">18%</span>
          </div>

          <div class="flex items-center gap-5 font-medium text-greyscale-500 px-1 py-[6px]">
            <span class="text-[13px] w-16">Другие</span>

            <div class="flex-1 bg-greyscale-50 h-4 rounded overflow-hidden">
              <div class="bg-primary-100 h-full border-r-2 border-r-primary-500" style="width: 20%"></div>
            </div>

            <span class="text-sm w-10 text-center">18%</span>
          </div>
        </div>
      </card>

      <card>
        <h1 class="font-semibold text-greyscale-900 mb-2">Руководители / Специалисты</h1>

        <div class="flex relative pb-3">
          <div class="max-w-[280px] w-full">
            <apexchart type="donut" :options="option3" :series="series3"></apexchart>
          </div>

          <div class="flex-1 max-w-[275px] w-full absolute right-0">
            <template v-for="item in presence">
              <div class="group flex items-center gap-2 font-medium text-greyscale-500 rounded-xl hover:bg-greyscale-50 px-3 py-[6px]">
                <div
                  class="w-[10px] h-[10px] rounded"
                  :class="item.class"
                ></div>

                <h1 class="flex-1 text-[13px] group-hover:text-greyscale-900">{{ item.title }}</h1>

                <span class="text-greyscale-900 text-sm font-semibold">{{ item.number }}</span>

                <span class="w-9 text-right text-sm group-hover:text-greyscale-900">{{ item.count }}</span>
              </div>
            </template>
          </div>
        </div>
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
              <template v-for="item in genderList">
                <div class="group flex items-center gap-2 font-medium text-greyscale-500 rounded-xl hover:bg-greyscale-50 px-3 py-[6px]">
                  <div
                    class="w-[10px] h-[10px] rounded"
                    :class="item.class"
                  ></div>

                  <h1 class="flex-1 text-[13px] group-hover:text-greyscale-900">{{ item.title }}</h1>

                  <span class="text-greyscale-900 text-sm font-semibold">{{ item.number }}</span>

                  <!--                <span class="w-9 text-right text-sm group-hover:text-greyscale-900">{{ item.count }}</span>-->
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
