<script setup>
// Core
import { ref, shallowRef, computed, watch, defineAsyncComponent, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// Components
import BaseSpinner from '@/components/UI/BaseSpinner.vue'
import { LayoutWithTabs } from '@/components/DetailLayout'
import { UserSpeakRoundedIcon, FolderWithFilesIcon, ClockCircleIcon } from '@/components/Icons'
// Stores
import { useEmployeeStore } from '../../../stores/users/employees.store'
// Composable
const route = useRoute()
const router = useRouter()
const employeeStore = useEmployeeStore()
// Reactive
const loading = ref(true)
const activeTabMenuIndex = ref(0)
const activeTabComponent = shallowRef(null)
const tabItems = ref([
  {
    label: 'Закрепление роли',
    name: 'Resolution',
    icon: UserSpeakRoundedIcon,
    slot: 'resolution',
    component: 'RolesTable',
  },
  {
    label: 'Закрепление меню',
    name: 'Preview',
    icon: FolderWithFilesIcon,
    slot: 'preview',
    component: 'SetPermissions',
  },
  {
    label: 'История',
    name: 'History',
    icon: ClockCircleIcon,
    slot: 'history',
    component: 'History',
  }
])
// Computed
const activeTabMenu = computed(() => tabItems.value[activeTabMenuIndex.value])
// Watch
watch(activeTabMenu, (value) => {
  activeTabComponent.value = defineAsyncComponent({
    loader: () => import(`./components/${value?.component}.vue`),
    loadingComponent: BaseSpinner,
    delay: 200
  })
}, { immediate: true })
// Methods
const handleBackButton = async () => {
  await router.replace({ name: 'EmployeesIndex' })
}
// Hooks
onMounted(async () => {
  try {
    loading.value = true
    await employeeStore.getUserOne(route.params.id)
  } finally {
    setTimeout(() => {
      loading.value = false
    }, 500)
  }
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
        <template #content>
          <div class="flex flex-col h-full">
            <div class="employee-layout-top p-8 pb-6">
              <div class="flex gap-3">
                <base-avatar
                  :label="employeeStore.userOne?.full_name"
                  :color="employeeStore.userOne?.color"
                  shape="circle"
                  avatar-classes="w-11 h-11"
                />

                <div class="flex-1">
                  <h1 class="font-semibold text-primary-900">{{ employeeStore.userOne?.full_name ?? '-' }}</h1>
                  <p class="text-sm font-medium text-greyscale-400">{{ employeeStore.userOne?.position?.name ?? '-' }}</p>
                </div>
              </div>
            </div>

            <div class="employee-layout-bottom flex flex-col flex-1 h-[1px]">
              <base-tab-menu v-model="activeTabMenuIndex" :tab-items="tabItems" class="w-full" />

              <component :is="activeTabComponent" />
            </div>
          </div>
        </template>
      </layout-with-tabs>
    </template>
  </div>
</template>
