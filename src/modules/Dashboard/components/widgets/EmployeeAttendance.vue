<script setup>
// Core
import { onMounted, ref } from "vue"
import { useI18n } from "vue-i18n"
// Store
import { useAttendanceStore } from "@/modules/Dashboard/stores/attendance.store"
// Components
import { AltArrowRightIcon, InfoCircleBoldIcon } from "@/components/Icons";
import { getUzbekMonthName } from "@/utils";
import { formatHour } from "../../../../utils/formatDate";
import AttendanceStatus from "@/modules/HR/modules/Attendance/components/AttendanceStatus.vue";

// Composable
const { t } = useI18n()
const store = useAttendanceStore()

// Hooks
onMounted(async () => {
  await store.actionDashboardAttendanceList()
})



</script>

<template>
  <div class="flex flex-col shadow-button rounded-2xl bg-white p-5 pr-2 gap-y-2">
    <div class="flex items-center justify-between">
      <div class="text-base text-greyscale-900 font-semibold">{{ t('attendance') }}</div>
    </div>

    <div class="flex flex-col">
      <div class="flex p-2 items-center text-greyscale-500 text-xs font-medium">
        <div class="w-1/5">{{ t('date') }}</div>
        <div class="w-1/5">{{ t('arrival-time') }}</div>
        <div class="w-1/5">{{ t('departure-time') }}</div>
        <div class="w-[30%]">{{ t('status') }}</div>
        <div class="w-[10%]"></div>
      </div>

      <div class="flex flex-col overflow-y-auto h-[260px]">
        <template v-if="store.listLoading">
          <base-spinner content/>
        </template>
        <template v-else>
          <div
            v-for="item in store.attendanceList"
            :key="item.id"
            class="flex p-2 items-center"
          >
            <div class="w-1/5">
              <div class="flex flex-col w-10 h-10 rounded-lg border border-info-200 overflow-hidden">
                <div class="flex justify-center items-center bg-info-30 h-[14px]">
                  <span class="text-[9px] text-info-500 font-semibold">{{ getUzbekMonthName(item.date) }}</span>
                </div>
                <div class="flex justify-center items-center">
                  <span class="text-lg text-greyscale-900 font-normal">{{ new Date(item.date).getDate() }}</span>
                </div>
              </div>
            </div>
            <div class="text-sm text-greyscale-900 font-medium w-1/5 pl-[2px]">{{ formatHour(item.first_check_in) }}</div>
            <div class="text-sm text-greyscale-900 font-medium w-1/5 pl-[2px]">{{ formatHour(item.last_check_out) }}</div>
            <attendance-status
              :item="item"
              class="w-[30%] pl-[2px]"
            />
            <div class="flex flex-1 justify-end pr-2">
              <base-iconify
                :icon="AltArrowRightIcon"
                class="text-greyscale-300 !w-6 !h-6"
              />
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
