<script setup>
// core
import { ref, inject, watch } from 'vue'
import { useRoute} from 'vue-router'
// components
import Status from '../../components/MyAttendance/Status.vue'
import AttendanceStatus from '../../components/AttendanceReasonCellStatus.vue'
// store
import { useMyAttendanceStore } from '../../store/myAttendence.store'
// utils
import { formatDateCalendar } from '@/utils/formatDate'
// composibles
const attendanceStore = useMyAttendanceStore()
// inject
const calendarDaysWithAttendance = inject('calendarDaysWithAttendance')

const route = useRoute()
</script>
<template>
  <div class="mt-4">
    <base-data-table
      :headers="attendanceStore.headers"
      :loading="attendanceStore.myAttendanceListLoading"
      :total-count="attendanceStore.myAttendanceListTotalCount"
      :value="calendarDaysWithAttendance"
      scroll-height="calc(100vh - 495px)"
    >
      <template #date="{ data }">
        {{ formatDateCalendar(data?.attendance?.date) }}
      </template>
      <template #status="{ data }">
        <status :status="data?.attendance?.status"/>
      </template>
      <template #status2="{ data }">
        <AttendanceStatus :status="data?.attendance?.status"/>
      </template>
    </base-data-table> 
  </div>
</template>