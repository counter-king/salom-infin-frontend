<script setup>
import { ref, provide } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHRDashboardStore } from '../../Dashboard/stores'
import ChartCard from './Card.vue'
import ChartBar from './ChartBar.vue'
import DepartmentMultiSelect from '@/components/Select/DepartmentMultiSelect.vue'
import BranchMultiSelect from '@/components/Select/BranchMultiSelect.vue'

const { t } = useI18n()
const dashboardStore = useHRDashboardStore()

const departmentSelect = ref([])
const branchSelect = ref([])
const activeTabIndex = ref(0)
const tabItems = ref([
  {
    label: 'head-office',
    name: 'Preview',
    slot: 'preview',
    component: 'Preview',
  },
  {
    label: 'branch',
    name: 'History',
    slot: 'history',
    component: 'History',
  },
])
const colors = ref([
  {
    title: 'finance-dashboard.text-7',
    longText: 'Фиксированное вознаграждение',
    color: '#A19CFF'
  },
  {
    title: 'finance-dashboard.text-3',
    longText: 'Переменное вознаграждение',
    color: '#79CE55'
  },
  {
    title: 'finance-dashboard.text-6',
    longText: 'Разовые выплаты',
    color: '#F6CE83'
  },
  {
    title: 'finance-dashboard.text-4',
    longText: 'Премии к праздникам и мат помощь с/х продукты',
    color: '#5EC1E7'
  },
  {
    title: 'finance-dashboard.text-1',
    longText: 'Материальная помощь',
    color: '#FF7290'
  },
  {
    title: 'finance-dashboard.text-8',
    longText: 'Ценные подарки',
    color: '#FBDD55'
  },
  {
    title: 'finance-dashboard.text-10',
    longText: 'Выплата пенсионерам (не сотр. Банка)',
    color: '#FF7EDD'
  },
  {
    title: 'finance-dashboard.text-9',
    longText: 'Выплата членам НС',
    color: '#30A100'
  },
  {
    title: 'finance-dashboard.text-2',
    longText: 'Оплата по договору ГПХ',
    color: '#FFA95E'
  },
  {
    title: 'finance-dashboard.text-5',
    longText: 'Прочее',
    color: '#5F64FF'
  },
])
const showNumbers = ref(false)

const handleDepartmentSelect = (data) => {
  dashboardStore.actionFilterCompanyTypeDepartments(data)
}
const handleBranchSelect = (data) => {
  dashboardStore.actionFilterCompanyTypeDepartments(data)
}
const handleShowNumber = () => {

}
provide('showNumbers', showNumbers)
</script>

<template>
  <div class="relative">
    <chart-card class="h-full pt-6 pb-8 mt-2 px-10">
      <header class="flex flex-wrap items-center mb-4">
        <div class="flex items-center justify-between flex-1 gap-7 text-greyscale-900">
          <div class="flex gap-7">
            <h1 class="text-lg font-semibold">
              Динамика ФОТ
              <!--            ({{ t('mln') }})-->
            </h1>

            <div class="flex items-center gap-2 cursor-pointer">
              <Checkbox
                v-model="showNumbers"
                :binary="true"
                input-id="finance-checkbox-numbers"
                :pt="{
	                root: {
	                  class: 'flex items-center'
	                },
	                input:{
	                  class: 'checkbox-event w-5 h-5 rounded'
	                }
	              }"
                @change="handleShowNumber"
              >
              </Checkbox>

              <label for="finance-checkbox-numbers" class="cursor-pointer">
                <span class="font-semibold text-base">{{ t('show-numbers') }}</span>
              </label>
            </div>
          </div>

          <div class="max-w-[350px] w-full">
            <template v-if="activeTabIndex === 0">
              <department-multi-select
                v-model="departmentSelect"
                label=""
                :placeholder="t('departments')"
                @update:modelValue="handleDepartmentSelect"
              />
            </template>

            <template v-if="activeTabIndex === 1">
              <branch-multi-select
                v-model="branchSelect"
                label=""
                @update:modelValue="handleBranchSelect"
              />
            </template>
          </div>
        </div>
      </header>

      <base-tab-menu
        v-model="activeTabIndex"
        :tab-items="tabItems"
        menu-class="!p-0 !m-0"
      />

      <div class="flex flex-wrap gap-y-2 gap-x-7 mt-6 mb-8">
        <template v-for="color in colors">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded" :style="{ background: color.color }"></div>

            <span class="text-greyscale-900 text-sm font-medium">{{ t(color.title) }}</span>
          </div>
        </template>
      </div>

      <template v-if="activeTabIndex === 0">
        <chart-bar :colors="colors" is-main />
      </template>

      <template v-if="activeTabIndex === 1">
        <chart-bar :colors="colors" :is-main="false" />
      </template>
    </chart-card>
  </div>
</template>

<style scoped>

</style>
