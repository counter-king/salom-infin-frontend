<script setup>
// Core
import { ref, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// Components
import PermissionAside from '../Permissions/Aside.vue'
// Stores
import { useEmployeeStore } from '../../../../stores/users/employees.store'
// Utils
import { dispatchNotify } from '@/utils/notify'
// Enums
import { COLOR_TYPES } from '@/enums'
// Composable
const route = useRoute()
const router = useRouter()
const employeeStore = useEmployeeStore()
// Reactive
const loading = ref(false)
// Methods
const save = async () => {
  try {
    loading.value = true
    await employeeStore.userSetPermissions(route.params.id)
    dispatchNotify(null, 'Права доступа успешно сохранен', COLOR_TYPES.SUCCESS)
  }
  finally {
    loading.value = false
  }
}
const clear = () => {
  if(!confirm(`Действительно хотите очистить всё ?`)) {
    return
  }

  employeeStore.createModel.permissions = []
}
// Hooks
onBeforeUnmount(async () => {
  await router.replace({
    name: 'EmployeesID',
    params: {
      id: route.params.id
    }
  })
})
</script>

<template>
  <div class="user-set-permissions flex flex-col flex-1">
    <div class="flex w-full h-[calc(100vh-413px)]">
      <permission-aside />

      <router-view :key="route.fullPath" />
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
