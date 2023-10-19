<script setup>
// Components
import AppSpinner from "@/components/UI/Spinner/index.vue"
import TheToolbar from "@/components/TheToolbar.vue"
import TheSidebar from "@/components/TheSidebar.vue"
// Store
import { useNavigation } from "@/stores/navigation.store"
// Composable
const navigationStore = useNavigation()
</script>

<template>
	<div class="main-layout-view h-screen">
		<the-toolbar />

		<div class="main-layout-content flex">
      <template v-if="navigationStore.currentMenuLoading">
        <app-spinner content />
      </template>

      <template v-else>
        <the-sidebar />

        <div class="flex-1 overflow-y-auto py-8 px-6">
          <router-view />
        </div>
      </template>
		</div>
	</div>
</template>

<style scoped>
.main-layout-content {
  height: calc(100vh - 78px);
}
</style>
