<script setup>
// Core
import { ref, unref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { vMaska } from 'maska'
// Store
import { useAuthStore } from "../../modules/Auth/stores/index"
import { resetAllPiniaStores } from '@/stores/plugins/resetStores'
// Utils
import { formatNameToShort } from '@/utils'
import { removeStorageItem } from '@/utils/storage'
import { ACCESS, EXPIRES, REFRESH, CURRENT_ROUTE } from '@/constants/storage'
// Composable
const authStore = useAuthStore()
const router = useRouter()
const userProfile = computed(() => authStore.getCurrentUser)

const handleMenu = async () => {
  removeStorageItem(ACCESS)
  removeStorageItem(REFRESH)
  removeStorageItem(EXPIRES)
  removeStorageItem(CURRENT_ROUTE)
  await router.push({ name: "Login" })
  resetAllPiniaStores()
}
const menuRef = ref(null)
const items = ref([
  {
    label: 'Профиль',
    subTitle: 'Выбор режима программы',
    icon: 'UserIcon',
  },
  {
    label: 'Настройки',
    subTitle: 'Выбор режима программы',
    icon: 'SettingsIcon'
  },
  {
    label: 'Поддержка',
    subTitle: 'Выбор режима программы',
    icon: 'InfoCircleIcon'
  },
  {
    label: 'Выход',
    subTitle: 'Выбор режима программы',
    icon: 'LogoutIcon',
    command: handleMenu
  }
])
// Methods
const toggle = (event) => {
  const _menuRef = unref(menuRef)
  _menuRef.menuRef.toggle(event)
}
</script>
<template>
  <div class="flex items-center gap-3 cursor-pointer" @click="toggle">
    <base-avatar
      image="/images/avatars/1.jpg"
      shape="circle"
      avatar-classes="w-10 h-10"
      class="flex"
    />

    <div>
      <h1 class="text-white text-sm font-semibold mb-1">
        {{ formatNameToShort(userProfile.full_name) }}
      </h1>

      <input
        v-model="userProfile.username"
        v-maska
        data-maska="+### ## ### ## ##"
        class="block w-[110px] bg-transparent text-greyscale-500 text-xs"
      />
    </div>

    <base-menu
      ref="menuRef"
      :items="items"
      has-angle
      has-overlay
      width="w-64"
      menu-class="bg-primary-50 !p-3 mt-7"
      content-class="rounded-xl"
      id="overlay_menu"
      class="group"
    >
      <template #item="{ item }">
        <div
          class="flex items-center justify-between px-3 py-3 rounded-xl bg-white cursor-pointer shadow-button"
          :class="item"
        >
          <div>
            <h1 class="text-sm font-semibold text-primary-900">{{ item.label }}</h1>
            <span class="text-xs font-medium text-greyscale-500">{{ item.subTitle }}</span>
          </div>
          <div class="w-8 h-8 flex items-center justify-center  rounded-full bg-gray-100  group-hover:bg-primary-500 ">
            <base-icon  width="16"  height="16" :name="item.icon" class="text-primary-900 transition-all duration-[400ms] group-hover:text-white" />
          </div>
        </div>
      </template>
    </base-menu>
  </div>
</template>
<style>
.base-menu-logout-icons {
  background-color: var(--primary-50);
  color: var(--primary-500);
  border-color: var(--greyscale-200);
}
</style>
