<script setup>
// Core
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// Components
import { CardTable } from '@/components/Table'
// Stores
import { useRolesStore } from '../../../../stores/roles.store'
// Services
import axiosConfig from '@/services/axios.config'
// Utils
import { formatDateHour } from '@/utils/formatDate'
import { dispatchNotify } from '@/utils/notify'
// Enums
import { COLOR_TYPES } from '@/enums'
// Composable
const route = useRoute()
const router = useRouter()
const rolesStore = useRolesStore()
// Macros
const emit = defineEmits(['update:selection'])
// Reactive
const headers = ref([
  {
    header: 'ID',
    field: 'id',
    active: true,
    width: '150px'
  },
  {
    header: 'Название роли',
    field: 'name',
    active: true,
    width: '450px'
  },
  {
    header: 'Активность',
    field: 'is_active',
    active: true,
    width: '250px'
  },
  {
    header: 'created-date',
    field: 'created_date',
    active: true,
    width: '250px'
  },
])
const rolesSeleceted = ref([])
const loading = ref(false)
// Methods
const pageChange = async ({ page, page_size }) => {
  await rolesStore.actionGetList({ page, page_size })
}
const handleSelection = (value) => {
  rolesSeleceted.value = value.map(role => role.id)
}
const save = async () => {
  try {
    loading.value = true
    axiosConfig.put(`set-role/${route.params.id}/`, {
      roles: rolesSeleceted.value.map(role => role.id)
    })
    dispatchNotify(null, 'Роли успешно сохранены', COLOR_TYPES.SUCCESS)
  }
  finally {
    loading.value = false
  }
}
const getByOne = async () => {
  try {
    let { data } = await axiosConfig.get(`users/${route.params.id}/`)
    rolesSeleceted.value = data.roles
  }
  catch(error) {

  }
}
const clear = () => {
  if(!confirm(`Действительно хотите очистить всё ?`)) {
    return
  }

  rolesSeleceted.value = []
}
// Hooks
onMounted(async () => {
  await rolesStore.actionGetList()
  await getByOne()
})
onBeforeUnmount(async () => {
  await router.replace({
    query: null
  })
})
</script>

<template>
  <div class="user-roles-table flex flex-col flex-1">
    <div class="flex-1 px-6 pt-5">
      <card-table
        v-model:selection-options="rolesSeleceted"
        :value="rolesStore.list"
        :headers="headers"
        :total-count="rolesStore.totalCount"
        :shadow="false"
        scrollHeight="calc(100vh - 500px)"
        selectable
        headerCellClass="!h-10 !bg-greyscale-50 !border-none !py-3"
        bodyCellClass="w-[60px] !h-12 !border-solid !rounded-none !py-3"
        class="equipments-table"
        @emit:page-change="pageChange"
        @update:selection="handleSelection"
      >
        <template #id="{ data }">
          <span>{{ data.id }}</span>
        </template>

        <template #name="{ data }">
          <span>{{ data.name }}</span>
        </template>

        <template #is_active="{ data }">
          <span>{{ data.is_active ? 'Активный' : 'Не активный' }}</span>
        </template>

        <template #created_date="{ data }">
          <span>{{ formatDateHour(data.created_date) }}</span>
        </template>
      </card-table>
    </div>

    <div class="flex justify-end gap-3 bg-greyscale-50 border-t border-t-greyscale-200 py-4 px-6">
      <base-button
        label="clear"
        rounded
        outlined
        shadow
        color="text-primary-900"
        border-color="border-transparent"
        @click="clear"
      />

      <base-button
        label="save"
        rounded
        :loading="loading"
        @click="save"
      />
    </div>
  </div>
</template>
