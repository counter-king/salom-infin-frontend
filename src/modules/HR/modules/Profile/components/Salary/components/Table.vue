<script setup>
// Core
import { watch } from 'vue'
// Components
import { ActionToolbar, ExportButton } from '@/components/Actions'
import Empty from '@/components/Empty.vue'
// Stores
import { useSalaryStore } from '../../../stores/salary.store'
// Utils
import { numberFormat } from '@/utils/formatIntl'
// Composable
const salaryStore = useSalaryStore()
// Watch
watch(
  () => salaryStore.isLoggedIn,
  async () => salaryStore.isLoggedIn && await salaryStore.getSalary()
)
// Methods
const dateSelect = async (value) => {
  const [_, month, year] = value.split('.')
  await salaryStore.getSalary(new Date(year, month - 1, 1))
}
</script>

<template>
  <action-toolbar title="Ежемесячная зарплата">
    <template #filters>
      <export-button root-class="!bg-greyscale-50 !border !border-greyscale-70 !shadow-none" />

      <base-calendar-button
        view="month"
        date-format="dd-mm-yyyy"
        @emit:date-select="dateSelect"
        root-class="!bg-greyscale-50 !border !border-greyscale-70 !shadow-none"
      />
    </template>
  </action-toolbar>

  <template v-if="!salaryStore.isLoggedIn">
    <empty class="h-[calc(100vh-650px)]" />
  </template>

  <template v-else-if="salaryStore.contentLoading">
    <div
      class="flex items-center justify-center bg-primary-10 rounded-2xl"
      style="height: calc(100vh - 650px)"
    >
      <base-spinner content />
    </div>
  </template>

  <template v-else>
    <base-data-table
      :headers="salaryStore.headers"
      :value="salaryStore.salaryList"
      :roundable="false"
      scroll-height="calc(100vh - 470px)"
    >
      <template #empty>
        <empty class="h-[calc(100vh-470px)]" />
      </template>

      <template #pay_name="{ data }">
        <span class="text-sm font-medium text-greyscale-900">{{ data.pay_name }}</span>
      </template>

      <template #paid="{ data }">
        <span class="text-sm font-medium text-greyscale-900">
          {{ numberFormat(data.paid) }} сум
        </span>
      </template>
    </base-data-table>
  </template>
</template>
