<script setup>
// Core
import {computed, onMounted} from "vue"
import { useI18n } from "vue-i18n"
import {useRoute, useRouter} from "vue-router"
// Store
import { useBusinessTripStore } from "@/modules/HR/modules/BusinessTrip/stores/businessTrip.store"
// Components
import {
  BillListIcon,
  CheckListMinimalisticIcon, DocumentTextBoldIcon, FileTextBoldIcon, NotesIcon, Plus20SolidIcon
} from "@/components/Icons"
// Enums
import {
  ROUTE_HR_BUSINESS_TRIP_ADVANCE_REPORT_CREATE,
  ROUTE_HR_BUSINESS_TRIP_ADVANCE_REPORT_LIST, ROUTE_HR_BUSINESS_TRIP_CERTIFICATE,
  ROUTE_HR_BUSINESS_TRIP_PROCESS
} from "@/modules/HR/constants"

const { t } = useI18n()
const BTStore = useBusinessTripStore()
const route = useRoute()
const router = useRouter()

// Computed
const processRouteClass = computed(() => {
  return isProcessFinished.value ? 'border-success-500 bg-success-50' : route.name === ROUTE_HR_BUSINESS_TRIP_PROCESS ? 'border-primary-500 text-primary-900' : 'border-greyscale-70 text-greyscale-500'
})
const reportRouteClass = computed(() => {
  return route.name === ROUTE_HR_BUSINESS_TRIP_ADVANCE_REPORT_LIST || route.name === ROUTE_HR_BUSINESS_TRIP_ADVANCE_REPORT_CREATE ? 'border-primary-500 text-primary-900' : 'border-greyscale-70 text-greyscale-500'
})
const processIconClass = computed(() => {
  return isProcessFinished.value ? 'text-success-500' : route.name === ROUTE_HR_BUSINESS_TRIP_PROCESS ? 'text-primary-500' : 'text-greyscale-400'
})
const reportIconClass = computed(() => {
  return route.name === ROUTE_HR_BUSINESS_TRIP_ADVANCE_REPORT_LIST || route.name === ROUTE_HR_BUSINESS_TRIP_ADVANCE_REPORT_CREATE ? 'text-primary-500' : 'text-greyscale-400'
})
const isProcessFinished = computed(() => {
  return false
})
const certificateRouteClass = computed(() => {
  return route.name === ROUTE_HR_BUSINESS_TRIP_CERTIFICATE  ? 'border-primary-500 text-primary-900' : 'border-greyscale-70 text-greyscale-500'
})
const certificateIconClass = computed(() => {
  return route.name === ROUTE_HR_BUSINESS_TRIP_CERTIFICATE  ? 'text-primary-500' : 'text-greyscale-400'
})

// Methods
const openRoute = async (routeName) => {
  await router.replace({
    name: routeName
  })
}

// Hooks
onMounted( async () => {
  await BTStore.actionGetBusinessTripDetail(route.params.id)
})
</script>

<template>
  <template v-if="BTStore.detailLoading">
    <base-spinner />
  </template>
  <template v-else>
    <div class="business-trip-detail-view bg-white shadow-block h-full rounded-2xl relative">
      <div class="flex items-center justify-between w-full py-4 px-6 border-b-[1.5px]">
        <div class="flex items-center">
          <div
            class="flex gap-x-2 items-center py-[10px] px-4 border rounded-[80px] text-base font-semibold cursor-pointer"
            :class="processRouteClass"
            @click="openRoute(ROUTE_HR_BUSINESS_TRIP_PROCESS)"
          >
            <base-iconify
              :icon="CheckListMinimalisticIcon"
              :class="processIconClass"
            />
            <span>{{ t('process') }}</span>
          </div>

          <div class="flex h-2 bg-greyscale-200 w-8"></div>

          <div
            class="flex gap-x-2 items-center py-[10px] px-4 border bg-greyscale-50 rounded-[80px] text-base font-semibold cursor-pointer"
            :class="reportRouteClass"
            @click="openRoute(ROUTE_HR_BUSINESS_TRIP_ADVANCE_REPORT_LIST)"
          >
            <base-iconify
              :icon="BillListIcon"
              :class="reportIconClass"
            />
            <span>{{ t('avans-report') }}</span>
          </div>

<!--          <div class="flex h-2 bg-greyscale-200 w-8"></div>-->

<!--          <div-->
<!--            class="flex gap-x-2 items-center py-[10px] px-4 border bg-greyscale-50 rounded-[80px] text-base font-semibold cursor-pointer"-->
<!--            :class="certificateRouteClass"-->
<!--            @click="openRoute(ROUTE_HR_BUSINESS_TRIP_CERTIFICATE)"-->
<!--          >-->
<!--            <base-iconify-->
<!--              :icon="DocumentTextBoldIcon"-->
<!--              :class="certificateIconClass"-->
<!--            />-->
<!--            <span>{{ t('certificate') }}</span>-->
<!--          </div>-->
        </div>

        <base-button
          v-if="route.name === ROUTE_HR_BUSINESS_TRIP_ADVANCE_REPORT_LIST"
          label="create"
          :icon-left="Plus20SolidIcon"
          rounded
          type="button"
          @click="router.push({ name: ROUTE_HR_BUSINESS_TRIP_ADVANCE_REPORT_CREATE })"
        />
      </div>

      <router-view />

    </div>
  </template>
</template>

<style scoped>

</style>
