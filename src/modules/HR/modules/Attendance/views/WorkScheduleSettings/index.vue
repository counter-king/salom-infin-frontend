<script setup>
// Const
import { HR_BUSINESS_TRIP_COLUMNS, HR_WORK_SCHEDULE_COLUMNS } from "@/modules/HR/constants"
// Store
import { useWorkScheduleSettingStore } from "@/modules/HR/modules/Attendance/stores/workSchedule.store"
// Components
import { ActionToolbar } from "@/components/Actions"
import BaseDataTable from "@/components/UI/BaseDataTable.vue";

// Composable
const store = useWorkScheduleSettingStore()

// Methods
const onRowClick = (row) => {

}
</script>

<template>
  <div class="work-schedule-settings">
    <action-toolbar
      title="schedule-settings"
      :action-list="store.actionGetWorkScheduleList"
      :column-menu-items="store.headers"
      :storage-columns-name="HR_WORK_SCHEDULE_COLUMNS"
      :action-buttons="[]"
      search-field
      @emit:reset-headers="store.actionResetHeaders"
    >
    </action-toolbar>

    <base-data-table
      :action-list="store.actionGetWorkScheduleList"
      :loading="store.listLoading"
      :total-count="store.totalCount"
      :value="store.workScheduleList"
      :headers="store.headers"
      :storage-columns-name="HR_WORK_SCHEDULE_COLUMNS"
      scroll-height="calc(100vh - 295px)"
      @emit:set-store-headers="(val) => store.headers = val"
      @emit:row-click="onRowClick"
    >

    </base-data-table>
  </div>
</template>

<style scoped>

</style>
