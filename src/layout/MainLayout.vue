<script setup>
// Core
import { ref, onMounted } from "vue"
// Components
import TheToolbar from "@/components/Toolbar/TheToolbar.vue"
import TheSidebar from "@/components/TheSidebar.vue"

import { useCommonStore } from "@/stores/common"
import { useAuthStore } from "../modules/Auth/stores/index"
import { getStorageItem } from "@/utils/storage"
import { ACCESS } from "@/constants/storage"

// Store
import { useNavigation } from "@/stores/navigation.store"
// Composable

const commonStore = useCommonStore()
const authStore = useAuthStore()
// TODO: false
const appVisible = ref(false)

onMounted(async () => {
  // TODO: uncomment
  await getCurrentUser()
  await commonStore.init()
  appVisible.value = true
})
// Methods
const getCurrentUser = async () => {
  // Предотвратить повторной запрос для получения профиля
  if(!authStore.getCurrentUser) {
    getStorageItem(ACCESS) && await authStore.actionUserProfile()
  }
}

const navigationStore = useNavigation()
// Hooks
onMounted(() => {
  navigationStore.actionCurrentMenuSet()
})
</script>

<template>
	<div v-if="appVisible" class="main-layout-view h-screen">
		<the-toolbar />

		<div class="main-layout-content flex">
      <template v-if="navigationStore.currentMenuLoading">
        <base-spinner content />
      </template>

      <template v-else>
        <the-sidebar>
          <template #content>
            <div class="flex-1 overflow-y-auto py-7 px-6">
              <router-view />
            </div>
          </template>
        </the-sidebar>
      </template>
		</div>
	</div>
</template>

<style scoped>
.main-layout-content {
  height: calc(100vh - 78px);
}
</style>
