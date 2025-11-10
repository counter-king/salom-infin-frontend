<script setup>
// Core
import { computed, onMounted } from "vue"
import { useI18n } from "vue-i18n"
import { useRoute, useRouter } from "vue-router"
// Enums
import { HR_TIMESHEET_TABLE_COLUMN } from "@/modules/HR/constants"
// Store
import { useTableSystemStore } from "@/modules/HR/modules/TimesheetSystem/stores/tableSystem.store"
// Components
import { ActionToolbar } from "@/components/Actions"
import BaseDataTable from "@/components/UI/BaseDataTable.vue"

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
    />

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

    </base-data-table>
    <pre>{{ store.selectedItems }}</pre>
  </div>
</template>

<style scoped>

</style>
