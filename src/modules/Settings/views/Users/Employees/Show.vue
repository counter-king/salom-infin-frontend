<script setup>
// Core
import { ref, watch, onMounted,onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// Components
import { LayoutWithTabs } from '@/components/DetailLayout'
import { InfoCircleBoldIcon } from '@/components/Icons'
import PermissionAside from './Permissions/Aside.vue'
// Stores
import { useEmployeeStore } from '../../../stores/users/employees.store'
// Services
import axiosConfig from '@/services/axios.config'
// Utils
import { dispatchNotify } from '@/utils/notify'
// Enums
import { COLOR_TYPES } from '@/enums'
// Composable
const route = useRoute()
const router = useRouter()
const employeeStore = useEmployeeStore()
// Reactive
const loading = ref(true)
const user = ref(null)
const roles = ref([])
// Watch
watch(
  () => roles.value,
  (value) => {
    let permissions = value.map(item => item.permissions).flat(1)
    employeeStore.createModel.permissions = Object.keys(Object.groupBy(permissions, ({ id }) => id)).map(item => parseInt(item))
  }
)
// Methods
const getByOne = async () => {
  try {
    let { data } = await axiosConfig.get(`users/${route.params.id}/`)
    user.value = data
    employeeStore.createModel.permissions = data.permissions.map(permissions => parseInt(permissions.id))
    roles.value = data.roles
  }
  catch(error) {

  }
}
const save = async () => {
  try {
    await setRoles()
    await employeeStore.userSetPermissions(route.params.id)
    dispatchNotify(null, 'Права доступа успешно сохранен', COLOR_TYPES.SUCCESS)
  }
  finally {

  }
}
const setRoles = async () => {
  try {
    let model = {
      roles: roles.value.map(role => parseInt(role.id))
    }
    await axiosConfig.put(`set-role/${route.params.id}/`, model)
  }
  catch(error) {

  }
}
const handleBackButton = async () => {
  await router.replace({ name: 'EmployeesIndex' })
}
// Hooks
onMounted(async () => {
  try {
    loading.value = true
    await getByOne()
  } finally {
    setTimeout(() => {
      loading.value = false
    }, 500)
  }
})
onUnmounted(() => {

})
</script>

<template>
  <div class="employee-view h-full">
    <template v-if="loading">
      <base-spinner />
    </template>

    <template v-else>
      <layout-with-tabs
        title="Настройка ролей и доступы"
        self
        @emit:back-button="handleBackButton"
      >
        <template #header-end>
          <base-button
            label="save"
            rounded
            type="button"
            @click="save"
          />
        </template>

        <template #content>
          <div class="flex flex-col h-full">
            <div class="employee-layout-top p-8 pb-6">
              <div class="flex gap-3">
                <base-avatar
                  :label="user.full_name"
                  :color="user.color"
                  shape="circle"
                  avatar-classes="w-11 h-11"
                />

                <div class="flex-1">
                  <h1 class="font-semibold text-primary-900">{{ user.full_name }}</h1>
                  <p class="text-sm font-medium text-greyscale-400">{{ user.position?.name }}</p>
                </div>
              </div>

              <div class="max-w-[580px] my-5">
                <base-multi-select
                  v-model="roles"
                  api-url="roles"
                  label="Роли"
                  display="chip"
                  placeholder="Поиск ролей"
                  menu-placeholder="Поиск ролей"
                >
                  <template #chip="{ value }">
                    <span class="text-xs font-semibold text-greyscale-900">{{ value.name }}</span>
                  </template>

                  <template #option="{ value }">
                    <span class="block w-full text-sm font-medium text-primary-900 transition-all hover:!bg-greyscale-50">{{ value.name }}</span>
                  </template>

                  <template #hint="{ value }">
                    333
                  </template>
                </base-multi-select>
              </div>

              <InlineMessage
                severity="info"
                :pt="{
                  root: 'items-start gap-3 rounded-xl !bg-primary-10 overflow-hidden border border-primary-100',
                  text: 'flex-1 text-sm font-medium'
                }"
              >
                <template #icon>
                  <base-iconify :icon="InfoCircleBoldIcon" />
                </template>

                <span class="text-sm text-greyscale-900">Здесь в реальном времени видны права доступы привязанные к ролям. Вы можете добавить или удалить права доступы привязанные к ролям.</span>
              </InlineMessage>
            </div>

            <div class="employee-layout-bottom flex flex-1 h-[1px] border-t border-t-greyscale-200">
              <PermissionAside />

              <router-view :key="route.fullPath" />
            </div>
          </div>
        </template>
      </layout-with-tabs>
    </template>
  </div>
</template>
