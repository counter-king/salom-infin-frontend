<script setup>
import { onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHRDashboardStore } from '../../stores'
import Card from '../Card.vue'

const { t } = useI18n()
const dashboardStore = useHRDashboardStore()

const totalCount = computed(() => {
  return dashboardStore.topDepartments.data.reduce((acc, val) => acc + val.count, 0)
})

onMounted(async () => {
  await dashboardStore.actionTripTopDepartments()
})
</script>

<template>
  <card>
    <h1 class="font-semibold text-greyscale-900 mb-1">{{ t('hr-main-dashboard.top-departments') }}</h1>

    <div class="h-[400px] overflow-y-auto -mr-2">
      <template v-if="dashboardStore.topDepartments.loader">
        <base-spinner />
      </template>

      <template v-else>
        <template v-for="(item, index) in dashboardStore.topDepartments.data">
          <div
            class="group flex gap-4 font-medium text-greyscale-500 rounded-xl hover:bg-greyscale-50 cursor-pointer px-3 py-[9px] mr-2"
          >
            <span class="text-sm font-medium text-greyscale-500">{{ index + 1 }}</span>

            <h1 class="flex-1 text-[13px] group-hover:text-greyscale-900">{{ item.name }}</h1>

            <span class="text-greyscale-900 text-sm font-semibold ml-4">{{ item.count }}</span>

            <span class="w-9 text-right text-sm group-hover:text-greyscale-900">
            {{ ((item.count / totalCount) * 100).toFixed(1) }}%
          </span>
          </div>
        </template>
      </template>
    </div>
  </card>
</template>

<style scoped>

</style>
