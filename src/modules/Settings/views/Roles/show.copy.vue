<script setup>
// Core
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// Components
import { LayoutWithTabs } from '@/components/DetailLayout'
import Empty from '@/components/Empty.vue'
import RoleAside from './components/Aside.vue'
// Stores
import { usePermissionStore } from '../../stores/permissions.store'
import { useRolesStore } from '../../stores/roles.store'
// Utils
import { dispatchNotify } from '@/utils/notify'
// Enums
import { COLOR_TYPES } from '@/enums'
// Composable
const route = useRoute()
const router = useRouter()
const permissionStore = usePermissionStore()
const rolesStore = useRolesStore()
// Reactive
const loading = ref(true)
// Methods
const updateRole = async () => {
  try {
    await rolesStore.updateRole()
    dispatchNotify(null, 'Права доступа изменен', COLOR_TYPES.SUCCESS)
  }
  finally {

  }
}
const handleBackButton = async () => {
  await router.replace({ name: 'RolesIndex' })
}
// Hooks
onMounted(async () => {
  try {
    loading.value = true
    await rolesStore.getRoleById(route.params.id)
  } finally {
    setTimeout(() => {
      loading.value = false
    }, 500)
  }
})
</script>

<template>
  <div class="role-show-view h-full">
    <template v-if="loading">
      <base-spinner />
    </template>

    <template v-else>
      <layout-with-tabs
        title="Администратор"
        self
        @emit:back-button="handleBackButton"
      >
        <template #header-end>
          <base-button
            label="save"
            rounded
            type="button"
            @click="updateRole"
          />
        </template>

        <template #content>
          <div class="flex h-full">
            <role-aside />

            <template v-if="route.params.permissionId && permissionStore.list.length">
              <router-view :key="route.fullPath" />
            </template>

            <template v-else>
              <div class="flex-1">
                <empty title="Выберите разрешение из списка" class="!h-full !shadow-none"  />
              </div>
            </template>
          </div>
        </template>
      </layout-with-tabs>
    </template>
  </div>
</template>
