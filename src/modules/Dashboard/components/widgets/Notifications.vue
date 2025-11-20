<script setup>
// Core
import { onMounted, ref } from "vue"
import { useI18n } from "vue-i18n"
import { useRouter } from "vue-router"
// Store
import { useNotificationStore } from "@/modules/Dashboard/stores/notification.store"
import { useAttendanceStore } from "@/modules/Dashboard/stores/attendance.store"
// Utils
import { formatDate, formatHour } from "@/utils/formatDate"
import { formatUzbekDate, returnLateTime } from "@/utils"
// Components
import LateCameReasonModal from "@/modules/Dashboard/components/Attendance/LateCameReasonModal.vue"

// Composable
const { t, locale } = useI18n()
const store = useNotificationStore()
const dashboardAttendanceStore = useAttendanceStore()
const router = useRouter()

// Reactive
const lateCameReasonDialog = ref(false)

// Methods
const onItemClick = async (item) => {
  await router.push({
    name: item.route.name,
    query: item.route.query
  })
}
const onAttendanceClick = async (attendance) => {
  store.attendanceModel = attendance
  lateCameReasonDialog.value = true
}

// Hooks
onMounted( async() => {
  await dashboardAttendanceStore.actionDashboardNotificationAttendanceList({ status: 'lateness', has_reason: false })
})
</script>

<template>
  <div class="relative flex flex-col shadow-button rounded-2xl bg-white p-5 pr-2 gap-y-2">
    <div class="flex items-center justify-between">
      <div class="text-base text-greyscale-900 font-semibold">{{ t('my-tasks-2') }}</div>
    </div>

    <div class="flex flex-col overflow-y-auto h-full">
      <template v-if="dashboardAttendanceStore.notificationAttendanceLoading">
        <base-spinner />
      </template>

      <template v-else>
        <template v-if="dashboardAttendanceStore.notificationAttendanceList?.length">
          <div
            v-for="attendance in dashboardAttendanceStore.notificationAttendanceList"
            :key="attendance.id"
            class="flex justify-between items-center px-4 py-2 rounded-xl border-b border-b-greyscale-300 !border-dashed cursor-pointer hover:bg-greyscale-50 group"
            @click="onAttendanceClick(attendance)"
          >
            <div class="flex gap-x-3">
              <div class="flex justify-center items-center w-10 h-10 bg-greyscale-50 rounded-full group-hover:bg-white">
                <img src="/images/dashboard/alarm-clock.svg" alt="alarm clock">
              </div>

              <div class="flex flex-col gap-y-1">
                <div class="text-[13px] text-greyscale-900 font-semibold">
                  {{ attendance.today ? t('today-you-are-late') : t('you-are-late') }}
                  <span
                    v-if="returnLateTime(attendance.first_check_in)"
                    class="text-critic-500 text-[13px] font-semibold"
                  >
                    {{ returnLateTime(attendance.first_check_in, attendance.last_check_out, locale, 'entry') }}
                  </span>
                </div>

                <div class="text-xs text-greyscale-500 font-normal">
                  {{ formatDate(attendance.date) }}
                </div>
              </div>
            </div>

            <div
              class="rounded-[6px] bg-greyscale-50 px-3 text-greyscale-500 group-hover:bg-white group-hover:text-primary-500 text-xs font-medium h-fit py-1">
              {{ t('enter-reason') }}
            </div>
          </div>
        </template>

        <div
          v-for="item in store.tempData"
          :key="item.id"
          class="flex justify-between items-center px-4 py-2 rounded-xl border-b border-b-greyscale-300 !border-dashed cursor-pointer hover:bg-greyscale-50 group"
          @click="onItemClick(item)"
        >
          <div class="flex gap-x-3">
            <div class="flex justify-center items-center w-10 h-10 bg-greyscale-50 rounded-full group-hover:bg-white">
              <img :src="item.icon" alt="alarm clock">
            </div>

            <div class="flex flex-col gap-y-1">
              <div class="text-[13px] text-greyscale-900 font-semibold">{{ item.title }}<span v-if="item.id === 1"
                                                                                              class="text-critic-500 text-[13px] font-semibold"> +32 daq</span>
              </div>
              <div class="text-xs text-greyscale-500 font-normal">
                {{ `${formatHour(item.time)}, ${new Date().getDate()}-${formatUzbekDate(item.time, true)}` }}
              </div>
            </div>
          </div>

          <div
            class="rounded-[6px] bg-greyscale-50 px-3 text-greyscale-500 group-hover:bg-white group-hover:text-primary-500 text-xs font-medium h-fit py-1">
            {{ item.buttonLabel }}
          </div>
        </div>
      </template>
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

    <late-came-reason-modal
      v-model="lateCameReasonDialog"
    >

    </late-came-reason-modal>
  </div>
</template>

<style scoped>

</style>
