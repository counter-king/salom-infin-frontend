<script setup>
// Core
import { ref, shallowRef, watch, defineAsyncComponent, computed } from 'vue'
import { useI18n } from 'vue-i18n'
// Components
import ScrollPanel from 'primevue/scrollpanel'
import BaseSpinner from '@/components/UI/BaseSpinner.vue'
import { StatusChip } from '@/components/Chips'
import {
  PenIcon,
  UserCheckIcon,
  UserSpeakRoundedIcon,
  CurrencyDollarIcon,
  UsersGroupRoundedIcon,
  MonitorIcon,
  BasketballIcon,
  SquareAcademicCapIcon,
  TelegramIcon,
  TwitterIcon,
  InstagramAltIcon,
  FacebookCircleIcon
} from '@/components/Icons'
// Stores
import { useAuthStore } from '@/modules/Auth/stores'
// Enums
import { STATUS_TYPES } from '@/enums'
// Composable
const { t } = useI18n()
const authStore = useAuthStore()
// Reactive
const activeTabMenuIndex = ref(0)
const activeTabComponent = shallowRef(null)
const headerTabItems = ref([
  {
    label: 'worker',
    name: 'Worker',
    icon: UserCheckIcon,
    slot: 'worker',
    component: 'Worker',
    count: null
  },
  {
    label: 'personal',
    name: 'Personal',
    icon: UserSpeakRoundedIcon,
    slot: 'personal',
    component: 'Personal',
    count: null
  },
  {
    label: 'my-income',
    name: 'Salary',
    icon: CurrencyDollarIcon,
    slot: 'salary',
    component: 'Salary',
    count: null
  },
  {
    label: 'my-team',
    name: 'MyTeam',
    icon: UsersGroupRoundedIcon,
    slot: 'my-team',
    component: 'MyTeam',
    count: null
  },
  {
    label: 'my-devices',
    name: 'Equipments',
    icon: MonitorIcon,
    slot: 'my-techniques',
    component: 'Equipments',
    count: null
  },
  {
    label: 'interests',
    name: 'Interests',
    icon: BasketballIcon,
    slot: 'interests',
    component: 'Interests',
    count: null
  },
  {
    label: 'education',
    name: 'Education',
    icon: SquareAcademicCapIcon,
    slot: 'education',
    component: 'Education',
    count: null
  },
])
// Computed
const activeTabMenu = computed(() => headerTabItems.value[activeTabMenuIndex.value])
// Watch
watch(activeTabMenu, (value) => {
  activeTabComponent.value = defineAsyncComponent({
    loader: () => import(`../components/${value?.component}/index.vue`),
    loadingComponent: BaseSpinner,
    delay: 200
  })
}, { immediate: true })
</script>

<template>
  <ScrollPanel
    class="h-full bg-white rounded-[20px] shadow-button overflow-hidden"
    :pt="{
      wrapper: {
        style: { 'border-right': '4px solid var(--surface-ground)' }
      },
      bary: 'w-1 hover:bg-primary-400 bg-primary-300'
    }"
  >
    <!-- header -->
    <div class="p-[5px]">
      <div class="h-[165px] relative rounded-2xl">
        <img src="/images/profile-banner.png" alt="Profile banner" class="w-full h-full object-cover rounded-2xl">

        <div class="flex gap-2 absolute right-9 bottom-6">
          <div class="flex items-center justify-center w-8 h-8 bg-white rounded-full">
            <base-iconify :icon="TelegramIcon" class="text-primary-500" />
          </div>

          <div class="flex items-center justify-center w-8 h-8 bg-white rounded-full">
            <base-iconify :icon="TwitterIcon" class="text-primary-500" />
          </div>

          <div class="flex items-center justify-center w-8 h-8 bg-white rounded-full">
            <base-iconify :icon="InstagramAltIcon" class="text-primary-500" />
          </div>

          <div class="flex items-center justify-center w-8 h-8 bg-white rounded-full">
            <base-iconify :icon="FacebookCircleIcon" class="text-primary-500" />
          </div>
        </div>
      </div>

      <div class="flex gap-3 px-[35px] -mt-10">
        <div class="flex items-center justify-center w-[106px] h-[106px] relative rounded-full bg-white z-10">
          <base-avatar
            :label="authStore.currentUser?.full_name"
            :color="authStore.currentUser?.color"
            avatarClasses="w-24 h-24"
          >
            <span class="text-4xl font-semibold text-white">{{ authStore.currentUser?.full_name[0] }}</span>
          </base-avatar>

          <div class="flex items-center justify-center w-6 h-6 absolute bottom-0 right-[10px] rounded-full overflow-hidden bg-white z-20">
            <div class="flex items-center justify-center w-4 h-4 bg-primary-500 rounded-full">
              <div class="w-[6px] h-[6px] rounded-full bg-white"></div>
            </div>
          </div>
        </div>

        <div class="flex self-end flex-1 gap-4">
          <div>
            <h1 class="text-[18px] leading-[28px] text-greyscale-900 font-bold mb-[2px]">{{ authStore.currentUser?.full_name }}</h1>
            <p class="text-sm font-medium text-greyscale-500">{{ authStore.currentUser?.position?.name }}</p>
          </div>

          <!-- TODO: испавить потом -->
          <status-chip
            type="handbook"
            :status="authStore.currentUser?.status"
            border
            circle
            root-class="self-start !py-[6px] !px-3"
          >
            {{ authStore.currentUser?.status?.name }}
          </status-chip>
        </div>

        <div class="flex flex-col items-end self-end">
          <h1 class="text-xs font-medium text-greyscale-500 mb-2">{{ t('skills') }}</h1>

          <div class="flex gap-2">
            <status-chip :status="{ id: STATUS_TYPES.TODO }" border circle root-class="!py-[6px] !px-3">
              <span class="text-sm font-medium text-greyscale-900">React</span>
            </status-chip>

            <status-chip :status="{ id: STATUS_TYPES.TODO }" border circle root-class="!py-[6px] !px-3">
              <span class="text-sm font-medium text-greyscale-900">Vujes</span>
            </status-chip>

            <status-chip :status="{ id: STATUS_TYPES.TODO }" border circle root-class="!py-[6px] !px-3">
              <span class="text-sm font-medium text-greyscale-900">PHP</span>
            </status-chip>

            <status-chip :status="{ id: STATUS_TYPES.TODO }" border circle root-class="!py-[6px] !px-3">
              <span class="text-sm font-medium text-greyscale-900">Leravel</span>
            </status-chip>

            <status-chip :status="{ id: STATUS_TYPES.TODO }" border circle root-class="!py-[6px] !px-3">
              <span class="text-sm font-medium text-greyscale-900">Android</span>
            </status-chip>

            <status-chip :status="{ id: STATUS_TYPES.TODO }" border circle root-class="!py-[6px] !px-2 cursor-pointer">
              <div class="flex items-center h-full">
                <base-iconify :icon="PenIcon" class="!w-4 !h-4 text-primary-500" />
              </div>
            </status-chip>
          </div>
        </div>
      </div>
    </div>
    <!-- /header -->

    <!-- body -->
    <div>
      <base-tab-menu
        v-model="activeTabMenuIndex"
        :tab-items="headerTabItems"
        menu-class="!px-6"
        class="sticky top-0 z-10 mt-6"
      />

      <div class="p-6">
        <component :is="activeTabComponent" />
      </div>
    </div>
    <!-- /body -->
  </ScrollPanel>
</template>
