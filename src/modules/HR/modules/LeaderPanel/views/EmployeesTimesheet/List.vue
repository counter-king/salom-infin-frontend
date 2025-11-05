<script setup>
// core
import { ref, inject, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute} from 'vue-router'
// components
import HeaderToolbar from '../../components/EmployeeTimesheet/HeaderToolbar.vue'
// utils
// store
import { useEmployeeTimesheetStore } from '../../stores/employeeTimesheet.js'
// enums

// composibles
const employeeTimesheetStore = useEmployeeTimesheetStore()
const { t, locale } = useI18n()

const route = useRoute()
// reactives


const onClickRow = (data) => {
  console.log(data)
}

</script>
<template>
  <div class="mt-4">
    <HeaderToolbar />
    <base-data-table
      :action-list="employeeTimesheetStore.getEmployeeTimesheetList"
      :api-params="{ ...route.query }"
      :headers="employeeTimesheetStore.headers"
      :loading="employeeTimesheetStore.employeeTimesheetListLoading"
      :total-count="employeeTimesheetStore.employeeTimesheetListTotalCount"
      :value="employeeTimesheetStore.employeeTimesheetList"
      scroll-height="calc(100vh - 295px)"
      @emit:row-click="onClickRow"
    >
      <template #date>
        <div class="text-sm font-medium text-greyscale-900">
          123
        </div>
      </template>
      <template #actions="{ data }">
        <base-button
          :label="t('approve')"
          :class="['!rounded-full']"
          @click="sendNotification(data)"
        />
      </template>
    </base-data-table> 
  </div>
</template>