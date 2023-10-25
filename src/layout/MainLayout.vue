<script setup>
// Core
import { onMounted } from "vue"
// Components
import TheToolbar from "@/components/TheToolbar.vue"
import TheSidebar from "@/components/TheSidebar.vue"
// Store
import { useNavigation } from "@/stores/navigation.store"
// Composable
const navigationStore = useNavigation()
// Hooks
onMounted(() => {
  navigationStore.actionCurrentMenuSet()
})
</script>

<template>
	<div class="main-layout-view h-screen">
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
