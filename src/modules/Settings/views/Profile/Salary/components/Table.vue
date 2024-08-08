<script setup>
// Core
import { watch, onBeforeUnmount } from 'vue'
// Components
import { ActionToolbar, ExportButton } from '@/components/Actions'
// Stores
import { useSalaryStore } from '../../../../stores/profile/salary.store'
// Utils
import { numberFormat } from '@/utils/formatIntl'
// Composable
const salaryStore = useSalaryStore()
// Watch
watch(
  () => salaryStore.isLoggedIn,
  async () => salaryStore.isLoggedIn && await salaryStore.getUserSalary()
)
// Methods
const dateSelect = async (value) => {
  const [_, month, year] = value.split('.')
  await salaryStore.getUserSalary(new Date(year, month - 1, 1))
}
// Hooks
onBeforeUnmount(() => {
  salaryStore.resetStore()
})
</script>

<template>
  <action-toolbar title="Ежемесячная зарплата">
    <template #filters>
      <export-button />

      <base-calendar-button date-format="dd-mm-yyyy" @emit:date-select="dateSelect" />
    </template>
  </action-toolbar>

  <template v-if="!salaryStore.isLoggedIn">
    <div
      class="flex justify-center items-center bg-white shadow-button rounded-xl"
      style="height: calc(100vh - 650px)"
    >
      <div class="text-center">
        <img src="/images/cloud-table-empty.svg" alt="EmptyFolder" class="block mb-5" />

        <h1 class="text-greyscale-500 font-medium text-sm">У вас нет данных</h1>
      </div>
    </div>
  </template>

  <template v-else-if="salaryStore.contentLoading">
    <div
      class="flex items-center justify-center bg-white shadow-button rounded-xl"
      style="height: calc(100vh - 650px)"
    >
      <base-spinner content />
    </div>
  </template>

  <template v-else>
    <base-data-table
      :headers="salaryStore.headers"
      :value="salaryStore.salaryList"
      scroll-height="calc(100vh - 470px)"
    >
      <template #empty>
        <div
          class="w-full flex justify-center items-center rounded-lg"
          style="height: calc(100vh - 470px)"
        >
          <div class="text-center">
            <img src="/images/cloud-table-empty.svg" alt="EmptyFolder" class="block mb-5" />

            <h1 class="text-greyscale-500 font-medium text-sm">У вас нет данных</h1>
          </div>
        </div>
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
