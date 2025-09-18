<script setup>
// Core
import { onMounted } from "vue"
import { useI18n } from "vue-i18n"
// Store
import { useHRAttendanceStore } from "@/modules/HR/modules/Attendance/stores/attendance.store"
// Enums
import { HR_ATTENDANCE_COLUMNS } from "@/modules/HR/constants"
// Components
import { ActionToolbar } from "@/components/Actions"
import DataTable from "@/modules/HR/modules/InteractionABS/components/DataTable.vue"
import { InfoCircleBoldIcon } from "@/components/Icons"
import { formatDate, formatHour } from "../../../../../utils/formatDate";

// Composable
const { t } = useI18n()
const store = useHRAttendanceStore()

// Methods
const onSort = () => {

}

// Hooks
onMounted(async () => {
  await store.actionGetAttendanceList()
})
</script>

<template>
  <div class="attendance-list-view">
    <action-toolbar
      :action-buttons="['export', 'filter']"
      title="attendance"
      :column-menu-items="store.headers"
      :storage-columns-name="HR_ATTENDANCE_COLUMNS"
      @emit:reset-headers="store.resetHeaders"
    >
    </action-toolbar>

    <div class="flex gap-x-2 mb-4">
      <div
        v-for="item in store.statusItems"
        :key="item.id"
        class="flex flex-col rounded-[20px] h-24 bg-white w-full p-4 gap-y-3"
      >
        <div class="flex justify-between items-start">
          <div class="flex gap-x-3 items-center">
            <div
              class="flex justify-center items-center rounded-full w-8 h-8"
              :class="item.color"
            >
              <base-iconify
                :icon="item.icon"
                class="text-white !w-5 !h-5"
              />
            </div>
            <div class="text-[20px] font-semibold text-greyscale-900">{{ item.count }}</div>
          </div>
          <base-iconify
            :icon="InfoCircleBoldIcon"
            class="text-greyscale-200 !w-5 !h-5"
          />
        </div>

        <div class="text-sm font-medium text-greyscale-900">{{ t(item.title) }}</div>
      </div>
    </div>

    <div class="flex flex-col h-full">
      <DataTable
        :headers="store.headers"
        :value="store.attendanceList"
        scroll-height="calc(100vh - 360px)"
        class="flex flex-col h-full"
        :loading="store.listLoading"
        :total-count="store.totalCount"
        :storage-columns-name="HR_ATTENDANCE_COLUMNS"
        :pageSize="15"
        @emit:onSort="onSort"
        @emit:set-store-headers="(val) => store.headers = val"
      >
        <template #employee="{ data }">
          <div class="flex items-center gap-3">
<!--            <pre>{{ data.user }}</pre>-->
            <base-avatar
              :label="data.user?.full_name"
              :image="null"
              :color="data.user?.full_name"
              detail-dialog
              :meta="data.user"
              avatarClasses="w-7 h-7"
            >
              <span class="text-xs font-semibold text-white">{{ data.user?.full_name[0] }}</span>
            </base-avatar>
            <div class="text-sm font-medium text-greyscale-900">{{ data.user?.full_name }}</div>
          </div>
        </template>

        <template #position="{ data }">
          <div class="text-sm font-medium text-greyscale-900">{{ data.user?.position?.name }}</div>
        </template>

        <template #department="{ data }">
          <div class="text-sm font-medium text-greyscale-900">{{ data.user?.top_level_department?.name }}</div>
        </template>

        <template #date="{ data }">
          <div class="text-sm font-medium text-greyscale-900">{{ formatDate(data.date) }}</div>
        </template>

        <template #arrival_time="{ data }">
          <div class="text-sm font-medium text-greyscale-900">
            {{ data.first_check_in ? formatHour(data.first_check_in) : '-' }}
          </div>
        </template>

        <template #departure_time="{ data }">
          <div class="text-sm font-medium text-greyscale-900">
            {{ data.first_check_in ? formatHour(data.last_check_out) : '-' }}
          </div>
        </template>
      </DataTable>
    </div>
  </div>
</template>

<style scoped>

</style>
