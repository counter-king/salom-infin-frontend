<script setup>
import { ref, onMounted } from 'vue'
import { useHRDashboardStore } from '../stores'
import { BodySlotTable, RowTable, ColTable } from '@/components/Table'
import { numberFormat } from '@/utils/formatIntl'

const dashboardStore = useHRDashboardStore()

onMounted(async () => {
  await dashboardStore.actionDashboardPayrolls({
    start_date: '2024-01-01',
    end_date: '2025-12-31',
  })
})
</script>

<template>
  <body-slot-table :headers="dashboardStore.payrolls.headers">
    <template #body>
      <row-table index="1">
        <col-table>Головной офис</col-table>

        <template v-for="item in dashboardStore.payrolls?.values?.head_office">
          <col-table class="text-center">{{ numberFormat(item.amount) }}</col-table>
        </template>
      </row-table>

      <row-table index="2">
        <col-table>Филиал</col-table>

        <template v-for="item in dashboardStore.payrolls?.values?.branches">
          <col-table class="text-center">{{ numberFormat(item.amount) }}</col-table>
        </template>
      </row-table>
    </template>
  </body-slot-table>
</template>

<style scoped>

</style>
