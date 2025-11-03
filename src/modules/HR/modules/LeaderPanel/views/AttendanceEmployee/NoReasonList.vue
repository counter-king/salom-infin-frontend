<script setup>
// core
import { ref, inject, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
// components
import DataTable from '../../../InteractionABS/components/DataTable.vue';
import AttendanceReasonStatus from '@/modules/HR/modules/LeaderPanel/components/AttendanceReasonStatus.vue';
// stores
import { useAttendanceNoReasonStore } from '../../stores/attendanceNoReason.js';
// utils
import { formatDate, formatHour } from '@/utils/formatDate';
import { formatLateTime } from '@/utils';
// composables
const { t, locale } = useI18n()
const attendanceNoReasonStore = useAttendanceNoReasonStore()
const route = useRoute()

const sendNotification = (data) => {
  console.log(data)
}

</script>
<template>
    <div class="flex flex-col h-full">
      <DataTable
        :headers="attendanceNoReasonStore.headers"  
        :value="attendanceNoReasonStore.attendanceNoReasonList"
        :actionList="attendanceNoReasonStore.getAttendanceExceptionsNoReasonList"
        :apiParams="{ page: 1, page_size: 10, ...route.query }"
        scroll-height="calc(100vh - 360px)"
        class="flex flex-col h-full"
        :loading="attendanceNoReasonStore.attendanceNoReasonListLoading"
        :total-count="attendanceNoReasonStore.attendanceNoReasonListTotalCount"
        :pageSize="15"
        >
        <!-- body -->
          <template #employee="{ data }">
            <div class="flex items-center gap-3">
              <base-avatar  
                :label="data?.employee?.full_name"
                :image="null"
                :color="data?.employee?.color"
                detail-dialog
                :meta="data?.employee"
                avatarClasses="w-7 h-7"
              >
                <span class="text-xs font-semibold text-white">{{ data?.employee?.full_name[0] }}</span>
              </base-avatar>
              <p class="text-sm font-medium text-greyscale-900">{{ data?.employee?.full_name }}</p>
            </div>
          </template>
          <template #position="{ data }">
            <p class="text-sm font-medium text-greyscale-900">{{ data.employee?.position?.name }}</p>
          </template>
          <template #date="{ data }">
            <p class="text-sm font-medium text-greyscale-900">{{ formatDate(data?.attendance.date) }}</p>
          </template>
          <template #arrival_time="{ data }">
            <div class="flex items-center gap-8">
              <p class="text-sm font-medium text-greyscale-900">{{ formatHour(data?.attendance.first_check_in) }}</p>
              <p class="text-sm font-medium text-critic-500">{{ formatLateTime(data?.attendance.late_minutes, locale) }}</p>
            </div>
          </template>
          <template #departure_time="{ data }">
            <div class="flex items-center gap-8">
              <p class="text-sm font-medium text-greyscale-900">{{ formatHour(data?.attendance.last_check_out) }}</p>
              <p class="text-sm font-medium text-warning-500">{{ formatLateTime(data?.attendance.early_leave_minutes, locale) }}</p>
            </div>
          </template>
          <template #status="{ data }">
            <AttendanceReasonStatus :status="data?.kind" />
          </template>
          <template #actions="{ data }">
            <base-button
              :label="t('send-notification')"
              :class="['!rounded-full', {'!bg-greyscale-200 !text-greyscale-300 border-none': true}]"
              @click="sendNotification(data)"
            />
          </template>
      </DataTable>
      <!-- Filter dropdown -->
      <!-- <div 
        ref="filterDropdownRef"
        class="hidden fixed z-10 bg-[#2B2D33] rounded-xl p-1"
      >
        <component 
          :parentRef="filterDropdownRef" 
          :is="activeFilterComponent"
          :type="QUERY_NAMES[activeComponentType]"
          :apiAction="activeApiAction"
          :apiList="dataList"
          :apiParams="{ page: 1, page_size: 15 }"
          @onChange="onChangeFilter"
          :key="activeComponentType"
          />
      </div> -->
    </div>
</template>
