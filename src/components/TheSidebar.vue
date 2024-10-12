<script setup>
// Core
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
// Components
import { AltArrowLeftIcon } from '@/components/Icons'
// Stores
import { useUserPermissionStore } from '../stores/user-permissions.store'
import { useNavigationStore } from '@/stores/navigation.store'
// Composable
const { t } = useI18n()
const route = useRoute()
const userPermissionStore = useUserPermissionStore()
const navigationStore = useNavigationStore()
// Macros
const props = defineProps({
  menus: {
    type: Array,
    default: () => []
  },
  iconStroke: {
    type: Boolean,
    default: true
  }
})
// Watch
watch(
  () => route,
  (value) => {
    navigationStore.actionSidebarCollapse(value.meta?.miniSidebar)
  },
  {
    deep: true
  }
)
</script>

<template>
  <div
    :class="{ 'app-sidebar-collapse transition-all duration-300 delay-300' : navigationStore.sidebarCollapse }"
    class="app-sidebar max-w-[250px] w-full bg-white border-r border-r-gray-3 relative"
  >
    <template v-if="!navigationStore.sidebarCollapse">
      <div
        class="bg-primary-50 flex items-center justify-center border border-r-0 border-greyscale-200 rounded-l-lg w-5 h-8 cursor-pointer absolute top-[12px] right-0"
        @click="navigationStore.actionSidebarCollapse(true)"
      >
        <base-iconify
          :icon="AltArrowLeftIcon"
          class="text-greyscale-500"
        />
      </div>
    </template>

    <template v-else>
      <div
        class="bg-primary-50 flex items-center justify-center -scale-x-100 border border-r-0 border-greyscale-200 rounded-l-lg w-5 h-8 cursor-pointer absolute top-[12px] -right-[22px] z-10"
        @click="navigationStore.actionSidebarCollapse(false)"
      >
        <base-iconify
          :icon="AltArrowLeftIcon"
          class="text-greyscale-500"
        />
      </div>
    </template>

    <div class="h-full overflow-y-auto py-6 px-4">
      <template v-for="menu in props.menus">
        <template v-if="menu.prefix">
          <span class="block truncate font-medium text-sm text-gray-4 mb-3">{{ t(menu.title) }}</span>
        </template>

        <template v-else>
          <template v-if="userPermissionStore.canAccess(menu.permission)">
            <router-link
              :to="{ name: menu.link }"
              class="sidebar-link group flex items-center text-sm font-medium text-gray-1 rounded-xl p-3 pr-4 mb-1 border-b-2 border-transparent transition-all duration-[400ms] hover:text-primary-500 hover:border-gray-3 hover:bg-primary-50"
              :class="{ 'pointer-events-none' : menu.link === route.name }"
              v-tooltip="navigationStore.sidebarCollapse
                ? {
                    value: `<h4 class='text-xs text-white -my-1'>${t(menu.title)}</h4>`,
                    escape: true,
                    autoHide: false
                  }
                : null
              "
            >
              <base-iconify
                v-if="menu.icon"
                :icon="menu.icon"
                class="text-gray-1 transition-all duration-[400ms] group-hover:text-primary-500"
              />

              <span class="flex-1 truncate mx-3">{{ t(menu.title) }}</span>

              <template v-if="menu.count">
                <div class="badge-count flex items-center justify-center w-5 h-5 rounded-full bg-critic-500 text-[10px] font-semibold text-white ml-auto">{{ menu.count }}</div>
              </template>
            </router-link>
          </template>
        </template>
      </template>
    </div>
  </div>
</template>

<style>
.app-sidebar.app-sidebar-collapse {
  width: 76px;
}

.app-sidebar-collapse .sidebar-link {
  padding: 12px;
}

.app-sidebar-collapse .sidebar-link > span,
.app-sidebar-collapse .sidebar-link > .badge-count {
  display: none;
}

.sidebar-link.router-link-active {
  background-color: var(--primary-50);
  color: var(--primary-500);
  border-color: var(--greyscale-200);
}

.sidebar-link.router-link-active svg {
  color: var(--primary-500);
}
</style>
