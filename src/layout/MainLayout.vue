<script setup>
// Core
import { ref, onMounted } from 'vue'
// Store
import { useCommonStore } from '@/stores/common'
import { useAuthStore } from '../modules/Auth/stores/index'
// Components
import TheToolbar from '@/components/Toolbar/TheToolbar.vue'
// Utils
import { getStorageItem } from '@/utils/storage'
import { ACCESS } from '@/constants/storage'
// Composable
const commonStore = useCommonStore()
const authStore = useAuthStore()
// Reactive
// TODO: false
const appLoading = ref(true)
// Hooks
onMounted(async () => {
  // TODO: uncomment
  await getCurrentUser()
  await commonStore.init()
  setTimeout(() => {
    appLoading.value = false
  }, 500)
})
// Methods
const getCurrentUser = async () => {
  // Предотвратить повторной запрос для получения профиля
  if(!authStore.getCurrentUser) {
    getStorageItem(ACCESS) && await authStore.actionUserProfile()
  }
}
</script>

<template>
  <template v-if="appLoading">
    <div class="h-screen">
      <base-spinner content />
    </div>
  </template>

	<div
    v-else
    class="main-layout-view h-screen"
  >
		<the-toolbar />

		<div class="main-layout-content flex overflow-hidden">
      <router-view class="bg-primary-50" />
		</div>
	</div>
</template>

<style scoped>
.main-layout-content {
  height: calc(100vh - 80px);
}
</style>
