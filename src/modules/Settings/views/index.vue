<script setup>
// Core
import { ref } from 'vue'
// Stores
import { useSettingsDocFlow } from '../stores/docflow.store'
// Components
import TheSidebar from '@/components/TheSidebar.vue'
// Composable
const settingsDocFLow = useSettingsDocFlow()
// Reactive
const menus = ref([
  {
    title: "Настройки",
    prefix: true
  },
  // Документ оборот
  settingsDocFLow.routes
])
</script>

<template>
  <div class="settings-view flex w-full">
    <the-sidebar :menus="menus" />

    <div class="flex-1 overflow-y-auto p-6">
      <router-view />
    </div>
  </div>
</template>

<style scoped>

</style>

