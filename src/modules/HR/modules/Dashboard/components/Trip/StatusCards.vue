<script setup>
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHRDashboardStore } from '../../stores'
import Card from '../Card.vue'
import {
  CheckListMinimalisticIcon,
  AlarmBoldIcon,
  MapPointBoldIcon,
  ClipboardCheckBoldIcon,
  Flag2BoldIcon
} from '@/components/Icons'

const { t } = useI18n()
const dashboardStore = useHRDashboardStore()

onMounted(async() => {
  await dashboardStore.actionTripStatus()
})
</script>

<template>
  <div class="grid grid-cols-5 gap-2">
    <card class="!p-4">
      <template v-if="dashboardStore.tripStatus.loader">
        <base-spinner root-classes="!w-8 !h-8" />
      </template>

      <template v-else>
        <div class="flex items-center gap-3">
          <div class="flex items-center justify-center w-8 h-8 bg-info-500 rounded-full">
            <base-iconify :icon="CheckListMinimalisticIcon" class="text-white" />
          </div>

          <h1 class="text-lg font-semibold text-greyscale-900">{{ dashboardStore.tripStatus.data.all }}</h1>
        </div>

        <h2 class="text-sm font-medium text-greyscale-900 mt-3">{{ t('total') }}</h2>
      </template>
    </card>

    <card class="!p-4">
      <template v-if="dashboardStore.tripStatus.loader">
        <base-spinner root-classes="!w-8 !h-8" />
      </template>

      <template v-else>
        <div class="flex items-center gap-3">
          <div class="flex items-center justify-center w-8 h-8 bg-warning-500 rounded-full">
            <base-iconify :icon="AlarmBoldIcon" class="text-white" />
          </div>

          <h1 class="text-lg font-semibold text-greyscale-900">{{ dashboardStore.tripStatus.data.not_started }}</h1>
        </div>

        <h2 class="text-sm font-medium text-greyscale-900 mt-3">{{ t('hr-trip-dashboard.on-start') }}</h2>
      </template>
    </card>

    <card class="!p-4">
      <template v-if="dashboardStore.tripStatus.loader">
        <base-spinner root-classes="!w-8 !h-8" />
      </template>

      <template v-else>
        <div class="flex items-center gap-3">
          <div class="flex items-center justify-center w-8 h-8 bg-critic-300 rounded-full">
            <base-iconify :icon="MapPointBoldIcon" class="text-white" />
          </div>

          <h1 class="text-lg font-semibold text-greyscale-900">{{ dashboardStore.tripStatus.data.on_trip }}</h1>
        </div>

        <h2 class="text-sm font-medium text-greyscale-900 mt-3">{{ t('hr-trip-dashboard.on-site') }}</h2>
      </template>
    </card>

    <card class="!p-4">
      <template v-if="dashboardStore.tripStatus.loader">
        <base-spinner root-classes="!w-8 !h-8" />
      </template>

      <template v-else>
        <div class="flex items-center gap-3">
          <div class="flex items-center justify-center w-8 h-8 bg-primary-400 rounded-full">
            <base-iconify :icon="ClipboardCheckBoldIcon" class="text-white" />
          </div>

          <h1 class="text-lg font-semibold text-greyscale-900">{{ dashboardStore.tripStatus.data.reporting }}</h1>
        </div>

        <h2 class="text-sm font-medium text-greyscale-900 mt-3">{{ t('hr-trip-dashboard.report') }}</h2>
      </template>
    </card>

    <card class="!p-4">
      <template v-if="dashboardStore.tripStatus.loader">
        <base-spinner root-classes="!w-8 !h-8" />
      </template>

      <template v-else>
        <div class="flex items-center gap-3">
          <div class="flex items-center justify-center w-8 h-8 bg-[#2DB06A] rounded-full">
            <base-iconify :icon="Flag2BoldIcon" class="text-white" />
          </div>

          <h1 class="text-lg font-semibold text-greyscale-900">{{ dashboardStore.tripStatus.data.closed }}</h1>
        </div>

        <h2 class="text-sm font-medium text-greyscale-900 mt-3">{{ t('hr-trip-dashboard.finished') }}</h2>
      </template>
    </card>
  </div>
</template>

<style scoped>

</style>
