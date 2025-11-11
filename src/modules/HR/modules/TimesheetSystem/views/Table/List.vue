<script setup>
// Core
import { computed, onMounted, ref } from "vue"
import { useI18n } from "vue-i18n"
import { useRoute, useRouter } from "vue-router"
// Enums
import { HR_TIMESHEET_TABLE_COLUMN } from "@/modules/HR/constants"
// Store
import { useTableSystemStore } from "@/modules/HR/modules/TimesheetSystem/stores/tableSystem.store"
// Components
import { ActionToolbar } from "@/components/Actions"
import BaseDataTable from "@/components/UI/BaseDataTable.vue"
import { formatMonthYear } from "@/utils";
import TableStatus from "@/modules/HR/modules/TimesheetSystem/components/TableStatus.vue"
import { AddPlusIcon } from "@/components/Icons";
import { ModalComment } from "@/components/Modal";

// Composable
const {t} = useI18n()
const store = useTableSystemStore()
const route = useRoute()
const router = useRouter()

// Computed
const apiParams = computed(() => {
  return {
    page: 1,
    page_size: 10,
    ...route.query,
    status: route.query.status || 'in_review',
  }
})

// Methods
const onRowClick = async (row) => {
  await router.push({
    name: "TimesheetSystemTableShow",
    params: {
      id: row.id
    }
  })
}
const onFilterChange = async (item) => {
  if (route.query.status !== item.value) {
    await router.replace({
      query: {
        ...route.query,
        status: item.value,
      }
    })
    store.filterItems.forEach(i => i.active = i.value === item.value)
    store.selectedItems = []
    await store.actionGetTableListByMonth(route.query)
  }
}
const init = () => {
  if (route.query.status) {
    store.filterItems.forEach(i => i.active = i.value === route.query.status)
  } else {
    store.filterItems.forEach(i => i.active = i.value === 'in_review')
  }
}
const onConfirm = () => {

}
const onReject = () => {
  store.rejectModal = true
}

// Hooks
onMounted(() => {
  init()
})
</script>

<template>
  <div class="table-list-view">
    <action-toolbar
      title="timesheet-system"
      :action-list="store.actionGetTableListByMonth"
      :column-menu-items="store.headers"
      :storage-columns-name="HR_TIMESHEET_TABLE_COLUMN"
      :action-buttons="[]"
      :filter-items="store.filterItems"
      search-field
      @emit:on-filter-change="onFilterChange"
    >
      <template #end>
        <base-button
          color="bg-primary-0 hover:bg-greyscale-100 text-critic-500"
          border-color="border-transparent"
          label="reject"
          rounded
          shadow
          type="button"
          :disabled="!(store.selectedItems && store.selectedItems.length)"
          @click="onReject"
        />

        <base-button
          label="confirm"
          rounded
          type="button"
          :disabled="!(store.selectedItems && store.selectedItems.length)"
          @click="onConfirm"
        />
      </template>
    </action-toolbar>

    <base-data-table
      v-model:selection="store.selectedItems"
      :action-list="store.actionGetTableListByMonth"
      :api-params="apiParams"
      :loading="store.listLoading"
      :total-count="store.totalCount"
      :value="store.tableListByMonth"
      :headers="store.headers"
      :storage-columns-name="HR_TIMESHEET_TABLE_COLUMN"
      selective
      scroll-height="calc(100vh - 285px)"
      @emit:set-store-headers="(val) => store.headers = val"
      @emit:row-click="onRowClick"
    >
      <template #date="{ data }">
        <span class="text-sm text-greyscale-900 font-medium">{{ formatMonthYear(data?.month, data?.year) }}</span>
      </template>

      <template #structural_division="{ data }">
        <span class="text-sm text-greyscale-900 font-medium">{{ data?.name?.name }}</span>
      </template>

      <template #table_status="{ data }">
        <TableStatus :title="data.status" />
      </template>
    </base-data-table>
    <pre>{{ store.selectedItems }}</pre>
  </div>

  <!-- REJECT MODAL -->
  <modal-comment
    v-model="store.rejectModal"
    label="reject"
    create-button-color="danger"
    :create-button-fn="store.actionRejectTable"
    :two-step-confirmation="false"
    :loading="store.rejectLoading"
  />
  <!-- /REJECT MODAL -->
</template>

<style scoped>

</style>
