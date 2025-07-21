<script setup>
// Core
import { computed, onMounted, ref } from "vue"
import {useRoute, useRouter} from "vue-router"
// Components
import { ActionToolbar, TripStatusButtons } from "@/components/Actions"
import BaseDataTable from "@/components/UI/BaseDataTable.vue"
import { Plus20SolidIcon } from '@/components/Icons'
import { TripStatus } from "@/components/Chips"
// Store
import {useAuthStore} from "@/modules/Auth/stores"
import { useBusinessTripStore } from "@/modules/HR/modules/BusinessTrip/stores/businessTrip.store"
// Enums
import {COMPOSE_DOCUMENT_SUB_TYPES, COMPOSE_DOCUMENT_TYPES} from "@/enums"
import { HR_BUSINESS_TRIP_COLUMNS, ROUTE_HR_BUSINESS_TRIP_DETAIL } from "@/modules/HR/constants"
import { ROUTE_SD_CREATE } from "@/modules/Documents/modules/SendDocuments/constants"
// Utils
import { formatDate } from "@/utils/formatDate"
import axios from "axios";
import axiosConfig, { baseURL } from "@/services/axios.config";
import { getStorageItem } from "@/utils/storage";
import { ACCESS } from "@/constants/storage";

// Reactive
const exportButtonLoading = ref(false)

// Composable
const router = useRouter()
const route = useRoute()
const BTStore = useBusinessTripStore()
const currentUser = useAuthStore().currentUser

// Const
const filterKeys = ["trip_status"]
const keysToIncludeOnClearFilter = ["destination"]

// Computed
const apiParams = computed(() => {
return route.query?.destination ? { destination: route.query.destination } : { destination: currentUser?.company?.id }
})

// Methods
const openRoute = async () => {
  await router.push({
    name: ROUTE_SD_CREATE,
    params: {
      document_type: COMPOSE_DOCUMENT_TYPES.NOTICE,
      document_sub_type: COMPOSE_DOCUMENT_SUB_TYPES.BUSINESS_TRIP_NOTICE_V2
    }
  })
}
const onRowClick = async (item) => {
  await router.push({
    name: ROUTE_HR_BUSINESS_TRIP_DETAIL,
    params: {
      id: item.id
    }
  })
}
const manageRoute = () => {
  if (!(route.query && route.query.destination)){
    router.replace({
      query: {
        ...route.query,
        destination: currentUser?.company?.id
      }
    })
  }
}
const onExportClick = async () => {
  exportButtonLoading.value = true

  const token = getStorageItem(ACCESS)
  const query = {}
  if (route.query?.trip_status) {
    query.trip_status = route.query.trip_status
  }

  const queryParams = new URLSearchParams(query).toString()

  fetch(`${baseURL}trips/export-excel/${queryParams ? '?' + queryParams : ''}`, {
    method: 'GET',
    headers: {
      Authorization: token ? 'Bearer ' + token : null,
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.blob()
    })
    .then(blob => {
      const url = window.URL.createObjectURL(new Blob([blob]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'Xizmat_safarlari.xlsx')
      document.body.appendChild(link)
      link.click()
      link.remove()
    })
    .catch(error => {
      console.error('Download error:', error)
    })
    .finally(() => {
      exportButtonLoading.value = false
    })
}

// Hooks
onMounted(() => {
  // manageRoute()
})
</script>

<template>
  <div class="business-trip-list-view">
<!--    :keys-to-include-on-clear-filter="keysToIncludeOnClearFilter"-->
<!--    :api-params="{ destination: currentUser?.company?.id }"-->
    <action-toolbar
      title="business-trip"
      :action-list="BTStore.actionGetBusinessTripList"
      :column-menu-items="BTStore.headers"
      :filter-keys="filterKeys"
      :storage-columns-name="HR_BUSINESS_TRIP_COLUMNS"
      :action-buttons="['export']"
      search-field
      :export-button-loading="exportButtonLoading"
      :onExportClick="onExportClick"
      @emit:reset-headers="BTStore.resetHeaders"
    >
      <template #title-after>
        <TripStatusButtons
          :action-list="BTStore.actionGetBusinessTripList"
        />
      </template>

      <template #end>
        <base-button
          label="create"
          :icon-left="Plus20SolidIcon"
          rounded
          type="button"
          @click="openRoute"
        />
      </template>
    </action-toolbar>
<!--    :api-params="apiParams"-->

    <base-data-table
      :action-list="BTStore.actionGetBusinessTripList"
      :loading="BTStore.listLoading"
      :total-count="BTStore.totalCount"
      :value="BTStore.businessTripList"
      :headers="BTStore.headers"
      :storage-columns-name="HR_BUSINESS_TRIP_COLUMNS"
      scroll-height="calc(100vh - 295px)"
      @emit:set-store-headers="(val) => BTStore.headers = val"
      @emit:row-click="onRowClick"
    >
      <template #department="{ data }">
        <span class="max-w-[300px] block">{{ data?.user?.top_level_department?.name }}</span>
      </template>

      <template #employee="{ data }">
        {{ data?.user?.full_name }}
<!--        <base-avatar-group-->
<!--          :items="[data?.user]"-->
<!--          shape="circle"-->
<!--          avatar-classes="w-8 h-8"-->
<!--        />-->
      </template>

      <template #start_date="{ data }">
        {{ formatDate(data?.start_date) }}
      </template>

      <template #end_date="{ data }">
        {{ formatDate(data?.end_date) }}
      </template>

      <template #trip_status="{ data }">
        <TripStatus
          :status="data?.trip_status"
        />
      </template>

      <template #destinations="{ data }">
<!--        <pre>{{ data?.destinations }}</pre>-->
        <base-badge-group
          :items="data?.destinations"
        />
      </template>
    </base-data-table>
  </div>
</template>

<style scoped>

</style>
