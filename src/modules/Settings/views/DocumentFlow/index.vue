<script setup>
// Components
import TheNavigation from '@/components/TheNavigation.vue'
// Stores
import { useSettingsDocFlow } from '../../stores/docflow.store'
// Composable
const settingsDocFlow = useSettingsDocFlow()
</script>

<template>
  <the-navigation :navs="settingsDocFlow.routes.children" />

  <router-view />
</template>

<style scoped>

</style>

