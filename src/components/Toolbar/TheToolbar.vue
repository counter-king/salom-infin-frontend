<script setup>
// Core
import { ref, provide, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { onClickOutside } from '@vueuse/core'
import Toolbar from 'primevue/toolbar'
// Stores
import { useThemeStore } from '@/stores/theme.store'
import { useUserPermissionStore } from '../../stores/user-permissions.store'
import { useAuthStore } from '../../modules/Auth/stores'
// Components
import { MagniferIcon, SettingsIcon } from '@/components/Icons'
import CreateActionDropdown from './CreateActionDropdown.vue'
import Search from './Search.vue'
import SettingDropdown from './SettingDropdown.vue'
import Notifications from './Notifications.vue'
import LanguageDropdown from './LanguageDropdown.vue'
import UserDropdown from './UserDropdown.vue'
// Composable
const { t } = useI18n()
const themeStore = useThemeStore()
const userPermissionStore = useUserPermissionStore()
const authStore = useAuthStore()
// Reactive
const openModal = ref(true)
const modalRef = ref(null)
const isHostVercel = ref(null)
// Methods
onClickOutside(
  modalRef,
  (event) => {
    openModal.value = true
  },
)
// Provide
provide('openModal', openModal)
// Hooks
onMounted(() => {
  isHostVercel.value = window.location.host === 'new-side-project.vercel.app' || window.location.host.startsWith('localhost')
})
</script>

<template>
	<header class="app-toolbar-view">
		<toolbar
      :pt="{
        root: {
          class: ['py-5 px-10 bg-primary-dark border-none rounded-none']
        }
      }"
    >
      <template #start>
        <router-link to="/" class="flex items-center mr-6">
          <template v-if="isHostVercel">
            <img src="/images/logo.svg" alt="Logo" />
            <img src="/images/logo-text.svg" alt="Logo text" class="ml-2" />
          </template>

          <template v-else>
            <img src="/images/sqb-logo.svg" alt="Logo" />
          </template>
        </router-link>

        <template v-if="openModal">
          <template v-for="menu in themeStore.header">
            <template v-if="userPermissionStore.canAccess(menu.permission)">
              <router-link
                :to="{ name: menu.link }"
                class="header-link group flex items-center gap-2 text-sm font-medium text-gray-1 py-[9px] pr-4 pl-[13px] rounded-full mr-3 transition-all duration-[400ms] hover:bg-primary-800 hover:text-white"
              >
                <base-iconify
                  v-if="menu.icon"
                  :icon="menu.icon"
                  class="text-gray-2 transition-all duration-[400ms] group-hover:text-white"
                />

                {{ t(menu.title) }}

                <template v-if="menu.count">
                  <div class="flex items-center justify-center w-5 h-5 rounded-full bg-critic-500 text-[10px] font-semibold text-white">{{ menu.count }}</div>
                </template>
              </router-link>
            </template>
          </template>

          <template v-if="authStore.currentUser?.is_superuser">
            <router-link
              :to="{ name: 'SettingsIndex' }"
              class="header-link group flex items-center gap-2 text-sm font-medium text-gray-1 py-[9px] pr-4 pl-[13px] rounded-full mr-3 transition-all duration-[400ms] hover:bg-primary-800 hover:text-white"
            >
              <base-iconify
                :icon="SettingsIcon"
                class="text-gray-2 transition-all duration-[400ms] group-hover:text-white"
              />

              {{ t('settings') }}
            </router-link>
          </template>
        </template>
      </template>

      <template #end>
        <div class="flex items-center gap-4">
          <create-action-dropdown v-if="openModal" />

          <div v-if="openModal" class="bg-greyscale-800 w-[1px] h-[28px]"></div>

          <div class="flex gap-2">
            <base-button
              v-if="openModal"
              color="bg-greyscale-800 hover:bg-greyscale-900"
              border-color="border-greyscale-800"
              :icon-left="MagniferIcon"
              only-icon
              rounded
              @click="openModal = false"
            />

            <search v-else ref="modalRef" />

            <setting-dropdown />

            <notifications />

            <language-dropdown />
          </div>

          <div class="bg-greyscale-800 w-[1px] h-[28px]"></div>

          <user-dropdown />
        </div>
      </template>
    </toolbar>
	</header>

  <Teleport v-if="!openModal" to="body">
    <div class="modal-layer fixed bottom-0 w-full transition-all duration-[400ms]"></div>
  </Teleport>
</template>

<style>
.header-link.router-link-active {
  background-color: var(--greyscale-800);
  color: #fff;
}

.header-link.router-link-active svg {
  color: #fff;
}
</style>
