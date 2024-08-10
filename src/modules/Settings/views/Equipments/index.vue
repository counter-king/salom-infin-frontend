<script setup>
// Core
import { onBeforeUnmount, onMounted } from 'vue'
import { useRoute } from 'vue-router'
// Components
import { ActionToolbar } from '@/components/Actions'
import { CardTable } from '@/components/Table'
import Empty from '@/components/Empty.vue'
// Stores
import { usePaginationStore } from '../../../../stores/pagination.store'
import { useEquipmentStore } from '../../stores/equipments.store'
// Composable
const paginationStore = usePaginationStore()
const equipmentStore = useEquipmentStore()
const route = useRoute()
// Methods
const pageChange = async ({ page, page_size }) => {
  await equipmentStore.getEquipment({ page, page_size })
}
// Hooks
onMounted(async () => {
  await equipmentStore.getEquipment({
    page: route.query.page,
    page_size: route.query.page_size
  })
})
onBeforeUnmount(() => {
  paginationStore.resetPagination()
})
</script>
<template>
  <div class="equipments-view">
    <action-toolbar title="Техника и оборудования">
      <template #filters>
        <span></span>
      </template>
    </action-toolbar>

    <template v-if="equipmentStore.contentLoading">
      <div
        class="flex items-center justify-center bg-white shadow-button rounded-xl"
        style="height: calc(100vh - 650px)"
      >
        <base-spinner content />
      </div>
    </template>

    <template v-else-if="!equipmentStore.list.length">
      <empty class="h-[calc(100vh-650px)]" />
    </template>

    <template v-else>
      <div class="bg-white flex flex-col h-full rounded-2xl p-6">
        <card-table
          :value="equipmentStore.list"
          :headers="equipmentStore.headers"
          :total-count="equipmentStore.count"
          @emit:page-change="pageChange"
          class="m-e-table"
        >
          <template #card_id="{ data }">
            {{ data.card_id }}
          </template>

          <template #name="{ data }">
            {{ data.name }}
          </template>

          <template #inv_num="{ data }">
            {{ data.inv_num }}
          </template>

          <template #date_oper="{ data }">
            {{ data.date_oper }}
          </template>
        </card-table>
      </div>
    </template>
  </div>
</template>
<style>
.table-card.m-e-table tr td:first-child {
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
}
.table-card.m-e-table tr td:last-child {
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}
.table-card.m-e-table tr{
  box-shadow: none;
}
.table-card.m-e-table th,
.table-card.m-e-table td{
  border-bottom: 1px solid #dee2e6;
}
.table-card.m-e-table thead{
  background-color: rgba(247, 247, 249, 1);
  /* background-color: red; */
  border-radius: 12px !important;
  overflow: hidden;
}
.table-card.m-e-table tr th:first-child{
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
}
.table-card.m-e-table tr th:last-child{
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
}
</style>
