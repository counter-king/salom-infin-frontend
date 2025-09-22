<script setup>
// Core
import { computed, onMounted, ref, watch } from "vue"
import { useI18n } from "vue-i18n"
import { useRoute, useRouter } from "vue-router"
// Store
import { useHRAttendanceStore } from "@/modules/HR/modules/Attendance/stores/attendance.store"
// Enums
import { HR_ATTENDANCE_COLUMNS } from "@/modules/HR/constants"
// Utils
import { formatDate, formatDateReverse, formatHour } from "@/utils/formatDate"
import { getFirstDateOfCurrentMonth, returnDateRange } from "@/utils"
// Components
import { ActionToolbar } from "@/components/Actions"
import DataTable from "@/modules/HR/modules/InteractionABS/components/DataTable.vue"
import { InfoCircleBoldIcon } from "@/components/Icons"
import AttendanceStatus from "@/modules/HR/modules/Attendance/components/AttendanceStatus.vue"
import Dropdown from "@/modules/Handbook/components/Dropdown.vue"
import { fetchCompaniesList } from "@/services/common.service";

// Composable
const { t } = useI18n()
const store = useHRAttendanceStore()
const router = useRouter()
const route = useRoute()

// Reactive
const branchSelect = ref(null)
const branches = ref([])

// Watch
watch(
  () => route.query,
  async (newQuery, oldQuery) => {
    const params = {
      page: 1,
      page_size: 15,
      ...router.currentRoute.value.query,
      status: newQuery.status || undefined,
      start_date: newQuery.created_start_date || formatDateReverse(getFirstDateOfCurrentMonth()),
      end_date: newQuery.created_end_date || formatDateReverse(new Date()),
      company: newQuery.company || branchSelect.value
    }

    // If "status" is the only thing that changed, skip count request
    const onlyStatusChanged =
      Object.keys(newQuery).length === Object.keys(oldQuery || {}).length &&
      Object.keys(newQuery).every(
        key => key === "status" ? newQuery[key] !== oldQuery?.[key] : newQuery[key] === oldQuery?.[key]
      )

    if (onlyStatusChanged) {
      // Skip both API calls
      return
    }

    await store.actionGetAttendanceCountByStatus(params)
    await store.actionGetAttendanceList(params)
  },
  {deep: true}
)

// Computed
const apiParams = computed(() => {
  return {
    start_date: formatDateReverse(getFirstDateOfCurrentMonth()),
    end_date: formatDateReverse(new Date()),
    company: branchSelect.value || undefined,
    page: 1,
    page_size: 15
  }
})
const dateRange = computed(() => {
  return returnDateRange(route.query.created_start_date || apiParams.value.start_date, route.query.created_end_date || apiParams.value.end_date)
})

// Methods
const onSort = () => {

}
const init = async () => {
  let {data} = await fetchCompaniesList({page_size: 100})
  branches.value = data.results
  branchSelect.value = data.results[0]?.id

  if (Object.keys(route.query).length > 0) {
    const params = {
      ...route.query,
      start_date: route.query.created_start_date || formatDateReverse(getFirstDateOfCurrentMonth()),
      end_date: route.query.created_end_date || formatDateReverse(new Date()),
      company: route.query.company || branchSelect.value
    }
    await store.actionGetAttendanceCountByStatus(params)
    await store.actionGetAttendanceList(params)
    if (route.query?.company) {
      branchSelect.value = Number(route.query?.company)
    }
  } else {
    await store.actionGetAttendanceCountByStatus(apiParams.value)
    await store.actionGetAttendanceList(apiParams.value)
  }
}
const onBranchChange = async (val) => {
  await router.replace({
    query: {
      ...route.query,
      page: 1,
      company: val
    }
  })
}
const onStatusClick = async (item) => {
  if (item.value !== 'not_registered_on_faceid') {
    await router.replace({
      query: {
        ...route.query,
        status: item.value
      }
    })

    if (item.value === 'all') {
      await store.actionGetAttendanceList(apiParams.value)
    } else {
      await store.actionGetAttendanceList({
        ...route.query,
        status: item.value
      })
    }
  }
}

// Hooks
onMounted(async () => {
  await init()
})
</script>

<template>
  <div class="attendance-list-view">
    <action-toolbar
      :action-buttons="['calendar']"
      title="attendance"
      :column-menu-items="store.headers"
      :storage-columns-name="HR_ATTENDANCE_COLUMNS"
      @emit:reset-headers="store.resetHeaders"
    >
      <template #title-after>
        <div class="text-2xl font-semibold text-greyscale-500">{{ dateRange }}</div>
      </template>

      <template #filter-before>
        <dropdown
          v-model="branchSelect"
          v-model:options="branches"
          api-url="companies"
          placeholder="Филиал"
          class="min-w-[300px]"
          @emit:change="val => onBranchChange(val)"
        />
      </template>
    </action-toolbar>

    <div class="flex gap-x-2 mb-4">
      <div
        v-for="item in store.statusItems"
        :key="item.id"
        class="flex flex-col rounded-[20px] h-24 bg-white w-full p-4 gap-y-3 cursor-pointer"
        @click="onStatusClick(item)"
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
            <template v-if="store.countsLoading">
              <div>
                <base-spinner rootClasses="!w-6 !h-6"/>
              </div>
            </template>
            <template v-else>
              <div class="text-[20px] font-semibold text-greyscale-900">{{ item.count }}</div>
            </template>
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
        :api-params="apiParams"
        @emit:onSort="onSort"
        @emit:set-store-headers="(val) => store.headers = val"
      >
        <template #employee="{ data }">
          <div class="flex items-center gap-3">
<!--            <pre>{{ data.user }}</pre>-->
            <base-avatar
              :label="data.user?.full_name"
              :image="null"
              :color="data.user?.color"
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

        <template #status="{ data }">
          <attendance-status :item="data" />
        </template>
      </DataTable>
    </div>
  </div>
</template>

<style scoped>

</style>
