<script setup>
// Components
import TheNavigation from '@/components/TheNavigation.vue'
// Stores
import { useDocFlowStore } from '../stores/docflow.store'
// Composable
const docFlowStore = useDocFlowStore()
</script>

<template>
  <the-navigation :navs="docFlowStore.routes.children" />

  <router-view />
</template>

<style scoped>

</style>
