<script setup>
// Core
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// Components
import { CardTable } from '@/components/Table'
// Stores
import { useEmployeeStore } from '../../../../stores/users/employees.store'
// Services
import axiosConfig from '@/services/axios.config'
// Utils
import { formatDateHour } from '@/utils/formatDate'
// Composable
const route = useRoute()
const router = useRouter()
const employeeStore = useEmployeeStore()
// Reactive
const headers = ref([
  {
    header: 'Пользователь',
    field: 'created_by',
    active: true,
  },
  {
    header: 'Действия',
    field: 'description',
    active: true,
    width: '200px'
  },
  {
    header: 'Старое (Роли / Права доступа)',
    field: 'old_value',
    active: true,
    width: '200px'
  },
    {
    header: 'Новое (Роли / Права доступа)',
    field: 'new_value',
    active: true,
    width: '200px'
  },
  {
    header: 'created-date',
    field: 'created_date',
    active: true,
    width: '100px'
  },
  {
    header: 'IP адрес',
    field: 'ip_addr',
    active: true,
    width: '100px'
  },
])
const list = ref([])
const totalCount = ref(0)
// Methods
const getHistoryList = async (params) => {
  let { data } = await axiosConfig.get(`/activity-logs`, {
    object_id: route.params.id,
    content_type: employeeStore.userOne?.content_type,
    ...params
  })
  list.value = data.results
  totalCount.value = data.count
}
const pageChange = async ({ page, page_size }) => {
  await getHistoryList({ page, page_size })
}
// Hooks
onMounted(async () => {
  await getHistoryList()
})
onBeforeUnmount(async () => {
  await router.replace({
    query: null
  })
})
</script>

<template>
  <div class="user-history flex-1 px-6 pt-5">
    <card-table
      :value="list"
      :headers="headers"
      :total-count="totalCount"
      :shadow="false"
      scroll-height="calc(100vh - 425px)"
      header-cell-class="!h-10 !bg-greyscale-50 !border-none !py-3"
      body-cell-class="w-[60px] !h-12 !border-solid !rounded-none !py-3"
      class="equipments-table"
      @emit:page-change="pageChange"
    >
      <template #created_by="{ data }">
        <span>{{ data.created_by?.full_name ?? '-' }}</span>
      </template>

      <template #description="{ data }">
        <span>{{ data.description?.description ?? '-' }}</span>
      </template>

      <template #old_value="{ data }">
        <span>{{ data.old_value ?? '-' }}</span>
      </template>

      <template #new_value="{ data }">
        <span>{{ data.new_value ?? '-' }}</span>
      </template>

      <template #created_date="{ data }">
        <span>{{ formatDateHour(data.created_date) }}</span>
      </template>

      <template #ip_addr="{ data }">
        <span>{{ data.ip_addr }}</span>
      </template>
    </card-table>
  </div>
</template>
