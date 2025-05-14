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
    color: '#A19CFF'
  },
  {
    title: 'finance-dashboard.text-3',
    color: '#79CE55'
  },
  {
    title: 'finance-dashboard.text-6',
    color: '#F6CE83'
  },
  {
    title: 'finance-dashboard.text-4',
    color: '#5EC1E7'
  },
  {
    title: 'finance-dashboard.text-1',
    color: '#FF7290'
  },
  {
    title: 'finance-dashboard.text-8',
    color: '#FBDD55'
  },
  {
    title: 'finance-dashboard.text-10',
    color: '#FF7EDD'
  },
  {
    title: 'finance-dashboard.text-9',
    color: '#30A100'
  },
  {
    title: 'finance-dashboard.text-2',
    color: '#FFA95E'
  },
  {
    title: 'finance-dashboard.text-5',
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
            Динамика ФОТ
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
        <chart-bar :colors="colors" />
      </template>

      <template v-if="activeTabIndex === 1">
        branch
      </template>
    </chart-card>
  </div>
</template>

<style scoped>

</style>
