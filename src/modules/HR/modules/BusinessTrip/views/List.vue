<script setup>
// Core
import {useRoute, useRouter} from "vue-router"
// Components
import { ActionToolbar } from "@/components/Actions"
import BaseDataTable from "@/components/UI/BaseDataTable.vue"
import { Plus20SolidIcon } from '@/components/Icons'
// Store
import { useBusinessTripStore } from "@/modules/HR/modules/BusinessTrip/stores/businessTrip.store"
// Enums
import { COMPOSE_DOCUMENT_TYPES } from "@/enums"
import { HR_BUSINESS_TRIP_COLUMNS, ROUTE_HR_BUSINESS_TRIP_DETAIL } from "@/modules/HR/constants"
import { ROUTE_SD_CREATE } from "@/modules/Documents/modules/SendDocuments/constants"

const router = useRouter()
const route = useRoute()
const BTStore = useBusinessTripStore()

// Methods
const openRoute = async () => {
  await router.push({
    name: ROUTE_SD_CREATE,
    params: { document_type: COMPOSE_DOCUMENT_TYPES.NOTICE }
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
</script>

<template>
  <div class="business-trip-list-view">
    <action-toolbar
      title="business-trip"
      :column-menu-items="BTStore.headers"
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
      :api-params="{ destination: 8 }"
      :loading="BTStore.listLoading"
      :total-count="BTStore.totalCount"
      :value="BTStore.businessTripList"
      :headers="BTStore.headers"
      :storage-columns-name="HR_BUSINESS_TRIP_COLUMNS"
      @emit:set-store-headers="(val) => BTStore.headers = val"
      @emit:row-click="onRowClick"
    >
      <template #department="{ data }">
        <span>{{ data?.user?.top_level_department?.name }}</span>
      </template>

      <template #author="{ data }">
        <base-avatar-group
          :items="[data?.user]"
          shape="circle"
          avatar-classes="w-8 h-8"
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
