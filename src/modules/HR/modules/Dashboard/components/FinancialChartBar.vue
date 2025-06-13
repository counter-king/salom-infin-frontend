<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import ChartCard from './Card.vue'
import ChartBar from './ChartBar.vue'

const { t } = useI18n()

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
</script>

<template>
  <div class="relative">
    <chart-card class="h-full pt-6 pb-8 mt-2 px-10">
      <header class="flex flex-wrap items-center mb-4">
        <div class="flex items-center flex-1 gap-7 text-greyscale-900">
          <h1 class="text-lg font-semibold">
            Динамика ФОТ ({{ t('mln') }})
          </h1>
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
