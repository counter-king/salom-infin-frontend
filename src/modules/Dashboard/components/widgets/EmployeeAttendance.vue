<script setup>
// Core
import { onMounted, ref } from "vue"
import { useI18n } from "vue-i18n"
// Store
import { useAttendanceStore } from "@/modules/Dashboard/stores/attendance.store"
import { useAuthStore } from "@/modules/Auth/stores"
// Utils
import { formatHour } from "@/utils/formatDate"
import { getUzbekMonthName } from "@/utils"
// Components
import { AltArrowRightIcon } from "@/components/Icons"
import AttendanceStatus from "@/modules/HR/modules/Attendance/components/AttendanceStatus.vue"
import Empty from "@/components/Empty.vue"
import AttendanceEntryHours from "@/modules/HR/modules/Attendance/components/AttendanceEntryHours.vue";

// Composable
const { t } = useI18n()
const store = useAttendanceStore()
const currentUser = useAuthStore().currentUser

// Hooks
onMounted(async () => {
  await store.actionDashboardAttendanceList()
})

</script>

<template>
  <div class="relative flex flex-col shadow-button rounded-2xl bg-white p-5 pr-2 gap-y-2">
    <div class="flex items-center justify-between">
      <div class="text-base text-greyscale-900 font-semibold">{{ t('attendance') }}</div>
    </div>

    <div class="flex flex-col h-full">
      <div class="flex p-2 items-center text-greyscale-500 text-xs font-medium">
        <div class="w-[10%]">{{ t('date') }}</div>
        <div class="w-[15%]">{{ t('arrival-time') }}</div>
        <div class="w-[15%]">{{ t('departure-time') }}</div>
        <div class="w-[55%]">{{ t('status') }}</div>
        <div class="w-[5%]"></div>
      </div>

      <div class="h-full">
        <template v-if="store.listLoading">
          <base-spinner content/>
        </template>

        <template v-else>
          <template v-if="store.attendanceList?.length && currentUser?.hik_person_code">
            <div class="flex flex-col overflow-y-auto h-[255px]">
              <div
                v-for="item in store.attendanceList"
                :key="item.id"
                class="flex p-2 items-center"
              >
                <div class="w-[10%]">
                  <div class="flex flex-col w-10 h-10 rounded-lg border border-info-200 overflow-hidden">
                    <div class="flex justify-center items-center bg-info-30 h-[14px]">
                      <span class="text-[9px] text-info-500 font-semibold">{{ getUzbekMonthName(item.date) }}</span>
                    </div>
                    <div class="flex justify-center items-center">
                      <span class="text-lg text-greyscale-900 font-normal">{{ new Date(item.date).getDate() }}</span>
                    </div>
                  </div>
                </div>
                <div class="text-sm text-greyscale-900 font-medium w-[15%] pl-[2px]">
                  {{ formatHour(item.first_check_in) }}
                </div>
                <div class="text-sm text-greyscale-900 font-medium w-[15%] pl-[2px]">
                  {{ formatHour(item.last_check_out) }}
                </div>
                <attendance-status
                  :item="item"
                  class="w-[55%] pl-[2px]"
                />
                <div class="flex flex-1 justify-end pr-2">
                  <base-iconify
                    :icon="AltArrowRightIcon"
                    class="text-greyscale-300 !w-6 !h-6"
                  />
                </div>
              </div>
            </div>

            <!--          <div>-->
            <!--            Bu yerda soat knopka boladi-->
            <!--          </div>-->
          </template>

          <template v-else>
            <div class="flex justify-center items-center h-full">
              <empty
                title="not-connected-face-id"
                label-classes="text-greyscale-800 !text-base font-semibold"
                wrapper-class="w-full h-full shadow-none"
              />
            </div>
          </template>
        </template>
      </div>
    </div>

<!--    <div class="flex justify-center items-center absolute inset-0 rounded-2xl backdrop-blur-[2px] bg-white/30">-->
<!--      <div class="flex gap-x-3 items-center">-->
<!--        <div class="flex justify-center items-center w-10 h-10 rounded-full bg-warning-50">-->
<!--          <base-iconify-->
<!--            :icon="ClockCircleBoldIcon"-->
<!--            class="text-warning-500"-->
<!--          />-->
<!--        </div>-->

<!--        <div class="text-sm font-medium text-greyscale-900">{{ t('soon') }}</div>-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<style scoped>

</style>
