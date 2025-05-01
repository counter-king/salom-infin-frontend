<script setup>
import { ref, onMounted } from 'vue'
import { useHRDashboardStore } from '../stores'
import { BodySlotTable, RowTable, ColTable } from '@/components/Table'
import { numberFormat } from '@/utils/formatIntl'

const dashboardStore = useHRDashboardStore()

onMounted(async () => {
  const month = new Date().getMonth()
  const year = new Date().getFullYear()

  await dashboardStore.actionDashboardPayrolls({
    start_date: `${year}-01-01`,
    end_date: `${year}-${month < 9 ? '0' + month : month}-01`,
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
