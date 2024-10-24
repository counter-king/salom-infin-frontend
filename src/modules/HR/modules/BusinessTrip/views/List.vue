<script setup>
// Core
import {computed, onMounted} from "vue"
import {useRoute, useRouter} from "vue-router"
// Components
import { ActionToolbar } from "@/components/Actions"
import BaseDataTable from "@/components/UI/BaseDataTable.vue"
import { Plus20SolidIcon } from '@/components/Icons'
// Store
import {useAuthStore} from "@/modules/Auth/stores"
import { useBusinessTripStore } from "@/modules/HR/modules/BusinessTrip/stores/businessTrip.store"
// Enums
import {COMPOSE_DOCUMENT_SUB_TYPES, COMPOSE_DOCUMENT_TYPES} from "@/enums"
import { HR_BUSINESS_TRIP_COLUMNS, ROUTE_HR_BUSINESS_TRIP_DETAIL } from "@/modules/HR/constants"
import { ROUTE_SD_CREATE } from "@/modules/Documents/modules/SendDocuments/constants"

// Composable
const router = useRouter()
const route = useRoute()
const BTStore = useBusinessTripStore()
const currentUser = useAuthStore().currentUser

// Const
const filterKeys = ["users", "branches"]
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
      document_sub_type: COMPOSE_DOCUMENT_SUB_TYPES.BUSINESS_TRIP
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

// Hooks
onMounted(() => {
  manageRoute()
})
</script>

<template>
  <div class="business-trip-list-view">
    <action-toolbar
      title="business-trip"
      :action-list="BTStore.actionGetBusinessTripList"
      :column-menu-items="BTStore.headers"
      :filter-keys="filterKeys"
      :keys-to-include-on-clear-filter="keysToIncludeOnClearFilter"
      :storage-columns-name="HR_BUSINESS_TRIP_COLUMNS"
      @emit:reset-headers="BTStore.resetHeaders"
    >
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

    <base-data-table
      :action-list="BTStore.actionGetBusinessTripList"
      :api-params="apiParams"
      :loading="BTStore.listLoading"
      :total-count="BTStore.totalCount"
      :value="BTStore.businessTripList"
      :headers="BTStore.headers"
      :storage-columns-name="HR_BUSINESS_TRIP_COLUMNS"
      scroll-height="calc(100vh - 250px)"
      @emit:set-store-headers="(val) => BTStore.headers = val"
      @emit:row-click="onRowClick"
    >
      <template #department="{ data }">
        <span>{{ data?.user?.top_level_department?.name }}</span>
      </template>

      <template #employee="{ data }">
        {{ data?.user?.full_name }}
<!--        <base-avatar-group-->
<!--          :items="[data?.user]"-->
<!--          shape="circle"-->
<!--          avatar-classes="w-8 h-8"-->
<!--        />-->
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
