<script setup>
// Core
import { computed } from "vue"
// Store
import { useNavigation } from "@/stores/navigation.store"
// Composable
const navigationStore = useNavigation()
// Computed
const noChildRoute = computed(() => navigationStore.currentMenu.children.length === 0)
</script>

<template>
  <div class="app-sidebar w-[250px] overflow-y-auto border-r border-r-gray-3 py-6 px-4" :class="{ 'hidden' : noChildRoute }">
    <template v-for="menu in navigationStore.currentMenu.children">
      <template v-if="menu.prefix">
        <span class="font-medium text-sm text-gray-4">{{ menu.title }}</span>
      </template>
    </template>

    <pre>{{ navigationStore.currentMenu }}</pre>
  </div>
</template>

<style scoped>

</style>
