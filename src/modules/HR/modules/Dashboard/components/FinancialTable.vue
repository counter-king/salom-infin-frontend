<script setup>
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHRDashboardStore } from '../stores'
import { BodySlotTable, RowTable, ColTable } from '@/components/Table'
import { numberFormat } from '@/utils/formatIntl'

const { t } = useI18n()
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
        <col-table>{{ t('head-office') }}</col-table>

        <template v-for="item in dashboardStore.payrolls?.values?.head_office">
          <col-table class="!text-center !w-[12.5%]">{{ numberFormat(item.amount) }}</col-table>
        </template>

        <col-table class="!w-[12.5%] text-center">
          <strong class="font-bold text-[#000]">
            {{ numberFormat(dashboardStore.payrolls?.values?.head_office_all_count.amount) }}
          </strong>
        </col-table>
      </row-table>

      <row-table index="2">
        <col-table>{{ t('branch') }}</col-table>

        <template v-for="item in dashboardStore.payrolls?.values?.branches">
          <col-table class="!text-center !w-[12.5%]">{{ numberFormat(item.amount) }}</col-table>
        </template>

        <col-table class="!w-[12.5%] text-center">
          <strong class="font-bold text-[#000]">
            {{ numberFormat(dashboardStore.payrolls?.values?.branches_all_count.amount) }}
          </strong>
        </col-table>
      </row-table>

      <row-table index="3">
        <col-table>
          <strong class="font-bold text-[#000]">{{ t('total') }}:</strong>
        </col-table>

        <template v-for="item in 6">
          <col-table class="!text-center"></col-table>
        </template>

        <col-table class="!w-[12.5%] !text-center">
          <strong class="font-bold text-[#000]">
            {{ numberFormat(dashboardStore.payrolls?.values?.head_office_all_count.amount + dashboardStore.payrolls?.values?.branches_all_count.amount) }}
          </strong>
        </col-table>
      </row-table>
    </template>
  </body-slot-table>
</template>

<style scoped>

</style>
