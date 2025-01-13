<script setup>
// Core
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
// Components
import TheToolbar from '@/components/Toolbar/TheToolbar.vue'
import TheNetwork from '@/components/TheNetwork.vue'
import SessionEndMessageBar from '@/components/SessionEndMessageBar.vue'
// Store
import { useCommonStore } from '@/stores/common'
import { useCountStore } from '@/stores/count.store'
import { useAuthStore } from '../modules/Auth/stores/index'
// Utils
import { getStorageItem } from '@/utils/storage'
import { ACCESS } from '@/constants/storage'
// Composable
const router = useRouter()
const commonStore = useCommonStore()
const countStore = useCountStore()
const authStore = useAuthStore()
// Reactive
// TODO: false
const appLoading = ref(true)
// Hooks
onMounted(async () => {
  if(!getStorageItem(ACCESS)) {
    await router.push({ name: 'Login' })
    return
  }

  await getCurrentUser()
  await commonStore.init()
  await countStore.actionCountList()
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

const expectionPages = ['NewsShow', 'NewsDetails', 'NewsEdit'] 
const isNewsShowPage = computed(() => expectionPages.includes(router.currentRoute.value.name))

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

		<div class="main-layout-content flex" :class="{'overflow-auto w-full flex-col': isNewsShowPage, 'overflow-hidden': !isNewsShowPage}">
      <router-view class="bg-primary-50" />
		</div>
	</div>

  <Transition>
    <template v-if="authStore.sessionEnd">
      <session-end-message-bar />
    </template>
  </Transition>

  <the-network />
</template>

<style scoped>
.main-layout-content {
  height: calc(100vh - 80px);
}
</style>
