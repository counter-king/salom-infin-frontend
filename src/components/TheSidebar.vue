<script setup>
// Core
import { ref, computed, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
// Store
import { useNavigation } from "@/stores/navigation.store"
// Composable
const route = useRoute()
const router = useRouter()
const navigationStore = useNavigation()
// Reactive
const collapseMenus = ref([])
// Computed
const noChildRoute = computed(() => navigationStore.currentMenu.children.length === 0)
// Hooks
onMounted(() => {
  const currentParentRoute = route.matched[2]
  collapseMenus.value = currentParentRoute?.children
})
// Methods
const openCollapseMenus = (menu) => {
  collapseMenus.value = menu
}
</script>

<template>
  <div class="app-sidebar-wrap flex w-full">
    <div class="app-sidebar w-[250px] overflow-y-auto border-r border-r-gray-3 py-6 px-4" :class="{ 'hidden' : noChildRoute }">
      <template v-for="menu in navigationStore.currentMenu.children">
        <template v-if="menu.prefix">
          <span class="font-medium text-sm text-gray-4">{{ menu.title }}</span>
        </template>

        <template v-else>
          <router-link :to="{ name: menu.link }" class="block" @click="openCollapseMenus(menu.children)">
            {{ menu.title }}
          </router-link>
        </template>
      </template>

      <pre>{{ navigationStore.currentMenu }}</pre>
    </div>

    <div class="flex-1">
      <div>
        <pre>{{ collapseMenus }}</pre>
      </div>

      <slot name="content" />
    </div>
  </div>
</template>

<style scoped>

</style>
