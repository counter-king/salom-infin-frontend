<script setup>
// core
import { useRoute } from 'vue-router'
// components
// store
// constants
// utils
// store
import { useMyAttendanceStore } from '../../stores/index.js'
// composibles
const attendanceStore = useMyAttendanceStore()

const route = useRoute()
</script>
<template>
  <div class="mt-4">
    <base-data-table
      :action-list="attendanceStore.actionGetMyAttendanceList"
      :api-params="{ ...route.query, page_size: 15 } ?? null"
      :headers="attendanceStore.headers"
      :loading="attendanceStore.myAttendanceListLoading"
      :total-count="attendanceStore.myAttendanceTotalCount"
      :value="[{
        date: '2025-05-15',
        week_days: 'Понедельник'
      },
      {
        date: '2025-05-15',
        week_days: 'Понедельник'
      },
      {
        date: '2025-05-15',
        week_days: 'Понедельник'
      }]"
      scroll-height="calc(100vh - 295px)"
    >
      <!-- <template #status="{ data }">
        <status
          :status="data.is_approved"
          type="approval"
        />
      </template>
      -->
    </base-data-table> 
  </div>
</template>