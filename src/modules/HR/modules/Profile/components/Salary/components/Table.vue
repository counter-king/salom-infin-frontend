<script setup>
// Core
import { ref, watch } from 'vue'
// Components
import { ActionToolbar, ExportButton } from '@/components/Actions'
import Empty from '@/components/Empty.vue'
// Stores
import { useSalaryStore } from '../../../stores/salary.store'
// Utils
import { firstLetterCapitalize } from '@/utils'
import { numberFormat } from '@/utils/formatIntl'
import { formatDateMonth } from '@/utils/formatDate'
// Composable
const salaryStore = useSalaryStore()
// Reactive
const date = ref(firstLetterCapitalize(formatDateMonth(new Date())))
const year = ref()
const monthName = ref()
// Watch
// watch(
//   () => salaryStore.isLoggedIn,
//   async () => salaryStore.isLoggedIn && await salaryStore.getSalary()
// )
// Methods
const dateSelect = async () => {
  monthName.value = firstLetterCapitalize(formatDateMonth(date.value))
  year.value = new Date(date.value).getFullYear().toString()
  date.value = new Date(date.value).getMonth().toString()

  await salaryStore.getSalary(new Date(year.value, date.value, 1))
}
const clear = () => {
  date.value = formatDateMonth(new Date())
  monthName.value = firstLetterCapitalize(date.value)
  salaryStore.getSalary()
}
</script>

<template>
  <action-toolbar title="Детализация">
    <template #filters>
      <span></span>
<!--      <export-button root-class="!bg-greyscale-50 !border !border-greyscale-70 !shadow-none" />-->

<!--      <base-calendar-button-->
<!--        v-model="date"-->
<!--        :parsed-text="monthName"-->
<!--        view="month"-->
<!--        date-format="mm"-->
<!--        root-class="!bg-greyscale-50 !border !border-greyscale-70 !shadow-none"-->
<!--        @emit:date-select="dateSelect"-->
<!--        @emit:clear="clear"-->
<!--      />-->
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
        <empty class="h-[350px]" />
      </template>

      <template #pay_name="{ data }">
        <span v-html="data.pay_name" class="text-sm font-medium text-greyscale-900"></span>
      </template>

      <template #paid="{ data }">
        <template v-if="data.paid === 0 && data.summ === 0">
          <span class="text-sm font-medium text-greyscale-900">
            -
          </span>
        </template>

        <template v-else>
          <span class="text-sm font-medium text-greyscale-900">
            {{ data.paid === 0 ? numberFormat(data.summ) : numberFormat(data.paid) }} сум
          </span>
        </template>
      </template>
    </base-data-table>
  </template>
</template>
